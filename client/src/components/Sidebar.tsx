import { useEffect, useState } from "react";
import { LuBrain } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import SidebarNav from "./SidebarNav";

export default function Sidebar({
  setCurrentFilter,
}: {
  setCurrentFilter: React.Dispatch<React.SetStateAction<Filter>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const checkSize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const SidebarHeader = ({ showCloseButton = false }) => (
    <div className="flex items-center justify-between p-4 ">
      <div className="flex gap-2 items-center">
        <LuBrain className="text-blue" size={30} />
        <span className="text-xl font-bold">Second Brain</span>
      </div>
      {showCloseButton && (
        <RxCross2
          size={28}
          onClick={() => setIsOpen(false)}
          className="cursor-pointer"
        />
      )}
    </div>
  );

  if (isSmallScreen) {
    return (
      <>
        <div className="p-2">
          <GiHamburgerMenu
            size={28}
            onClick={() => setIsOpen(true)}
            className="cursor-pointer"
          />
        </div>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/30 z-20"
              onClick={() => setIsOpen(false)}
            />
            <aside className="fixed top-0 left-0 w-3/4 h-full bg-white z-30 shadow-lg">
              <SidebarHeader showCloseButton />
              <SidebarNav setCurrentFilter={setCurrentFilter} setIsOpen={setIsOpen} />
            </aside>
          </>
        )}
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside className="hidden md:block w-64 min-h-screen  shadow-md bg-white">
      <SidebarHeader />
      <SidebarNav setCurrentFilter={setCurrentFilter} />
    </aside>
  );
}
