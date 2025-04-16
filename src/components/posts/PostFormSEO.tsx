
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { PostFormValues } from "./PostFormTypes";

interface PostFormSEOProps {
  form: UseFormReturn<PostFormValues>;
}

export default function PostFormSEO({ form }: PostFormSEOProps) {
  return (
    <div className="space-y-6">
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
    </div>
  );
}
