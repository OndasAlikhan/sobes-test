import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, List } from "antd";
import { RoleType } from "../store/roles.store";

type RoleItemProps = {
  item: RoleType;
};

export const RoleItem = ({ item }: RoleItemProps) => {
  return (
    <List.Item>
      <List.Item.Meta title={item.name} description={item.description} />
      <Button shape="circle" icon={<EditOutlined />} />
      <Button shape="circle" icon={<DeleteOutlined />} className="ml-1" />
    </List.Item>
  );
};
