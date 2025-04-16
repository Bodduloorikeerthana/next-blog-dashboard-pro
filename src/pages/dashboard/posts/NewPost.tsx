
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PostForm from "@/components/posts/PostForm";
import { Card } from "@/components/ui/card";

export default function NewPost() {
  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Create New Post" 
        description="Add a new post to your blog with content and SEO optimization." 
      />
      <Card className="bg-white rounded-lg border-0 shadow-sm">
        <PostForm />
      </Card>
    </div>
  );
}
