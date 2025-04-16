
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Image,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { 
    title: 'Dashboard', 
    icon: LayoutDashboard, 
    path: '/dashboard' 
  },
  { 
    title: 'Posts', 
    icon: FileText, 
    path: '/dashboard/posts' 
  },
  { 
    title: 'Categories', 
    icon: FolderOpen, 
    path: '/dashboard/categories' 
  },
  { 
    title: 'Media', 
    icon: Image, 
    path: '/dashboard/media' 
  },
  { 
    title: 'Settings', 
    icon: Settings, 
    path: '/dashboard/settings' 
  },
];

export default function DashboardSidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "flex h-screen flex-col bg-sidebar text-sidebar-foreground transition-all duration-300",
      isCollapsed ? "w-[70px]" : "w-[250px]"
    )}>
      <div className="flex h-14 items-center px-3 border-b border-sidebar-border">
        {!isCollapsed ? (
          <h1 className="px-2 text-xl font-bold">CMS Admin</h1>
        ) : (
          <span className="px-2 text-xl font-bold">CMS</span>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-auto text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>
      <nav className="space-y-1 px-2 py-5 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center px-2 py-2 rounded-md font-medium transition-colors",
              location.pathname === item.path
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
            {!isCollapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              A
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Admin User</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
