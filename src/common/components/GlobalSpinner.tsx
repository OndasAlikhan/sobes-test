import { Loading3QuartersOutlined } from "@ant-design/icons";

export const GlobalSpinner = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Loading3QuartersOutlined spin={true} style={{ fontSize: 80 }} />
    </div>
  );
};
