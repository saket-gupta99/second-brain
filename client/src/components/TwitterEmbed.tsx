import { useEffect, useRef } from "react";

// TypeScript declarations for Twitter widgets
declare global {
  interface Window {
    twttr?: {
      widgets: {
        createTweet: (
          tweetId: string,
          container: HTMLElement,
          options?: {
            theme?: string;
            width?: string;
            conversation?: string;
            cards?: string;
          }
        ) => Promise<HTMLElement>;
      };
    };
  }
}

interface TwitterEmbedProps {
  url: string;
}

export default function TwitterEmbed({ url }: TwitterEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isTweetLoaded = false;

    const embedTweet = () => {
      if (
        !isTweetLoaded &&
        window.twttr &&
        containerRef.current &&
        url
      ) {
        const tweetId = extractTweetId(url);
        if (!tweetId) return;

        isTweetLoaded = true;

        window.twttr.widgets
          .createTweet(tweetId, containerRef.current, {
            theme: "light",
            width: "100%",
            conversation: "none",
            cards: "visible",
          })
          .catch((err) => console.error("Error embedding tweet", err));
      }
    };

    const extractTweetId = (tweetUrl: string): string | null => {
      const regex =
        /(?:twitter\.com|x\.com)\/(?:#!\/)?\w+\/status(?:es)?\/(\d+)/;
      const match = tweetUrl.match(regex);
      return match ? match[1] : null;
    };

    // Clear previous content
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    // Load the Twitter script if not already loaded
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = embedTweet;
      document.head.appendChild(script);

      // Cleanup: remove script on unmount
      return () => {
        document.head.removeChild(script);
      };
    } else {
      embedTweet();
    }
  }, [url]);

  if (!url) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <span className="text-gray-500">No tweet URL provided</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className="min-h-[200px] flex items-center justify-center"
      >
        {/* Loading indicator */}
        <div className="flex items-center space-x-2 text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          <span>Loading tweet...</span>
        </div>
      </div>
    </div>
  );
}
