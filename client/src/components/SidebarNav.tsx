import { sidebarLinks } from "../libs/utils";

const SidebarNav = ({
  setCurrentFilter,
  setIsOpen,
}: {
  setCurrentFilter: React.Dispatch<React.SetStateAction<Filter>>;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="space-y-4 mt-6 p-4">
      {sidebarLinks.map((link) => (
        <div
          key={link.name}
          className="flex gap-3 items-center text-lg font-medium text-gray-700 capitalize cursor-pointer hover:bg-gray-100 p-1 rounded-md"
          onClick={() => {
            setCurrentFilter(link.name as Filter);
            setIsOpen?.(false);
          }}
        >
          <link.icon size={28} />
          {link.name}
          {!link.name.endsWith("s") && link.name !== "all" && "s"}
        </div>
      ))}
    </div>
  );
};

export default SidebarNav;
