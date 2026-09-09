import { Outlet } from "react-router-dom";
import AdminSidebar from "../admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8 ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
