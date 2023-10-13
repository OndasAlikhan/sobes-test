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
        <Link to="/roles">
          <Button type="link" className="text-white">
            Roles
          </Button>
        </Link>

        <Link to="/admin-users">
          <Button type="link" className="text-white">
            Admin Users
          </Button>
        </Link>
      </div>
    </>
  );
};
