import { IconType } from "react-icons";
import {
  FaBellSlash,
  FaTelegramPlane,
  FaWhatsapp,
  FaYoutube,
  FaInstagram,
  FaFacebookMessenger,
  FaFacebookF,
  FaSnapchatGhost,
  FaEnvelope,
  FaPhoneSlash,
  FaCommentDots,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export interface NotificationOption {
  id: string;
  label: string;
  Icon: IconType;
}

/**
 * All selectable notification icons shown on the left of the status bar.
 * Rendered monochrome (they take the status bar's theme color — black or white).
 */
export const NOTIFICATION_OPTIONS: NotificationOption[] = [
  { id: "muted", label: "Muted", Icon: FaBellSlash },
  { id: "telegram", label: "Telegram", Icon: FaTelegramPlane },
  { id: "whatsapp", label: "WhatsApp", Icon: FaWhatsapp },
  { id: "youtube", label: "YouTube", Icon: FaYoutube },
  { id: "instagram", label: "Instagram", Icon: FaInstagram },
  { id: "messenger", label: "Messenger", Icon: FaFacebookMessenger },
  { id: "facebook", label: "Facebook", Icon: FaFacebookF },
  { id: "twitter", label: "X", Icon: FaXTwitter },
  { id: "snapchat", label: "Snapchat", Icon: FaSnapchatGhost },
  { id: "gmail", label: "Gmail", Icon: FaEnvelope },
  { id: "missed", label: "Missed Call", Icon: FaPhoneSlash },
  { id: "sms", label: "Message", Icon: FaCommentDots },
];

/** Max number of notification icons the customer may pick (keeps the left side tidy). */
export const MAX_NOTIFICATIONS = 4;

export const notificationById = (id: string): NotificationOption | undefined =>
  NOTIFICATION_OPTIONS.find((o) => o.id === id);
