import { Layout as AntdLayout } from "antd";
import { Outlet } from "react-router-dom";
import { Sider } from "../components/Sider";
import { Header } from "../components/Header";

export const MainLayout = () => {
  return (
    <AntdLayout className="min-h-[100vh]">
      <AntdLayout.Sider>
        <Sider />
      </AntdLayout.Sider>
      <AntdLayout>
        <AntdLayout.Header>
          <Header />
        </AntdLayout.Header>
        <AntdLayout.Content>
          <Outlet />
        </AntdLayout.Content>
        {/* <AntdLayout.Footer>Footer</AntdLayout.Footer> */}
      </AntdLayout>
    </AntdLayout>
  );
};
