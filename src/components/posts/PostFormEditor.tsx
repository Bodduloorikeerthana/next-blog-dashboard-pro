
import React, { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Heading1, Heading2, Heading3, Type, Link2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { PostFormValues } from "./PostFormTypes";

interface PostFormEditorProps {
  form: UseFormReturn<PostFormValues>;
  insertFormatting: (tag: string) => void;
  renderContentPreview: () => React.ReactNode;
}

export default function PostFormEditor({ 
  form, 
  insertFormatting, 
  renderContentPreview 
}: PostFormEditorProps) {
  const [activeTab, setActiveTab] = useState<string>("editor");

  return (
    <div>
      <Label>Content</Label>
      <div className="border rounded-md mb-2">
        <div className="flex items-center border-b p-2 gap-1 bg-gray-50">
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
            <Type className="h-4 w-4" />
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
    </div>
  );
}
