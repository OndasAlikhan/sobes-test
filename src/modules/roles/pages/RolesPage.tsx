import RolesService from "@/modules/roles/services/roles.service";
import { List } from "antd";
import { RoleItem } from "../components/RoleItem";
import { observer } from "mobx-react-lite";
import { RoleType } from "../store/roles.store";
import { useContext } from "react";
import { StoreContext } from "@/App";

export const rolesPageLoader = async () => {
  return await RolesService.fetchRoles();
};

export const RolesPage = observer(() => {
  const {
    roles: { data: rolesData },
  } = useContext(StoreContext);

  return (
    <div className="p-4">
      <List
        dataSource={rolesData.docs}
        bordered
        renderItem={(item: RoleType) => <RoleItem item={item} />}
      />
    </div>
  );
});
