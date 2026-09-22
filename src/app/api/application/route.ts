import { NextResponse } from "next/server";

/**
 * ОБРАБОТЧИК ЗАЯВКИ (серверная часть)
 * ------------------------------------------------------------------
 * Заявки отправляются в Telegram через бота. Для работы нужны две
 * переменные окружения (задаются в настройках проекта на Vercel):
 *   TELEGRAM_BOT_TOKEN — токен бота от @BotFather
 *   TELEGRAM_CHAT_ID   — куда слать заявки. Можно указать НЕСКОЛЬКО
 *                        получателей через запятую — например id общей
 *                        группы и/или личные чаты сотрудников:
 *                        "-1001234567890,123456789,987654321"
 *
 * Один бот обслуживает всех получателей — отдельный бот на сотрудника
 * не нужен. Если переменные не заданы, заявка просто пишется в лог
 * сервера (сайт при этом продолжает работать без ошибок).
 */

export interface ApplicationRequest {
  name: string;
  phone: string;
  contactMethod: string;
  message?: string;
}

function isValid(body: unknown): body is ApplicationRequest {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 0
  );
}

/** Отправка заявки в Telegram (всем получателям). Возвращает true при успехе. */
async function sendToTelegram(app: ApplicationRequest): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const raw = process.env.TELEGRAM_CHAT_ID;
  if (!token || !raw) return false; // канал не настроен

  // Один или несколько получателей через запятую
  const chatIds = raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  if (chatIds.length === 0) return false;

  const text =
    `🟦 Новая заявка с сайта «Цивилист»\n\n` +
    `👤 Имя: ${app.name}\n` +
    `📞 Телефон: ${app.phone}\n` +
    `💬 Способ связи: ${app.contactMethod}\n` +
    `📝 Сообщение: ${app.message?.trim() ? app.message.trim() : "—"}`;

  // Шлём всем получателям; ошибка одного не мешает остальным
  const results = await Promise.allSettled(
    chatIds.map(async (chatId) => {
      const res = await fetch(
        `https://api.telegram.org/bot${token}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            disable_web_page_preview: true,
          }),
        }
      );
      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(`chat ${chatId}: Telegram API ${res.status}: ${detail}`);
      }
    })
  );

  const failed = results.filter((r) => r.status === "rejected");
  if (failed.length > 0) {
    failed.forEach((r) =>
      console.error("Telegram доставка не удалась:", (r as PromiseRejectedResult).reason)
    );
  }
  // Успех, если доставлено хотя бы одному получателю
  return failed.length < chatIds.length;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Некорректный формат данных." },
      { status: 400 }
    );
  }

  if (!isValid(body)) {
    return NextResponse.json(
      { error: "Пожалуйста, укажите имя и телефон." },
      { status: 422 }
    );
  }

  const application = body as ApplicationRequest;

  // Резервная запись в лог сервера (виден в Vercel → Logs)
  console.log("Новая заявка:", {
    name: application.name,
    phone: application.phone,
    contactMethod: application.contactMethod,
    message: application.message ?? "",
    receivedAt: new Date().toISOString(),
  });

  // Доставка в Telegram. Сбой доставки не блокирует посетителя:
  // он получает подтверждение, а заявка остаётся в логах.
  try {
    const delivered = await sendToTelegram(application);
    if (!delivered) {
      console.warn(
        "Telegram не настроен: заданы не все переменные TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID."
      );
    }
  } catch (error) {
    console.error("Не удалось отправить заявку в Telegram:", error);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
