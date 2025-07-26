import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import { CiShare2 } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { useGetContent } from "../hooks/useGetContent";
import Cards from "../components/Cards";
import { useState } from "react";
import AddContent from "../components/AddContent";
import ShareModal from "../components/ShareModal";

export default function Home() {
  const { userContents, isLoading } = useGetContent();
  const [isAddingContent, setIsAddingContent] = useState(false);
  const [isOpenShare, setIsOpenShare] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<Filter>("all");

  if (isLoading || !userContents) return <div>Loading...</div>;

  return (
    <>
      <div className="md:grid md:grid-cols-[16rem_1fr]">
        <Sidebar setCurrentFilter={setCurrentFilter} />
        <main className="p-4 flex flex-col">
          <div className="flex justify-end md:justify-between items-center">
            <span className="text-2xl font-semibold hidden md:block">
              All Notes
            </span>
            <div className="flex gap-2">
              <Button
                className="flex items-center gap-2 px-4 py-2"
                variant="secondary"
                type="button"
                onClick={() => setIsOpenShare(true)}
              >
                <CiShare2 /> <span>Share Brain</span>
              </Button>
              <Button
                className="flex items-center gap-2 px-4 py-2"
                variant="primary"
                type="button"
                onClick={() => setIsAddingContent(true)}
              >
                <FaPlus /> <span>Add Content</span>
              </Button>
            </div>
          </div>
          <div className="text-2xl font-semibold mt-6 md:hidden">All Notes</div>
          <Cards contents={userContents} currentFilter={currentFilter} isVisitor={false} />
        </main>
      </div>

      {isAddingContent && (
        <AddContent setIsAddingContent={setIsAddingContent} />
      )}
      {isOpenShare && <ShareModal onClose={() => setIsOpenShare(false)} />}
    </>
  );
}
