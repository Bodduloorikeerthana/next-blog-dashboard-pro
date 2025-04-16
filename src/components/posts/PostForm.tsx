
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, LayoutGrid, PlusCircle, Tags } from "lucide-react";

// Import our newly created components
import PostFormEditor from "./PostFormEditor";
import PostFormSEO from "./PostFormSEO";
import PostFormPreview from "./PostFormPreview";
import PostFormPlugins from "./PostFormPlugins";
import PostFormSidebar from "./PostFormSidebar";
import { postFormSchema, PostFormValues, categories, plugins } from "./PostFormTypes";

interface PostFormProps {
  defaultValues?: Partial<PostFormValues>;
  isEditing?: boolean;
}

export default function PostForm({ defaultValues, isEditing = false }: PostFormProps) {
  const navigate = useNavigate();
  const [featuredImage, setFeaturedImage] = useState<string | null>(defaultValues?.featuredImage || null);
  const [mainTab, setMainTab] = useState<string>("content");
  const [enabledPlugins, setEnabledPlugins] = useState<string[]>(defaultValues?.selectedPlugins || []);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postFormSchema),
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
      publishDate: new Date().toISOString().split('T')[0],
      enableComments: true,
      selectedPlugins: [],
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

  const onSubmit = (data: PostFormValues) => {
    // Add the enabled plugins to the data
    data.selectedPlugins = enabledPlugins;
    
    console.log(data);
    toast.success(isEditing ? "Post updated successfully" : "Post created successfully");
    navigate("/dashboard/posts");
  };

  const togglePlugin = (pluginId: string) => {
    setEnabledPlugins(prev => 
      prev.includes(pluginId) 
        ? prev.filter(id => id !== pluginId)
        : [...prev, pluginId]
    );
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3 space-y-6">
            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="border-b bg-gray-50 rounded-t-lg">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="mb-0">
                      <FormControl>
                        <Input 
                          placeholder="Enter post title" 
                          className="text-xl font-medium border-0 px-0 focus-visible:ring-0 placeholder:text-gray-400 bg-transparent"
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
              </CardHeader>
              
              <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
                <div className="flex items-center border-b bg-gray-50 px-4">
                  <TabsList className="h-12 bg-transparent gap-2">
                    <TabsTrigger 
                      value="content" 
                      className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none">
                      <LayoutGrid className="h-4 w-4 mr-2" />
                      Content
                    </TabsTrigger>
                    <TabsTrigger 
                      value="seo" 
                      className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none">
                      <Tags className="h-4 w-4 mr-2" />
                      SEO
                    </TabsTrigger>
                    <TabsTrigger 
                      value="preview" 
                      className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger 
                      value="plugins" 
                      className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Plugins
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="content" className="space-y-6 p-6">
                  <PostFormEditor 
                    form={form} 
                    insertFormatting={insertFormatting} 
                    renderContentPreview={renderContentPreview} 
                  />
                </TabsContent>

                <TabsContent value="seo" className="space-y-6 p-6">
                  <PostFormSEO form={form} />
                </TabsContent>
                
                <TabsContent value="preview" className="p-6">
                  <PostFormPreview 
                    form={form} 
                    featuredImage={featuredImage} 
                    renderContentPreview={renderContentPreview} 
                  />
                </TabsContent>
                
                <TabsContent value="plugins" className="p-6">
                  <PostFormPlugins 
                    plugins={plugins} 
                    enabledPlugins={enabledPlugins} 
                    togglePlugin={togglePlugin} 
                  />
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="space-y-6">
            <PostFormSidebar 
              form={form} 
              featuredImage={featuredImage} 
              setFeaturedImage={setFeaturedImage} 
              categories={categories} 
            />
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
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            {isEditing ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
