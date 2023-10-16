import { Navigate } from "react-router-dom";
import { rootStore } from "../store/root.store";
import toast from "react-hot-toast";

export const RouteProtected = ({ children, permissionKey }: any) => {
  if (!rootStore.authData.me) {
    return <Navigate to="/" replace />;
  }
  const permitted =
    rootStore.authData.me.role.permissions.includes(permissionKey);

  if (!permitted) {
    toast.error("You don't have right access");
    return <Navigate to="/" replace />;
  }
  return children;
};
