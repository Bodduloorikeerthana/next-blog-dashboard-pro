
import { Button } from "@/components/ui/button";
import { Bell, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface DashboardHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    icon?: React.ReactNode;
    href: string;
  };
}

export default function DashboardHeader({ 
  title, 
  description, 
  action 
}: DashboardHeaderProps) {
  const location = useLocation();
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 border-b">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="flex items-center mt-4 sm:mt-0">
        <Button variant="outline" size="icon" className="mr-2">
          <Bell className="h-4 w-4" />
        </Button>
        {action && (
          <Button asChild>
            <Link to={action.href}>
              {action.icon || <Plus className="h-4 w-4 mr-2" />}
              {action.label}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
