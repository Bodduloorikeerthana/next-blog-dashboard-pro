
import { useParams } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import PostForm from "@/components/posts/PostForm";

// Mock post data
const posts = [
  {
    id: "1",
    title: "Getting Started with React",
    content: "# Getting Started with React\n\nReact is a popular JavaScript library for building user interfaces...\n\n## Key Concepts\n\nHere are some important concepts to understand:\n\n### Components\n\nComponents are the building blocks of any React application.",
    excerpt: "Learn the basics of React and start building your first components.",
    categoryId: "2",
    status: "published" as const,
    featuredImage: "https://images.unsplash.com/photo-1561736778-92e52a7769ef",
    slug: "getting-started-with-react",
    seoTitle: "Getting Started with React - Complete Beginner's Guide",
    seoDescription: "Learn the fundamentals of React, the popular JavaScript library for building user interfaces and single-page applications.",
    keywords: "react, javascript, components, jsx, frontend"
  },
  {
    id: "2",
    title: "Advanced TypeScript Tips",
    content: "# Advanced TypeScript Tips\n\nTypeScript is a typed superset of JavaScript that compiles to plain JavaScript...\n\n## Generics\n\nOne of the most powerful features of TypeScript is generics.\n\n### Type Narrowing\n\nType narrowing is a technique that allows TypeScript to determine more specific types.",
    excerpt: "Take your TypeScript skills to the next level with these advanced tips.",
    categoryId: "3",
    status: "draft" as const,
    featuredImage: null,
    slug: "advanced-typescript-tips",
    seoTitle: "Advanced TypeScript Tips for Professional Developers",
    seoDescription: "Discover advanced TypeScript techniques to improve your code quality and developer experience.",
    keywords: "typescript, javascript, type safety, generics, interfaces"
  },
  {
    id: "3",
    title: "The Future of Web Development",
    content: "# The Future of Web Development\n\nThe web development landscape is constantly evolving...\n\n## New Technologies\n\nLet's explore upcoming trends and technologies.\n\n### AI Integration\n\nArtificial intelligence is becoming more integrated with web development.\n\n[Check out more AI tools](https://example.com/ai-tools)",
    excerpt: "Explore upcoming trends and technologies in the web development world.",
    categoryId: "1",
    status: "published" as const,
    featuredImage: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2",
    slug: "future-of-web-development",
    seoTitle: "The Future of Web Development: Trends to Watch",
    seoDescription: "Explore the emerging technologies and methodologies that will shape the future of web development.",
    keywords: "web development, future trends, AI, WebAssembly, JAMstack"
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
