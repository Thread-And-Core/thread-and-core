import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Thread & Core Systems — Enterprise Architecture for the Connected Enterprise";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#080A0F",
          position: "relative",
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <path
            d="M-40 480 C 260 380, 520 560, 780 440 S 1100 320, 1240 380"
            fill="none"
            stroke="#D99A4E"
            strokeWidth="2"
            strokeOpacity="0.55"
          />
          <path
            d="M-40 520 C 300 460, 560 600, 860 470 S 1120 380, 1240 430"
            fill="none"
            stroke="#D99A4E"
            strokeWidth="1"
            strokeOpacity="0.25"
          />
          <circle cx="1020" cy="415" r="46" fill="#1C1508" />
          <circle
            cx="1020"
            cy="415"
            r="46"
            fill="none"
            stroke="#F0C987"
            strokeWidth="2"
          />
          <circle cx="1020" cy="415" r="14" fill="#D99A4E" />
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.2em",
            color: "#D99A4E",
            marginBottom: 28,
          }}
        >
          THREAD &amp; CORE SYSTEMS
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 74,
            fontWeight: 700,
            lineHeight: 1.1,
            color: "#FFF6E9",
            maxWidth: 900,
          }}
        >
          Enterprise Architecture for the Connected Enterprise.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontSize: 32,
            fontStyle: "italic",
            color: "#F0C987",
          }}
        >
          Connecting Every Thread to the Core.
        </div>
      </div>
    ),
    size,
  );
}
