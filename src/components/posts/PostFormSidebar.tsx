
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, Image, Settings } from "lucide-react";
import { MediaUploader } from "@/components/media/MediaUploader";
import { UseFormReturn } from "react-hook-form";
import { PostFormValues } from "./PostFormTypes";

interface PostFormSidebarProps {
  form: UseFormReturn<PostFormValues>;
  featuredImage: string | null;
  setFeaturedImage: React.Dispatch<React.SetStateAction<string | null>>;
  categories: { id: string; name: string }[];
}

export default function PostFormSidebar({ 
  form, 
  featuredImage, 
  setFeaturedImage, 
  categories 
}: PostFormSidebarProps) {
  const handleImageSelected = (url: string) => {
    setFeaturedImage(url);
    form.setValue("featuredImage", url);
  };

  return (
    <div className="space-y-6">
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="flex items-center text-lg">
            <Settings className="h-4 w-4 mr-2" />
            Post Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
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
          
          <FormField
            control={form.control}
            name="publishDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publish Date</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <Input type="date" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="enableComments"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="comments" className="text-sm font-medium text-gray-700">
                      Allow comments on this post
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="flex items-center text-lg">
            <Image className="h-4 w-4 mr-2" />
            Featured Image
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="featuredImage"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="space-y-4 pt-4">
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
  );
}
