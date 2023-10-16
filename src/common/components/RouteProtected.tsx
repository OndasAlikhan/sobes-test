import { Navigate } from "react-router-dom";
import { rootStore } from "../store/root.store";
import toast from "react-hot-toast";
import { PropsWithChildren } from "react";

type Props = {
  permissionKey: string;
} & PropsWithChildren;

export const RouteProtected = ({ children, permissionKey }: Props) => {
  if (!rootStore.authData.me) {
    return <Navigate to="/" replace />;
  }
  const permitted = rootStore.authData.checkPermission(permissionKey);

  if (!permitted) {
    toast.error("You don't have right access");
    return <Navigate to="/" replace />;
  }
  return children;
};
