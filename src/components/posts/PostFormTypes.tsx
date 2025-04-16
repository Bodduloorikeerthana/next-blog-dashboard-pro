
import { z } from "zod";

export const postFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  excerpt: z.string().optional(),
  categoryId: z.string().min(1, { message: "Category is required" }),
  featuredImage: z.string().optional(),
  status: z.enum(["draft", "published"]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().max(160, { message: "SEO description should be 160 characters or less" }).optional(),
  slug: z.string()
    .min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Slug must contain only lowercase letters, numbers, and hyphens" }),
  keywords: z.string().optional(),
  publishDate: z.string().optional(),
  enableComments: z.boolean().default(true),
  selectedPlugins: z.array(z.string()).default([]),
});

export type PostFormValues = z.infer<typeof postFormSchema>;

// Mock categories
export const categories = [
  { id: "1", name: "Technology" },
  { id: "2", name: "Development" },
  { id: "3", name: "Programming" },
  { id: "4", name: "Design" },
];

// Mock plugins
export const plugins = [
  { id: "1", name: "SEO Optimizer", description: "Optimize your posts for search engines" },
  { id: "2", name: "Social Sharing", description: "Add social sharing buttons to your posts" },
  { id: "3", name: "Markdown Editor", description: "Edit your posts with markdown" },
  { id: "4", name: "Related Posts", description: "Show related posts at the end of your content" },
];
