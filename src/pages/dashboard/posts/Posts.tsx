
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PostsTable from "@/components/posts/PostsTable";
import { Plus } from "lucide-react";

export default function Posts() {
  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Posts" 
        description="Create and manage your blog posts." 
        action={{
          label: "Add Post",
          icon: <Plus className="h-4 w-4 mr-2" />,
          href: "/dashboard/posts/new"
        }}
      />
      <PostsTable />
    </div>
  );
}
