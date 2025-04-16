
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { 
  FileText, 
  FolderOpen, 
  BarChart, 
  Users, 
  ArrowUp, 
  ArrowDown 
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Dashboard" 
        description="Welcome to your CMS dashboard. Here's an overview of your content." 
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Posts
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              +4 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Categories
            </CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pageviews
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUp className="mr-1 h-3 w-3" />
              <span>18.2% increase</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Comments
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">186</div>
            <div className="flex items-center text-xs text-red-500">
              <ArrowDown className="mr-1 h-3 w-3" />
              <span>4.5% decrease</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>
              Your most recently published and updated content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Getting Started with React",
                  category: "Development",
                  date: "2023-04-18",
                  views: 187
                },
                {
                  title: "Advanced TypeScript Tips",
                  category: "Programming",
                  date: "2023-04-15",
                  views: 143
                },
                {
                  title: "The Future of Web Development",
                  category: "Technology",
                  date: "2023-04-12",
                  views: 256
                },
                {
                  title: "CSS Grid Layout Mastery",
                  category: "Design",
                  date: "2023-04-10",
                  views: 92
                }
              ].map((post, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <h4 className="text-sm font-semibold">{post.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{post.category}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-2">{post.views} views</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>
              Number of posts in each category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Technology", count: 8, percentage: 28 },
                { name: "Development", count: 12, percentage: 42 },
                { name: "Programming", count: 6, percentage: 21 },
                { name: "Design", count: 2, percentage: 9 },
              ].map((category, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm text-muted-foreground">{category.count} posts</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
