/**
 * Абстрактный архитектурный визуал (SVG). Спокойный премиальный мотив
 * современного фасада: тонкие вертикальные линии и золотой акцент.
 * Не использует стоковые клише — легко масштабируется и не грузит страницу.
 */
export default function ArchArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 640"
      className={className}
      role="img"
      aria-label="Современная архитектура делового квартала"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="arch-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#12233d" />
          <stop offset="0.55" stopColor="#0f1b30" />
          <stop offset="1" stopColor="#0b1425" />
        </linearGradient>
        <linearGradient id="arch-gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#b0925a" />
          <stop offset="1" stopColor="#c7ac7d" />
        </linearGradient>
      </defs>

      <rect width="520" height="640" fill="url(#arch-bg)" />

      {/* Дальний фасад — сетка окон */}
      <g opacity="0.5" stroke="#ffffff" strokeOpacity="0.10" strokeWidth="1">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={40 + i * 55} y1="70" x2={40 + i * 55} y2="600" />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`h${i}`} x1="40" y1={70 + i * 50} x2="480" y2={70 + i * 50} />
        ))}
      </g>

      {/* Передний объём здания */}
      <g>
        <rect x="70" y="150" width="180" height="450" fill="#ffffff" fillOpacity="0.05" />
        <rect x="270" y="230" width="180" height="370" fill="#ffffff" fillOpacity="0.03" />
        {/* тонкие ламели фасада */}
        {Array.from({ length: 7 }).map((_, i) => (
          <rect
            key={`f${i}`}
            x={82 + i * 24}
            y="150"
            width="8"
            height="450"
            fill="#ffffff"
            fillOpacity="0.06"
          />
        ))}
      </g>

      {/* Золотой горизонтальный акцент */}
      <rect x="0" y="470" width="520" height="2" fill="url(#arch-gold)" opacity="0.9" />
      <rect x="70" y="150" width="4" height="450" fill="url(#arch-gold)" opacity="0.7" />
    </svg>
  );
}
