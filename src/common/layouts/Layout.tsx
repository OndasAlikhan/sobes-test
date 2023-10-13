import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export const Layout = () => {
  return (
    <div>
      <Outlet />
      <Toaster position="top-right" />
    </div>
  );
};
