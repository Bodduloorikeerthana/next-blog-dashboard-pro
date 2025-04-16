
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/sonner";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("General settings saved successfully");
  };

  const handleSaveAppearance = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Appearance settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Settings" 
        description="Manage your blog settings and preferences." 
      />
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <form onSubmit={handleSaveGeneral}>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure the basic settings for your blog
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="site-title">Site Title</Label>
                  <Input 
                    id="site-title" 
                    defaultValue="My Amazing Blog" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Textarea 
                    id="site-description" 
                    defaultValue="A blog about technology, development, and design" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-url">Site URL</Label>
                  <Input 
                    id="site-url" 
                    defaultValue="https://myblog.com" 
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input 
                    id="admin-email" 
                    type="email"
                    defaultValue="admin@example.com" 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="comments-enabled">Enable Comments</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow visitors to comment on your posts
                    </p>
                  </div>
                  <Switch id="comments-enabled" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="moderate-comments">Moderate Comments</Label>
                    <p className="text-sm text-muted-foreground">
                      Require approval before comments are published
                    </p>
                  </div>
                  <Switch id="moderate-comments" defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <form onSubmit={handleSaveAppearance}>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize how your blog looks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border p-4 rounded-md cursor-pointer relative flex items-center justify-center aspect-video bg-white">
                      <span className="text-sm font-medium">Light</span>
                      <div className="absolute inset-0 border-2 border-primary rounded-md opacity-100" />
                    </div>
                    <div className="border p-4 rounded-md cursor-pointer relative flex items-center justify-center aspect-video bg-gray-900 text-white">
                      <span className="text-sm font-medium">Dark</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <div className="grid grid-cols-4 gap-4">
                    {["#3B82F6", "#10B981", "#F59E0B", "#EF4444"].map((color) => (
                      <div 
                        key={color}
                        className="border rounded-md cursor-pointer relative flex items-center justify-center aspect-square"
                        style={{ backgroundColor: color }}
                      >
                        {color === "#3B82F6" && (
                          <div className="absolute inset-0 border-2 border-white rounded-md opacity-100" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="posts-per-page">Posts Per Page</Label>
                  <Input 
                    id="posts-per-page" 
                    type="number"
                    defaultValue="10" 
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-author">Show Author</Label>
                    <p className="text-sm text-muted-foreground">
                      Display the author's name on posts
                    </p>
                  </div>
                  <Switch id="show-author" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show-date">Show Date</Label>
                    <p className="text-sm text-muted-foreground">
                      Display the published date on posts
                    </p>
                  </div>
                  <Switch id="show-date" defaultChecked />
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
