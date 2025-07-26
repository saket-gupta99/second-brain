import { extractDate, getYouTubeThumbnail, sidebarLinks } from "../libs/utils";
import { RiDeleteBinLine } from "react-icons/ri";
import TwitterEmbed from "./TwitterEmbed";
import ArticleCard from "./ArticleCard";
import { useDeleteContent } from "../hooks/useDeleteContent";
import { useParams } from "react-router-dom";

export default function Cards({
  contents: { data },
  currentFilter,
  isVisitor,
}: {
  contents: ApiResponse<Content[]>;
  currentFilter: string;
  isVisitor: boolean;
}) {
  const { deleteContent, isPending } = useDeleteContent();
  const { id } = useParams();

  function deleteCard(contentId: string) {
    if (id) return;
    deleteContent({ contentId });
  }

  if (isPending) return <div>Loading...</div>;

  const filteredResult = data.filter((el) => el.type === currentFilter);
  const finalResult =
    !filteredResult.length && currentFilter === "all"
      ? data
      : !filteredResult.length
      ? []
      : filteredResult;

  if (!finalResult.length)
    return (
      <div className="text-center text-3xl font-semibold mt-10">
        No Results for {currentFilter} found
      </div>
    );

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-10">
      {finalResult.map((card: Content) => {
        const Icon = sidebarLinks.find((side) => side.name === card.type)?.icon;

        return (
          <div key={card._id} className="shadow-md rounded-lg  p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-gray-700">
                  {Icon ? <Icon size={25} /> : null}
                </span>
                <span className="capitalize font-semibold">{card.title}</span>
              </div>
              {!isVisitor && (
                <RiDeleteBinLine
                  className="text-gray-500 cursor-pointer"
                  size={22}
                  onClick={() => deleteCard(card._id!)}
                />
              )}
            </div>

            <div className="p-4">
              {card.type === "video" && card.linkUrl && (
                <a
                  href={card.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <img
                    src={
                      getYouTubeThumbnail(card.linkUrl) || "/placeholder.png"
                    }
                    alt={card.title}
                    className="rounded-lg shadow-sm w-full aspect-video object-cover"
                  />
                </a>
              )}

              {card.type === "tweet" && card.linkUrl && (
                <TwitterEmbed url={card.linkUrl} />
              )}

              {card.type === "article" && card.linkUrl && (
                <ArticleCard link={card.linkUrl} />
              )}

              {card.type === "document" && (
                <div
                  className="document-content"
                  dangerouslySetInnerHTML={{ __html: card.content || "" }}
                />
              )}
            </div>

            <div className="flex flex-wrap gap-1">
              {card.tags?.map((tag) => (
                <span
                  className="text-blue bg-light-blue rounded-xl px-1.5 py-0.5"
                  key={tag._id}
                >
                  #{tag.title}
                </span>
              ))}
            </div>

            <div className="mt-2 text-gray-600">
              Added on {card.createdAt && extractDate(card.createdAt)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
