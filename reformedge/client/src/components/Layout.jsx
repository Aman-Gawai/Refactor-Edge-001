import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-bg text-white">
      <Navbar />
      <main className="mt-20 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
