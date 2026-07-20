import React, { useRef } from "react";
import { usePhoneStatus, PhoneStatus } from "./PhoneStatusContext";
import { notificationById } from "./notificationIcons";

// Module counter → a stable unique id per StatusBar instance (React 17 has no useId).
let statusBarSeq = 0;

interface StatusBarProps {
  /** Kept for backward compatibility; icon color is now driven by the light/dark theme. */
  color?: string;
  /** Height of the status bar row. */
  height?: number | string;
  /** Template's natural background — used when the user's theme is "auto". */
  defaultTheme?: "light" | "dark";
  /**
   * Optional override of the shared phone status (used by the editor's live preview).
   * When omitted, the bar reads from PhoneStatusContext.
   */
  status?: Partial<PhoneStatus>;
}

const FONT =
  'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

/** Relative luminance (0–1) of a #rrggbb / #rgb color, used to pick contrasting text. */
const luminance = (hex: string): number => {
  const m = hex.replace("#", "");
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  if (full.length < 6) return 1;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
};

/** #rrggbb / #rgb → rgba() with the given alpha. */
const withAlpha = (hex: string, a: number): string => {
  const m = hex.replace("#", "");
  const full = m.length === 3 ? m.split("").map((c) => c + c).join("") : m;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

/**
 * Reusable iPhone-style status bar with 4 selectable models (classic / ios / bars / cellular).
 * Fully self-contained (inline styles + inline SVG) so it drops into any template without
 * CSS class collisions. Values come from PhoneStatusContext (editable from the sidebar);
 * `color` themes the icons per template.
 */
const StatusBar: React.FC<StatusBarProps> = ({ color = "#262626", height = 40, defaultTheme = "light", status }) => {
  const { phoneStatus } = usePhoneStatus();
  const s = { ...phoneStatus, ...status };

  // Two looks: black icons (light bg) or white icons (dark bg). "auto" follows the template.
  const resolvedTheme = s.theme === "auto" ? defaultTheme : s.theme;
  const iconColor = resolvedTheme === "dark" ? "#ffffff" : "#111111";
  const dim = withAlpha(iconColor, 0.28);

  const signal = clamp(Math.round(s.signal), 0, 4);
  const battery = clamp(Math.round(s.battery), 0, 100);
  const showNumber = s.model !== "classic";
  const isDots = s.model === "ios";
  const isCellular = s.model === "cellular";

  // Battery fill + contrasting number color, by state.
  let fillColor: string;
  let numberColor: string;
  if (s.charging) {
    fillColor = "#34c759";
    numberColor = "#ffffff";
  } else if (s.lowPower) {
    fillColor = "#ffd60a";
    numberColor = "#1c1c1e";
  } else if (battery <= 20) {
    fillColor = "#ff453a";
    numberColor = "#ffffff";
  } else {
    fillColor = iconColor;
    numberColor = luminance(iconColor) > 0.6 ? "#1c1c1e" : "#ffffff";
  }

  // Battery % number style (shared by the base + knockout layers so they align perfectly).
  // Battery interior is drawn as SVG (below) so html2canvas captures the centered %,
  // the level fill, and the knockout faithfully. Unique clip id per instance.
  const idRef = useRef<number>();
  if (idRef.current === undefined) idRef.current = ++statusBarSeq;
  const clipId = "batclip" + idRef.current;
  const batteryFillW = (24.4 * battery) / 100; // interior width (24.4) × level

  // Signal marks (bars, or dots for the "ios" model).
  const heights = isDots ? [3.5, 5.5, 7.5, 9.5] : [4, 6.5, 9, 12];
  const markW = isDots ? 2.6 : 3;
  const step = 5;
  const svgW = 3 * step + markW;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: typeof height === "number" ? `${height}px` : height,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 14.375px",
        boxSizing: "border-box",
        zIndex: 50,
      }}
    >
      {/* Time + notification icons (left side) */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", minWidth: 0, marginLeft: "8px" }}>
        <span
          style={{
            color: iconColor,
            fontFamily: FONT,
            fontSize: "13.75px",
            fontWeight: 700,
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {s.time || "8:03"}
        </span>
        {s.notifications && s.notifications.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {s.notifications.map((id) => {
              const opt = notificationById(id);
              if (!opt) return null;
              const Icon = opt.Icon;
              return <Icon key={id} size={13} color={iconColor} style={{ display: "block", flexShrink: 0 }} />;
            })}
          </div>
        )}
      </div>

      {/* Right cluster: signal · Wi-Fi/network · battery */}
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        {/* Cellular signal */}
        <svg width={svgW} height="12" viewBox={`0 0 ${svgW} 12`} style={{ display: "block" }} aria-hidden="true">
          {heights.map((h, i) => (
            <rect
              key={i}
              x={i * step}
              y={12 - h}
              width={markW}
              height={h}
              rx={isDots ? markW / 2 : 1}
              fill={i < signal ? iconColor : dim}
            />
          ))}
        </svg>

        {/* Network: "4G" text for cellular, otherwise the Wi-Fi icon */}
        {isCellular ? (
          <span
            style={{
              color: iconColor,
              fontFamily: FONT,
              fontSize: "12px",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.2px",
              whiteSpace: "nowrap",
            }}
          >
            {s.network || "4G"}
          </span>
        ) : (
          s.wifi && (
            <svg width="17" height="13" viewBox="0 3 24 18" fill={iconColor} style={{ display: "block" }} aria-hidden="true">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
          )
        )}

        {/* Battery */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: showNumber ? "27px" : "24px",
              height: showNumber ? "13px" : "11.5px",
              border: `1.3px solid ${iconColor}`,
              borderRadius: "4px",
              padding: showNumber ? "0" : "1.2px",
              background: "transparent",
              boxSizing: "border-box",
            }}
          >
            {showNumber ? (
              // SVG interior: text-anchor + clipPath give a perfectly centered % and an
              // accurate level fill that html2canvas rasterizes exactly.
              <svg width="100%" height="100%" viewBox="0 0 24.4 10.4" preserveAspectRatio="none" style={{ display: "block" }} aria-hidden="true">
                <defs>
                  <clipPath id={clipId}>
                    <rect x="0" y="0" width={batteryFillW} height="10.4" />
                  </clipPath>
                </defs>
                {/* Base number — shows over the empty part */}
                <text x="12.2" y="5.2" textAnchor="middle" dominantBaseline="central" fontFamily={FONT} fontSize="9" fontWeight="800" fill={iconColor}>{battery}</text>
                {/* Level fill + knockout number, clipped to the charge level */}
                <g clipPath={`url(#${clipId})`}>
                  <rect x="0" y="0" width="24.4" height="10.4" fill={fillColor} />
                  <text x="12.2" y="5.2" textAnchor="middle" dominantBaseline="central" fontFamily={FONT} fontSize="9" fontWeight="800" fill={numberColor}>{battery}</text>
                </g>
              </svg>
            ) : (
              <div
                style={{
                  height: "100%",
                  width: `${battery}%`,
                  background: fillColor,
                  borderRadius: "1.5px",
                }}
              />
            )}

            {/* Charging bolt (classic model only — the others use the green fill) */}
            {s.charging && s.model === "classic" && (
              <svg
                viewBox="0 0 24 24"
                width="9"
                height="9"
                style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                aria-hidden="true"
              >
                <path d="M13 2L4.5 13.5H11l-1 8.5L19.5 10H13z" fill="#ffffff" stroke="rgba(0,0,0,0.25)" strokeWidth="0.5" />
              </svg>
            )}
          </div>
          {/* terminal nub */}
          <div
            style={{
              width: "2px",
              height: showNumber ? "5px" : "4.5px",
              marginLeft: "1px",
              background: iconColor,
              borderRadius: "0 2px 2px 0",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
