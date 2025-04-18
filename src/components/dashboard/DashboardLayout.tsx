
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#f6f9fc]">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
