/**
 * ЛОГИКА ОТПРАВКИ ЗАЯВКИ (клиентская часть)
 * ------------------------------------------------------------------
 * Единая точка отправки заявки. Компонент формы вызывает только
 * функцию submitApplication(). Чтобы подключить реальный канал
 * (Telegram / WhatsApp / email / CRM / базу данных / webhook),
 * достаточно изменить обработчик на сервере:
 *   src/app/api/application/route.ts
 * Клиентский код формы менять не потребуется.
 */

export type ContactMethod = "WhatsApp" | "Телефонный звонок" | "Telegram";

export interface ApplicationPayload {
  name: string;
  phone: string;
  contactMethod: ContactMethod;
  message: string;
}

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

/**
 * Отправляет заявку на внутренний API endpoint.
 * Возвращает { ok: true } при успехе или { ok: false, error } при ошибке.
 * Функция не выбрасывает исключения — ошибки возвращаются в объекте.
 */
export async function submitApplication(
  payload: ApplicationPayload
): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      let error = "Ошибка отправки. Попробуйте позже.";
      try {
        const data = (await res.json()) as { error?: string };
        if (data?.error) error = data.error;
      } catch {
        /* тело ответа не является JSON — используем сообщение по умолчанию */
      }
      return { ok: false, error };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Проблема с соединением. Проверьте интернет и попробуйте снова.",
    };
  }
}
