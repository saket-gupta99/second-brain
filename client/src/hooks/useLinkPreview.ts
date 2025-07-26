import { useEffect, useState } from "react";
import api from "../libs/axios";

// const key = import.meta.env.VITE_LINKPREVIEW_SECRET;

export function useLinkPreview(url: string) {
  const [preview, setPreview] = useState<{
    title: string;
    description: string;
    image: string;
    url: string;
  } | null>(null);

  useEffect(() => {
    async function fetchPreview() {
      try {
        // const res = await fetch(
        //   // `https://api.linkpreview.net/?key=${key}&q=${url}`
        //   {
        //     credentials: "include"
        //   }
        // );

        const data = await api.get(`/preview?url=${encodeURIComponent(url)}`);
        setPreview(data.data.data);
      } catch (err) {
        console.error("Failed to fetch link preview", err);
        setPreview({
          title: "Link Preview Unavailable",
          description: "Could not load preview for this link",
          image: "",
          url: url,
        });
      }
    }

    if (url) fetchPreview();
  }, [url]);

  return preview;
}
