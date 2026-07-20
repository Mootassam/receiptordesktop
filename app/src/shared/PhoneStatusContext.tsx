import React, { createContext, useContext, ReactNode } from "react";

export type PhoneBarTheme = "auto" | "light" | "dark";

/**
 * Status-bar visual model (skin):
 *  - "classic"  → bars · wifi · plain battery capsule (no %)
 *  - "ios"      → dotted signal · wifi · solid battery with % inside
 *  - "bars"     → bars · wifi · outlined battery with % inside
 *  - "cellular" → bars · "4G" text · outlined battery with % inside
 */
export type PhoneBarModel = "classic" | "ios" | "bars" | "cellular";

export interface PhoneStatus {
  /** Which visual model / skin to render. */
  model: PhoneBarModel;
  /** Time shown on the left of the status bar. Empty falls back to the template default. */
  time: string;
  /** Battery charge 0–100 (controls the fill width / the number shown). */
  battery: number;
  /** Show the charging bolt (and green fill). */
  charging: boolean;
  /** Low-power mode — tints the battery yellow. */
  lowPower: boolean;
  /** Cellular signal strength, 0–4 filled bars. */
  signal: number;
  /** Whether the Wi-Fi icon is shown (ignored by the "cellular" model). */
  wifi: boolean;
  /** Network label for the "cellular" model, e.g. "4G", "5G", "LTE". */
  network: string;
  /** Selected notification icon ids shown to the right of the time (max 4). */
  notifications: string[];
  /**
   * Icon/text color:
   *  - "auto"  → follow each template's own background (default)
   *  - "light" → force black icons (for light backgrounds)
   *  - "dark"  → force white icons (for dark backgrounds)
   */
  theme: PhoneBarTheme;
}

export const defaultPhoneStatus: PhoneStatus = {
  model: "classic",
  time: "",
  battery: 72,
  charging: false,
  lowPower: false,
  signal: 4,
  wifi: true,
  network: "4G",
  notifications: [],
  theme: "auto",
};

interface PhoneStatusContextType {
  phoneStatus: PhoneStatus;
  setPhoneStatus: React.Dispatch<React.SetStateAction<PhoneStatus>>;
}

const PhoneStatusContext = createContext<PhoneStatusContextType>({
  phoneStatus: defaultPhoneStatus,
  setPhoneStatus: () => {},
});

interface PhoneStatusProviderProps {
  children: ReactNode;
  value: PhoneStatusContextType;
}

export const PhoneStatusProvider: React.FC<PhoneStatusProviderProps> = ({ children, value }) => {
  return <PhoneStatusContext.Provider value={value}>{children}</PhoneStatusContext.Provider>;
};

export const usePhoneStatus = () => useContext(PhoneStatusContext);

export default PhoneStatusContext;
