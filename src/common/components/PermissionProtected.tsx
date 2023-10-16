import { PropsWithChildren } from "react";
import { useMst } from "../store/root.store";

type Props = {
  permissionKey: string;
} & PropsWithChildren;

export const PermissionProtected = ({ children, permissionKey }: Props) => {
  const store = useMst();

  if (store.authData.checkPermission(permissionKey)) return children;
  return null;
};
