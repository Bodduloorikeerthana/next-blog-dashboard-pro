
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { toast } from "@/components/ui/sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediaUploader } from "@/components/media/MediaUploader";
import { Link, Link2, Heading1, Heading2, Heading3, Paragraph } from "lucide-react";

// Mock categories
const categories = [
  { id: "1", name: "Technology" },
  { id: "2", name: "Development" },
  { id: "3", name: "Programming" },
  { id: "4", name: "Design" },
];

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  excerpt: z.string().optional(),
  categoryId: z.string().min(1, { message: "Category is required" }),
  featuredImage: z.string().optional(),
  status: z.enum(["draft", "published"]),
  // SEO fields
  seoTitle: z.string().optional(),
  seoDescription: z.string().max(160, { message: "SEO description should be 160 characters or less" }).optional(),
  slug: z.string()
    .min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Slug must contain only lowercase letters, numbers, and hyphens" }),
  keywords: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface PostFormProps {
  defaultValues?: Partial<FormValues>;
  isEditing?: boolean;
}

export default function PostForm({ defaultValues, isEditing = false }: PostFormProps) {
  const navigate = useNavigate();
  const [featuredImage, setFeaturedImage] = useState<string | null>(defaultValues?.featuredImage || null);
  const [activeTab, setActiveTab] = useState<string>("editor");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      categoryId: "",
      status: "draft",
      seoTitle: "",
      seoDescription: "",
      slug: "",
      keywords: "",
      ...defaultValues,
    },
  });

  // Auto-generate slug from title
  const autoGenerateSlug = () => {
    const title = form.getValues("title");
    if (title && !form.getValues("slug")) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/--+/g, "-"); // Replace multiple hyphens with single hyphen
      
      form.setValue("slug", slug);
    }
  };

  // Auto-fill SEO title if empty
  const autoFillSeoTitle = () => {
    const title = form.getValues("title");
    if (title && !form.getValues("seoTitle")) {
      form.setValue("seoTitle", title);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast.success(isEditing ? "Post updated successfully" : "Post created successfully");
    navigate("/dashboard/posts");
  };

  const handleImageSelected = (url: string) => {
    setFeaturedImage(url);
    form.setValue("featuredImage", url);
  };

  const insertFormatting = (tag: string) => {
    const textarea = document.getElementById("content") as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const content = form.getValues("content");
    
    let newContent = content;
    let newCursorPos;
    
    const selectedText = content.substring(start, end);
    
    switch(tag) {
      case "h1":
        newContent = content.substring(0, start) + `# ${selectedText}` + content.substring(end);
        newCursorPos = start + 2 + selectedText.length;
        break;
      case "h2":
        newContent = content.substring(0, start) + `## ${selectedText}` + content.substring(end);
        newCursorPos = start + 3 + selectedText.length;
        break;
      case "h3":
        newContent = content.substring(0, start) + `### ${selectedText}` + content.substring(end);
        newCursorPos = start + 4 + selectedText.length;
        break;
      case "p":
        newContent = content.substring(0, start) + `${selectedText}\n\n` + content.substring(end);
        newCursorPos = start + selectedText.length + 2;
        break;
      case "link":
        newContent = content.substring(0, start) + `[${selectedText || "Link text"}](url)` + content.substring(end);
        newCursorPos = start + 1 + (selectedText || "Link text").length + 1;
        break;
    }
    
    form.setValue("content", newContent);
    
    // Set focus back to textarea and restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const renderContentPreview = () => {
    let content = form.watch("content");
    
    // Convert markdown-style headings
    content = content
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-4 mb-2">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-4 mb-2">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mt-3 mb-2">$1</h3>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-500 underline">$1</a>')
      .replace(/\n\n/g, '</p><p class="my-2">');
    
    return <div dangerouslySetInnerHTML={{ __html: `<p class="my-2">${content}</p>` }} />;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter post title" 
                          {...field} 
                          onBlur={() => {
                            autoGenerateSlug();
                            autoFillSeoTitle();
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <Label>Content</Label>
                  <div className="border rounded-md mb-2">
                    <div className="flex items-center border-b p-2 gap-1">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => insertFormatting('h1')}
                      >
                        <Heading1 className="h-4 w-4" />
                      </Button>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => insertFormatting('h2')}
                      >
                        <Heading2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => insertFormatting('h3')}
                      >
                        <Heading3 className="h-4 w-4" />
                      </Button>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => insertFormatting('p')}
                      >
                        <Paragraph className="h-4 w-4" />
                      </Button>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => insertFormatting('link')}
                      >
                        <Link2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="editor">Editor</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>
                      <TabsContent value="editor" className="pt-4">
                        <FormField
                          control={form.control}
                          name="content"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  id="content"
                                  placeholder="Write your post content here..."
                                  className="min-h-[300px] border-0 focus-visible:ring-0"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TabsContent>
                      <TabsContent value="preview" className="pt-4">
                        <div className="p-4 min-h-[300px]">
                          <h1 className="text-2xl font-bold mb-4">{form.watch("title")}</h1>
                          <div className="prose max-w-none">
                            {form.watch("content") ? (
                              renderContentPreview()
                            ) : (
                              <p className="text-muted-foreground">Your content preview will appear here...</p>
                            )}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Excerpt</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter a short excerpt for this post"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        A short summary of your post that will be displayed in list views.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="seo" className="space-y-6">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="post-url-slug" {...field} />
                      </FormControl>
                      <FormDescription>
                        The unique URL path for this post (e.g., domain.com/posts/your-slug)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seoTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO Title</FormLabel>
                      <FormControl>
                        <Input placeholder="SEO optimized title" {...field} />
                      </FormControl>
                      <FormDescription>
                        The title that appears in search engine results (defaults to post title if left empty)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="seoDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Brief description for search engines" 
                          {...field}
                          className="resize-none"
                        />
                      </FormControl>
                      <FormDescription>
                        <div className="flex justify-between">
                          <span>Meta description that appears in search results</span>
                          <span className={`${field.value && field.value.length > 160 ? 'text-destructive' : ''}`}>
                            {field.value ? field.value.length : 0}/160
                          </span>
                        </div>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keywords</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="keyword1, keyword2, keyword3" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Comma-separated keywords for SEO (optional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="published">Published</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
                <CardDescription>
                  Select an image to represent this post
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="featuredImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-4">
                          {featuredImage ? (
                            <div className="relative">
                              <img 
                                src={featuredImage} 
                                alt="Featured" 
                                className="w-full h-auto rounded-md object-cover" 
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2"
                                onClick={() => {
                                  setFeaturedImage(null);
                                  form.setValue("featuredImage", "");
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          ) : (
                            <MediaUploader 
                              onImageSelected={handleImageSelected} 
                              maxSize={1024 * 1024 * 2} // 2MB
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate("/dashboard/posts")}
          >
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
