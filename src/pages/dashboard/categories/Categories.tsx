
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CategoriesTable from "@/components/categories/CategoriesTable";
import { Plus } from "lucide-react";

export default function Categories() {
  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Categories" 
        description="Create and manage your blog categories." 
        action={{
          label: "Add Category",
          icon: <Plus className="h-4 w-4 mr-2" />,
          href: "/dashboard/categories/new"
        }}
      />
      <CategoriesTable />
    </div>
  );
}
