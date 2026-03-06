import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "streetwave® — Студия арт-кастомизации";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent line top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "#E8FF5A",
          }}
        />

        {/* Logo text */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-2px",
            marginBottom: 24,
          }}
        >
          streetwave®
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#E8FF5A",
            letterSpacing: "6px",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Студия арт-кастомизации
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 20,
            color: "#999999",
            maxWidth: 600,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Кастомные кроссовки, одежда и арт-объекты. Москва, с 2014 года.
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            gap: 32,
            color: "#666666",
            fontSize: 14,
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          <span>Nike</span>
          <span>·</span>
          <span>Adidas</span>
          <span>·</span>
          <span>Jordan</span>
          <span>·</span>
          <span>Одежда</span>
          <span>·</span>
          <span>Арт-объекты</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
