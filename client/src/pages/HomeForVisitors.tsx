import { useParams } from "react-router-dom";
import { useShowLinkToVisitors } from "../hooks/useShowLinkToVisitors";
import Sidebar from "../components/Sidebar";
import Cards from "../components/Cards";
import { useState } from "react";

export default function HomeForVisitors() {
  const { id } = useParams();
  const { showToVisitors, isLoading } = useShowLinkToVisitors(id!);

  const [currentFilter, setCurrentFilter] = useState<Filter>("all");

  console.log(showToVisitors, isLoading);

  if (isLoading ) return <div>Loading...</div>;

  return (
    <div className="md:grid md:grid-cols-[16rem_1fr]">
      <Sidebar setCurrentFilter={setCurrentFilter} />
      <main className="p-4 flex flex-col">
        <div className="flex justify-end md:justify-between items-center">
          <span className="text-2xl font-semibold hidden md:block">
            All Notes
          </span>
        </div>
        <div className="text-2xl font-semibold mt-6 md:hidden">All Notes</div>
        <Cards contents={showToVisitors} currentFilter={currentFilter} isVisitor={true} />
      </main>
    </div>
  );
}
