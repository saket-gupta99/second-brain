import {z} from "zod";

export const createContentSchema = z.object({
    title: z.string().min(5),
    tags: z.array(z.string()).optional(),
    type: z.enum(["tweet", "document", "video", "audio", "article"]),
    linkUrl: z.url(),
    content: z.string().optional()
})

export const deleteContentSchema = z.object({
    contentId: z.string(),
})

export const shareContentSchema = z.object({
    share: z.boolean(),
})