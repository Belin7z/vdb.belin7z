import QRCode from "qrcode";
import { SITE } from "@/config/site";

export async function getProfileQrSvg(): Promise<string> {
  return QRCode.toString(SITE.url, {
    type: "svg",
    margin: 1,
    width: 240,
    color: { dark: "#e9d5ff", light: "#0000" },
  });
}
