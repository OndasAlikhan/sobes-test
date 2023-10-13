import { Card, Typography } from "antd";
import { InfoCircleFilled } from "@ant-design/icons";

export const MainPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <Card>
        <Typography.Title className="m-5" level={5}>
          <span className="mr-2">Please choose a module in sidebar</span>
          <InfoCircleFilled />
        </Typography.Title>
      </Card>
    </div>
  );
};
