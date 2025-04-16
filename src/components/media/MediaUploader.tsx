
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Upload } from "lucide-react";

interface MediaUploaderProps {
  onImageSelected: (url: string) => void;
  maxSize?: number;
  acceptedTypes?: string;
}

export function MediaUploader({
  onImageSelected,
  maxSize = 1024 * 1024 * 5, // 5MB default
  acceptedTypes = "image/*",
}: MediaUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Validate file size
    if (file.size > maxSize) {
      toast.error(`File too large. Maximum size is ${formatBytes(maxSize)}`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are supported");
      return;
    }

    // Create a temporary URL for the file
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        // In a real app, you would upload the file to a server here
        // For now, we'll just use the data URL
        onImageSelected(e.target.result.toString());
        toast.success("Image uploaded successfully");
      }
    };
    reader.readAsDataURL(file);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div
      className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
        isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept={acceptedTypes}
      />
      <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
      <div className="text-sm text-muted-foreground mb-1">
        <span className="font-medium">Click to upload</span> or drag and drop
      </div>
      <p className="text-xs text-muted-foreground">
        Image (max. {formatBytes(maxSize)})
      </p>
    </div>
  );
}
