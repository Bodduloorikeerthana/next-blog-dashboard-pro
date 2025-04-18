
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
  X,
  Globe
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
      "flex h-screen flex-col bg-white border-r border-gray-200 transition-all duration-300",
      isCollapsed ? "w-[70px]" : "w-[250px]"
    )}>
      <div className="flex h-16 items-center px-4 border-b border-gray-100">
        {!isCollapsed ? (
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Your CMS
          </span>
        ) : (
          <Globe className="h-6 w-6 text-blue-600" />
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-auto hover:bg-gray-100"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
      </div>
      
      <nav className="flex-1 space-y-1 px-3 py-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
              location.pathname === item.path
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            )}
          >
            <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
            {!isCollapsed && <span>{item.title}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-medium">
              A
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
