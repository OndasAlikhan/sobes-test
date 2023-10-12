import { Button, Typography } from "antd";
import { Link } from "react-router-dom";

export const Sider = () => {
  return (
    <>
      <div className="h-[64px] flex justify-center items-center">
        <Link to="/" className="text-white text-2xl">
          Lombard
        </Link>
      </div>
      <div className="flex flex-col p-8 text-white">
        <Button type="link" className="text-white">
          <Link to="/roles">Roles</Link>
        </Button>
        <Button type="link" className="text-white">
          <Link to="/admin-users">Admin Users</Link>
        </Button>
      </div>
    </>
  );
};
