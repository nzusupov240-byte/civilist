import { NextResponse } from "next/server";

/**
 * ОБРАБОТЧИК ЗАЯВКИ (серверная часть)
 * ------------------------------------------------------------------
 * Единственное место, которое нужно изменить для подключения
 * реального канала доставки заявок. Ниже уже подготовлены заготовки
 * для Telegram, email и произвольного webhook — раскомментируйте
 * нужный блок и добавьте переменные окружения в файл .env.local.
 *
 * Никакие сторонние сервисы по умолчанию НЕ подключены: сейчас заявка
 * просто логируется на сервере, а клиенту возвращается успешный ответ.
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

  try {
    // --- Текущее поведение: заявка фиксируется в логах сервера ---
    console.log("Новая заявка:", {
      name: application.name,
      phone: application.phone,
      contactMethod: application.contactMethod,
      message: application.message ?? "",
      receivedAt: new Date().toISOString(),
    });

    // ================================================================
    // ПОДКЛЮЧЕНИЕ РЕАЛЬНЫХ КАНАЛОВ — раскомментируйте нужный блок.
    // ================================================================

    // --- Telegram-бот ---
    // const token = process.env.TELEGRAM_BOT_TOKEN;
    // const chatId = process.env.TELEGRAM_CHAT_ID;
    // if (token && chatId) {
    //   const text =
    //     `Новая заявка с сайта\n` +
    //     `Имя: ${application.name}\n` +
    //     `Телефон: ${application.phone}\n` +
    //     `Способ связи: ${application.contactMethod}\n` +
    //     `Сообщение: ${application.message ?? "—"}`;
    //   await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ chat_id: chatId, text }),
    //   });
    // }

    // --- Произвольный webhook (Make, n8n, CRM и т.п.) ---
    // const webhookUrl = process.env.APPLICATION_WEBHOOK_URL;
    // if (webhookUrl) {
    //   await fetch(webhookUrl, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(application),
    //   });
    // }

    // --- Email (например, через Resend / Nodemailer) ---
    // ... добавьте отправку письма здесь ...

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Ошибка обработки заявки:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера. Попробуйте позже." },
      { status: 500 }
    );
  }
}
