"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/config/site";
import {
  submitApplication,
  type ApplicationPayload,
  type ContactMethod,
} from "@/lib/submitApplication";
import Container from "./ui/Container";
import Reveal from "./ui/Reveal";
import { Button } from "./ui/Button";

type Status = "idle" | "sending" | "success" | "error";
type Errors = { name?: string; phone?: string };

const f = site.form;

export default function ApplicationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contactMethod, setContactMethod] = useState<ContactMethod>(
    f.contactMethods[0] as ContactMethod
  );
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  function validate(): Errors {
    const next: Errors = {};
    if (name.trim().length < 2) {
      next.name = "Пожалуйста, укажите ваше имя.";
    }
    const digits = phone.replace(/\D/g, "");
    if (phone.trim().length === 0) {
      next.phone = "Пожалуйста, укажите номер телефона.";
    } else if (digits.length < 6) {
      next.phone = "Похоже, номер введён не полностью.";
    }
    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    const payload: ApplicationPayload = {
      name: name.trim(),
      phone: phone.trim(),
      contactMethod,
      message: message.trim(),
    };

    const result = await submitApplication(payload);
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  const inputBase =
    "w-full rounded-xl border bg-white px-4 py-3.5 text-ink placeholder:text-ink-muted transition-colors focus:outline-none focus:ring-2 focus:ring-navy/30";

  return (
    <section id={f.id} className="scroll-mt-24 bg-bg py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Левая колонка — заголовок и пояснение */}
          <div className="lg:pt-4">
            <Reveal>
              <p className="kicker">Заявка</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display mt-4 text-3xl leading-tight text-ink sm:text-4xl">
                {f.title}
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
                {f.subtitle}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <ul className="mt-8 space-y-3">
                {[
                  "Индивидуальный подход к каждой ситуации",
                  "Понятное объяснение юридических вопросов",
                  "Конфиденциальность обращения",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 text-sm text-ink-soft">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy/5 text-navy">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Правая колонка — форма или сообщение об успехе */}
          <Reveal delay={120}>
            <div className="rounded-2xl border border-line bg-bg-soft p-6 shadow-[0_40px_80px_-56px_rgba(15,27,48,0.6)] sm:p-9">
              {status === "success" ? (
                <SuccessMessage />
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid gap-5">
                    {/* Имя */}
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
                        {f.fields.name.label} <span className="text-gold">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder={f.fields.name.placeholder}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((p) => ({ ...p, name: undefined }));
                        }}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={`${inputBase} ${errors.name ? "border-red-400 focus:ring-red-300" : "border-line"}`}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1.5 text-sm text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Телефон */}
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium text-ink">
                        {f.fields.phone.label} <span className="text-gold">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder={f.fields.phone.placeholder}
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                        }}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "phone-error" : undefined}
                        className={`${inputBase} ${errors.phone ? "border-red-400 focus:ring-red-300" : "border-line"}`}
                      />
                      {errors.phone && (
                        <p id="phone-error" className="mt-1.5 text-sm text-red-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Способ связи */}
                    <div>
                      <span className="mb-2 block text-sm font-medium text-ink">
                        {f.fields.contactMethod.label}
                      </span>
                      <div className="grid grid-cols-1 gap-2 xs:grid-cols-3">
                        {f.contactMethods.map((method) => {
                          const active = contactMethod === method;
                          return (
                            <label
                              key={method}
                              className={`flex cursor-pointer items-center justify-center rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
                                active
                                  ? "border-navy bg-navy text-white"
                                  : "border-line bg-white text-ink-soft hover:border-navy/40"
                              }`}
                            >
                              <input
                                type="radio"
                                name="contactMethod"
                                value={method}
                                checked={active}
                                onChange={() => setContactMethod(method as ContactMethod)}
                                className="sr-only"
                              />
                              {method}
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Сообщение */}
                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
                        {f.fields.message.label}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder={f.fields.message.placeholder}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className={`${inputBase} resize-none border-line`}
                      />
                    </div>

                    {/* Ошибка отправки */}
                    {status === "error" && (
                      <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                        {f.errorText}
                      </p>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={status === "sending"}
                    >
                      {status === "sending" ? (
                        <>
                          <Spinner /> {f.sending}
                        </>
                      ) : (
                        f.submit
                      )}
                    </Button>

                    <p className="text-center text-xs leading-relaxed text-ink-muted">
                      {f.consent}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

function SuccessMessage() {
  return (
    <div className="flex flex-col items-center py-8 text-center sm:py-12">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy/5 text-navy">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <h3 className="font-display mt-6 text-2xl text-ink">{f.successTitle}</h3>
      <p className="mt-3 max-w-sm text-base leading-relaxed text-ink-soft">
        {f.successText}
      </p>
    </div>
  );
}
