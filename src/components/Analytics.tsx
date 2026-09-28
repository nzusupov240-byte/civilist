import Script from "next/script";
import { site } from "@/config/site";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    ym?: (...args: unknown[]) => void;
  }
}

/**
 * Подключение счётчиков аналитики.
 * ID задаются в src/config/site.ts → analytics.
 * Пустые значения ("") — счётчик не подключается.
 */
export default function Analytics() {
  const { ga4, yandexMetrika } = site.analytics;

  return (
    <>
      {/* Google Analytics 4 */}
      {ga4 && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4}');
            `}
          </Script>
        </>
      )}

      {/* Яндекс.Метрика */}
      {yandexMetrika && (
        <>
          <Script id="ym-init" strategy="afterInteractive">
            {`
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window,document,"script","https://mc.yandex.ru/metrika/tag.js?id=${yandexMetrika}","ym");
              ym(${yandexMetrika}, "init", {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
            `}
          </Script>
          <noscript>
            <div>
              <img
                src={`https://mc.yandex.ru/watch/${yandexMetrika}`}
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
              />
            </div>
          </noscript>
        </>
      )}
    </>
  );
}
