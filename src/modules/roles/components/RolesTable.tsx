import { Button, Table, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import { RoleType } from "../store/roles.store";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { RoleFormModal } from "./RoleFormModal";
import { useState } from "react";
import RolesService from "../services/roles.service";

type Props = {
  data: RoleType[];
};

const { confirm } = Modal;

export const RolesTable = ({ data }: Props) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState<RoleType | null>(null);

  const onEditClick = (data: RoleType) => {
    setEditModalOpen(true);
    setEditModalData(data);
  };

  const onDeleteClick = (data: RoleType) => {
    confirm({
      title: `Confirm deletion of ${data.name}`,
      icon: <ExclamationCircleFilled />,
      content: "Actions are irreversible",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        await RolesService.deleteRole({ id: data.id });
        console.log("toast: OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const onModalClose = () => {
    setEditModalOpen(false);
    setEditModalData(null);
  };

  const columns: ColumnsType<RoleType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Permissions",
      dataIndex: "permissions",
      key: "permissions",
      render: (permissions: string[]) => (
        <div className="flex flex-col max-h-[100px] overflow-scroll">
          {permissions.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, item) => (
        <>
          <Button
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => onEditClick(item)}
          />
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            className="ml-1"
            onClick={() => onDeleteClick(item)}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        scroll={{ x: 200, y: window.innerHeight - 300 }}
        columns={columns}
        dataSource={data}
        rowKey="id"
      />
      <RoleFormModal
        open={editModalOpen}
        editMode={true}
        editData={editModalData}
        onModalClose={onModalClose}
      />
    </>
  );
};
