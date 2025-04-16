
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { 
  Copy, 
  Download, 
  MoreVertical, 
  Trash2, 
  ExternalLink 
} from "lucide-react";
import { MediaUploader } from "./MediaUploader";

interface MediaItem {
  id: string;
  url: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: Date;
}

// Mock data
const initialMedia: MediaItem[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131",
    name: "cat-photo.jpg",
    type: "image/jpeg",
    size: 1024 * 1024 * 1.5, // 1.5MB
    uploadedAt: new Date("2023-04-15"),
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
    name: "dog-photo.jpg",
    type: "image/jpeg",
    size: 1024 * 1024 * 2, // 2MB
    uploadedAt: new Date("2023-04-14"),
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    name: "orange-cat.jpg",
    type: "image/jpeg",
    size: 1024 * 1024 * 1.2, // 1.2MB
    uploadedAt: new Date("2023-04-13"),
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2",
    name: "cute-dog.jpg",
    type: "image/jpeg",
    size: 1024 * 1024 * 1.8, // 1.8MB
    uploadedAt: new Date("2023-04-12"),
  },
];

export default function MediaGrid() {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [showUploader, setShowUploader] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const handleMediaUpload = (url: string) => {
    const newMedia: MediaItem = {
      id: `${Date.now()}`,
      url,
      name: `image-${Date.now()}.jpg`,
      type: "image/jpeg",
      size: 1024 * 1024 * 2, // Mock size
      uploadedAt: new Date(),
    };
    
    setMedia([newMedia, ...media]);
    setShowUploader(false);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const deleteMedia = (id: string) => {
    setMedia(media.filter((item) => item.id !== id));
    toast.success("Media deleted successfully");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-6">
      {showUploader ? (
        <div className="mb-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Upload New Media</h3>
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUploader(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <MediaUploader onImageSelected={handleMediaUpload} />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex justify-end">
          <Button onClick={() => setShowUploader(true)}>
            Upload New Media
          </Button>
        </div>
      )}
      
      {media.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium mb-2">No media found</h3>
          <p className="text-muted-foreground mb-4">Upload your first image to get started</p>
          <Button onClick={() => setShowUploader(true)}>
            Upload New Media
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {media.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div 
                  className="aspect-square relative cursor-pointer"
                  onClick={() => setSelectedMedia(item)}
                >
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              </CardContent>
              <CardFooter className="p-2 bg-card flex items-center justify-between">
                <div className="truncate text-sm" title={item.name}>
                  {item.name}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedMedia(item)}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      <span>View Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => copyToClipboard(item.url)}>
                      <Copy className="mr-2 h-4 w-4" />
                      <span>Copy URL</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => window.open(item.url, "_blank")}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      <span>Download</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => deleteMedia(item.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Media Details Dialog */}
      <Dialog open={!!selectedMedia} onOpenChange={(open) => !open && setSelectedMedia(null)}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedMedia && (
            <>
              <DialogHeader>
                <DialogTitle>Media Details</DialogTitle>
                <DialogDescription>
                  View and manage the details of this media file.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="aspect-video relative">
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.name}
                    className="w-full h-full object-contain border rounded-md"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="media-name">Name</Label>
                    <Input
                      id="media-name"
                      value={selectedMedia.name}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="media-type">Type</Label>
                    <Input
                      id="media-type"
                      value={selectedMedia.type}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="media-size">Size</Label>
                    <Input
                      id="media-size"
                      value={formatBytes(selectedMedia.size)}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="media-date">Uploaded</Label>
                    <Input
                      id="media-date"
                      value={formatDate(selectedMedia.uploadedAt)}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="media-url">URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="media-url"
                        value={selectedMedia.url}
                        readOnly
                        className="bg-muted"
                      />
                      <Button 
                        size="icon" 
                        variant="outline"
                        onClick={() => copyToClipboard(selectedMedia.url)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => window.open(selectedMedia.url, "_blank")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    deleteMedia(selectedMedia.id);
                    setSelectedMedia(null);
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
