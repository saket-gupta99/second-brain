import { useLinkPreview } from "../hooks/useLinkPreview";

function ArticleCard({ link }: { link: string }) {
  const preview = useLinkPreview(link);

  if (!preview)
    return <div className="text-gray-400 text-sm">Loading preview...</div>;

  return (
    <a href={preview.url} target="_blank" rel="noopener noreferrer">
      <img
        src={preview.image}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = "/placeholder.png";
        }}
        alt={preview.title}
        className="w-full h-40 object-cover rounded-md mb-2"
      />
      <h2 className="text-lg font-semibold">{preview.title}</h2>
      <p className="text-sm text-gray-600">{preview.description}</p>
    </a>
  );
}

export default ArticleCard;
