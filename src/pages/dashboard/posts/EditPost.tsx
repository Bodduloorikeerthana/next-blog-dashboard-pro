
import { useParams } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PostForm from "@/components/posts/PostForm";

// Mock post data
const posts = [
  {
    id: "1",
    title: "Getting Started with React",
    content: "React is a popular JavaScript library for building user interfaces...",
    excerpt: "Learn the basics of React and start building your first components.",
    categoryId: "2",
    status: "published" as const,
    featuredImage: "https://images.unsplash.com/photo-1561736778-92e52a7769ef"
  },
  {
    id: "2",
    title: "Advanced TypeScript Tips",
    content: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript...",
    excerpt: "Take your TypeScript skills to the next level with these advanced tips.",
    categoryId: "3",
    status: "draft" as const,
    featuredImage: null
  },
  {
    id: "3",
    title: "The Future of Web Development",
    content: "The web development landscape is constantly evolving...",
    excerpt: "Explore upcoming trends and technologies in the web development world.",
    categoryId: "1",
    status: "published" as const,
    featuredImage: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2"
  }
];

export default function EditPost() {
  const { id } = useParams<{ id: string }>();
  const post = posts.find(p => p.id === id);
  
  if (!post) {
    return (
      <div className="space-y-6">
        <DashboardHeader 
          title="Post Not Found" 
          description="The post you're looking for doesn't exist." 
        />
        <div className="bg-muted p-6 rounded-md text-center">
          <p>The post with ID {id} could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader 
        title={`Edit Post: ${post.title}`} 
        description="Update your blog post content and settings." 
      />
      <PostForm defaultValues={post} isEditing />
    </div>
  );
}
