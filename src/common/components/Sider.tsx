import { Button, Typography } from "antd";
import { Link } from "react-router-dom";

export const Sider = () => {
  const linkList = [
    {
      path: "/roles",
      label: "Roles",
    },
    {
      path: "/admin-users",
      label: "Admin Users",
    },
  ];

  return (
    <>
      <div className="h-[64px] flex justify-center items-center">
        <Link to="/" className="text-white text-2xl">
          Lombard
        </Link>
      </div>
      <div className="flex flex-col p-8 text-white">
        {linkList.map((item) => (
          <Link to={item.path} key={item.label}>
            <Button type="link" className="text-white">
              {item.label}
            </Button>
          </Link>
        ))}
      </div>
    </>
  );
};
