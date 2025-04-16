
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PostForm from "@/components/posts/PostForm";

export default function NewPost() {
  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Create New Post" 
        description="Add a new post to your blog." 
      />
      <PostForm />
    </div>
  );
}
