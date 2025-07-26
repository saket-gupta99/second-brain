import type { AxiosError } from "axios";
import { CiTwitter, CiYoutube } from "react-icons/ci";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoMdLink } from "react-icons/io";
import { LiaHashtagSolid } from "react-icons/lia";

export function cn(...args: (string | null | false | null | undefined)[]) {
  return args.filter(Boolean).join(" ");
}

export function errorMessage(err: AxiosError) {
  const apiErr = err.response?.data as ApiError;

  const errMsg =
    Array.isArray(apiErr.errors) && apiErr.errors.length > 0
      ? apiErr.errors.join(", ")
      : apiErr.message;

  return errMsg;
}

export const sidebarLinks = [
  { name: "all", icon: LiaHashtagSolid },
  { name: "tweet", icon: CiTwitter },
  { name: "video", icon: CiYoutube },
  { name: "document", icon: IoDocumentTextOutline },
  { name: "article", icon: IoMdLink },
];

export function getYouTubeThumbnail(link: string) {
  const match = link.match(/(?:v=|youtu\.be\/)([^&\n]+)/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

export function extractTweetId(url: string) {
  const match = url.match(/twitter\.com\/.*?\/status\/(\d+)/);
  return match ? match[1] : null;
}

export function extractDate(date:Date) {
  return date.toString().split("T")[0].split("-").reverse().join("/")
}
