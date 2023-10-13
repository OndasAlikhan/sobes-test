import { Button } from "antd";
import { useMst } from "../store/root.store";
import AuthService from "@/modules/login/services/auth.service";

export const Header = () => {
  const onLogout = () => {
    AuthService.logout();
  };
  return (
    <div className="flex justify-end items-center h-full text-white">
      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
};
