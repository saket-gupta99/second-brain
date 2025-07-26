import { useState } from "react";
import { useCreateContent } from "../hooks/useCreateContent";
import Button from "./Button";
import { RxCross2 } from "react-icons/rx";
import DocumentEditor from "./DocumentEditor";

export default function AddContent({
  setIsAddingContent,
}: {
  setIsAddingContent: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [formData, setFormData] = useState<FormContent>({
    title: "",
    linkUrl: "",
    type: "article",
    content: "",
    tags: [],
  });
  const [tag, setTag] = useState("");
  const { createContent, isPending } = useCreateContent();

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createContent(formData);

    setFormData({
      title: "",
      linkUrl: "",
      content: "",
      type: "article",
      tags: [],
    });
    setIsAddingContent(false);
  }

  function setTags(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      setFormData((formData) => ({
        ...formData,
        tags: [...(formData.tags ?? []), tag],
      }));
      setTag("");
    }
  }

  function removeTag(removeTag: string) {
    setFormData((formData) => ({
      ...formData,
      tags: formData.tags
        ? formData.tags.filter((tag) => tag !== removeTag)
        : [],
    }));
  }

  if (isPending) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/70">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg flex flex-col gap-4"
      >
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold text-center mb-2">
            Add Content
          </h2>
          <RxCross2
            size={25}
            className="cursor-pointer"
            onClick={() => setIsAddingContent(false)}
          />
        </div>

        <select
          value={formData.type}
          onChange={(e) =>
            setFormData({
              ...formData,
              type: e.target.value as Content["type"],
            })
          }
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="link">Link</option>
          <option value="document">Document</option>
          <option value="tweet">Tweet</option>
          <option value="video">Video</option>
        </select>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleFormChange}
          placeholder="Title"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        {formData.type !== "document" && (
          <input
            type="text"
            name="linkUrl"
            value={formData.linkUrl}
            onChange={handleFormChange}
            placeholder="Link"
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        )}

        <input
          type="text"
          name="tags"
          value={tag ?? ""}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={setTags}
          placeholder="Tags (press Enter to add tags)"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formData.tags && formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {formData.tags.map((tag) => (
              <span
                className="text-blue bg-light-blue rounded-xl px-1 py-0.5 flex gap-0.5"
                key={tag}
              >
                #{tag}{" "}
                <RxCross2
                  className="text-black cursor-pointer"
                  size={12}
                  onClick={() => removeTag(tag)}
                />
              </span>
            ))}
          </div>
        )}

        {formData.type === "document" && (
          <DocumentEditor
            value={formData.content ?? ""}
            onChange={(value) => setFormData({ ...formData, content: value })}
            className="mb-4"
          />
        )}

        <Button
          variant="primary"
          type="submit"
          className="mt-2  text-white font-semibold py-2 rounded-md disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
