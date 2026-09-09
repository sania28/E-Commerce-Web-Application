import { Outlet } from "react-router-dom";
import Navbar from "../user/Navbar";

export default function UserLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
