
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { PostFormValues } from "./PostFormTypes";

interface PostFormPreviewProps {
  form: UseFormReturn<PostFormValues>;
  featuredImage: string | null;
  renderContentPreview: () => React.ReactNode;
}

export default function PostFormPreview({ form, featuredImage, renderContentPreview }: PostFormPreviewProps) {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{form.watch("title") || "Post Title"}</h1>
        
        {featuredImage && (
          <div className="mb-6">
            <img 
              src={featuredImage} 
              alt={form.watch("title")} 
              className="w-full h-auto rounded-lg object-cover" 
            />
          </div>
        )}
        
        <div className="prose max-w-none">
          {form.watch("content") ? (
            renderContentPreview()
          ) : (
            <p className="text-gray-400">Your post content will appear here...</p>
          )}
        </div>
        
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-semibold mb-2">Meta Information</h3>
          <div className="bg-gray-50 p-4 rounded-md space-y-3">
            <div>
              <span className="text-sm font-medium block text-gray-500">SEO Title:</span>
              <span className="text-blue-600">{form.watch("seoTitle") || form.watch("title") || "Post Title"}</span>
            </div>
            <div>
              <span className="text-sm font-medium block text-gray-500">SEO Description:</span>
              <span className="text-gray-700">{form.watch("seoDescription") || form.watch("excerpt") || "No description provided"}</span>
            </div>
            <div>
              <span className="text-sm font-medium block text-gray-500">URL:</span>
              <span className="text-green-600">yourblog.com/posts/{form.watch("slug") || "post-url"}</span>
            </div>
            <div>
              <span className="text-sm font-medium block text-gray-500">Keywords:</span>
              <span className="text-gray-700">{form.watch("keywords") || "No keywords specified"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
