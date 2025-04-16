
import { useParams } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CategoryForm from "@/components/categories/CategoryForm";

// Mock category data
const categories = [
  {
    id: "1",
    name: "Technology",
    slug: "technology",
    description: "Latest technology news and insights",
  },
  {
    id: "2",
    name: "Development",
    slug: "development",
    description: "Software development tips and tricks",
  },
  {
    id: "3",
    name: "Programming",
    slug: "programming",
    description: "Coding tutorials and guides",
  },
  {
    id: "4",
    name: "Design",
    slug: "design",
    description: "UI/UX design inspiration",
  },
];

export default function EditCategory() {
  const { id } = useParams<{ id: string }>();
  const category = categories.find(c => c.id === id);
  
  if (!category) {
    return (
      <div className="space-y-6">
        <DashboardHeader 
          title="Category Not Found" 
          description="The category you're looking for doesn't exist." 
        />
        <div className="bg-muted p-6 rounded-md text-center">
          <p>The category with ID {id} could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardHeader 
        title={`Edit Category: ${category.name}`} 
        description="Update your category details." 
      />
      <CategoryForm defaultValues={category} isEditing />
    </div>
  );
}
