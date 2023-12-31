import { Button, Table, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import { RoleModelType } from "../store/roles.store";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { RoleFormModal } from "./RoleFormModal";
import { useState } from "react";
import RolesService from "../services/roles.service";
import toast from "react-hot-toast";
import { useMst } from "@/common/store/root.store";
import { observer } from "mobx-react-lite";
import { RolesPermissions } from "../roles.const";
import { PermissionProtected } from "@/common/components/PermissionProtected";

type Props = {
  data: RoleModelType[];
  limit: number;
  page: number;
  totalDocs: number;
};

const { confirm } = Modal;

export const RolesTable = observer(
  ({ data, limit, page, totalDocs }: Props) => {
    const store = useMst();
    const { permissions: permissionsStore } = store;
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editModalData, setEditModalData] = useState<RoleModelType | null>(
      null,
    );

    const onEditClick = (data: RoleModelType) => {
      setEditModalOpen(true);
      setEditModalData(data);
    };

    const onDeleteClick = (data: RoleModelType) => {
      confirm({
        title: `Confirm deletion of ${data.name}`,
        icon: <ExclamationCircleFilled />,
        content: "Actions are irreversible",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        async onOk() {
          await RolesService.deleteRole({ id: data.id });
          toast.success("Succesfully deleted");
        },
        onCancel() {},
      });
    };

    const handlePageChange = (page: number) => {
      RolesService.fetchRoles({ page });
    };

    const onModalClose = () => {
      setEditModalOpen(false);
      setEditModalData(null);
    };

    const columns: ColumnsType<RoleModelType> = [
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
              <span key={item}>
                - {permissionsStore.permissionsMap.get(item)?.name}
              </span>
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
            <PermissionProtected permissionKey={RolesPermissions.UPDATE_ROLE}>
              <Button
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => onEditClick(item)}
              />
            </PermissionProtected>
            <PermissionProtected permissionKey={RolesPermissions.DELETE_ROLE}>
              <Button
                shape="circle"
                icon={<DeleteOutlined />}
                className="ml-1"
                onClick={() => onDeleteClick(item)}
              />
            </PermissionProtected>
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
          pagination={{
            pageSize: limit,
            current: page,
            total: totalDocs,
            onChange: handlePageChange,
          }}
        />
        <RoleFormModal
          open={editModalOpen}
          editMode={true}
          editData={editModalData}
          onModalClose={onModalClose}
        />
      </>
    );
  },
);
