// ShareModal.tsx
import { RxCross2 } from "react-icons/rx";
import { FaRegCopy } from "react-icons/fa6";
import { useGetContent } from "../hooks/useGetContent";
import Button from "./Button";
import { useShareLink } from "../hooks/useShareLink";
import { useState } from "react";

interface ShareModalProps {
  onClose: () => void;
}

export default function ShareModal({ onClose }: ShareModalProps) {
  const { userContents, isLoading } = useGetContent();
  const { shareLink, isPending } = useShareLink();
  const [copy, setCopy] = useState(false);

  if (isLoading || isPending) return <div>Loading...</div>;

  function handleCopy() {
    
    try {
      shareLink(
        { share: true },
        {
          onSuccess: (data) => {
            if (!data || !data.data) {
              console.error("No valid link in response data");
              return;
            }
            const copiedLink = data.data;

            navigator.clipboard.writeText(copiedLink).then(() => {
              setCopy(true);
              setTimeout(() => {
                setCopy(false);
              }, 2000);
            });
          },
        }
      );
    } catch (error) {
      console.error("Failed to copy!", error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="flex justify-between items-center mb-3">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Share Your Second Brain
          </h2>
          <RxCross2 size={25} className="cursor-pointer" onClick={onClose} />
        </div>

        <p className="mb-6 text-sm text-gray-600">
          Share your entire collection of notes, documents, tweets, and videos
          with others. They'll be able to able to see your collection.
        </p>

        <Button
          variant="primary"
          type="button"
          onClick={handleCopy}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 hover:bg-indigo-700 transition cursor-pointer"
        >
          <FaRegCopy size={20} />
          {copy ? "Link Copied!" : "Share Brain"}
        </Button>

        <p className="mt-4 text-center text-sm text-gray-500">
          {userContents?.data?.length ?? 0} items will be shared
        </p>
      </div>
    </div>
  );
}
