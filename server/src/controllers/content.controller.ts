import { IContent } from "../custom.js";
import { Content } from "../models/content.model.ts";
import { Link } from "../models/link.model.ts";
import { Tags } from "../models/tags.model.ts";
import { ApiError } from "../utils/apiError.ts";
import { ApiResponse } from "../utils/apiResponse.ts";
import { asyncHandler } from "../utils/asyncHandler.ts";
import * as cheerio from "cheerio";
import axios from "axios";

export const createContent = asyncHandler(async (req, res) => {
  if (!req.user) throw new ApiError(400, "Only authenticated users can visits");

  const { type, linkUrl, title, tags, content: contentDoc } = req.body;

  let combinedIds;

  if (tags) {
    const allTags = await Tags.find();

    const existingTags = allTags.filter((tag) => tags.includes(tag.title));
    const existingTitles = existingTags.map((tag) => tag.title);
    const existingIds = existingTags.map((tag) => tag._id);
    const tagsToAdd = tags.filter(
      (tag: string) => !existingTitles.includes(tag)
    );

    const newIds = [];
    for (const tag of tagsToAdd) {
      const id = await Tags.create({ title: tag });
      newIds.push(id);
    }

    combinedIds = [...existingIds, ...newIds];
  }

  const content = await Content.create({
    title,
    type,
    linkUrl,
    tags: combinedIds,
    content: contentDoc,
    userId: req.user._id,
  });

  return res.status(201).json(new ApiResponse(201, "content created", content));
});

export const getContent = asyncHandler(async (req, res) => {
  if (!req.user) throw new ApiError(400, "Only authenticated users can visits");

  const content = await Content.find({ userId: req.user._id }).populate({
    path: "tags",
    select: "title",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "content fetched successfully", content));
});

export const deleteContent = asyncHandler(async (req, res) => {
  if (!req.user) throw new ApiError(400, "Only authenticated users can visits");

  const { contentId } = req.body;

  const content = await Content.findById(contentId);

  if (!content) throw new ApiError(400, "no content found");

  if (!content.userId.equals(req.user._id)) {
    throw new ApiError(403, "Can't delete other users content");
  }

  await Content.findByIdAndDelete(contentId);

  res
    .status(200)
    .json(new ApiResponse(200, "content deleted successfully", null));
});

export const shareContentLink = asyncHandler(async (req, res) => {
  if (!req.user) throw new ApiError(400, "Only authenticated users can visits");

  const { share } = req.body;
  const hash = crypto.randomUUID();
  const linkUrl = process.env.CORS_ORIGIN + "/home-visitor/" + hash;

  const content = await Content.find({ userId: req.user._id });

  if (!content.length) throw new ApiError(400, "No content  to share");

  await Link.deleteMany({ userId: req.user._id });

  if (share) {
    await Link.create({
      hash,
      userId: req.user._id,
      isActive: true,
    });
  }

  res.status(200).json(new ApiResponse(200, "share link generated", linkUrl));
});

export const showSharedContent = asyncHandler(async (req, res) => {
  const shareId = req.params.shareLink;

  const doesLinkExists = await Link.findOne({ hash: shareId });

  if (!doesLinkExists) throw new ApiError(404, "link doesn't exists");

  const content = await Content.find({
    userId: doesLinkExists.userId,
  }).populate({
    path: "tags",
    select: "title",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "content fetched successfully", content));
});

//for link preview
export const previewLink = asyncHandler(async (req, res) => {
  try {
    const { url } = req.query;

    if (!url || typeof url !== "string") {
      throw new ApiError(400, "Valid URL string is required");
    }

    // Additional URL validation
    try {
      new URL(url); // This will throw if URL is invalid
    } catch {
      throw new ApiError(400, "Invalid URL format");
    }

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Fetch the webpage
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
      timeout: 10000,
    });

    const $ = cheerio.load(response.data);

    // Extract metadata
    const title =
      $('meta[property="og:title"]').attr("content") ||
      $("title").text() ||
      $("h1").first().text() ||
      "No title found";

    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      $("p").first().text().substring(0, 160) ||
      "No description found";

    const image =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      $("img").first().attr("src") ||
      "";

    // Handle relative URLs for images
    let absoluteImage = image;
    if (image && !image.startsWith("http")) {
      const urlObj = new URL(url);
      absoluteImage = new URL(image, urlObj.origin).href;
    }

    return res.status(200).json(
      new ApiResponse(200, "url preview ready", {
        title: title.trim(),
        description: description.trim(),
        image: absoluteImage,
        url: url,
      })
    );
  } catch (error) {
    console.error("Scraping error:", error);
    res.status(500).json({
      error: "Failed to fetch preview",
      title: "Error loading preview",
      description: "Could not load preview for this link",
      image: "",
      url: req.query.url,
    });
  }
});
