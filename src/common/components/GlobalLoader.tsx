import { Loading3QuartersOutlined } from "@ant-design/icons";

export const GlobalLoader = () => {
  return (
    <div
      id="globalloader"
      className="flex justify-center items-center h-[100vh] opacity-10 absolute w-full top-0 bg-gray-200"
    >
      <Loading3QuartersOutlined spin={true} style={{ fontSize: 80 }} />
    </div>
  );
};
