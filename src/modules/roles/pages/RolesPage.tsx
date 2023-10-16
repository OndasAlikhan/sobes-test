import { observer } from "mobx-react-lite";
import { CreateModalButton } from "../components/CreateRoleButton";
import { useMst } from "@/common/store/root.store";
import { RolesTable } from "../components/RolesTable";
import { RolesPermissions } from "../roles.const";
import { PermissionProtected } from "@/common/components/PermissionProtected";

export const RolesPage = observer(() => {
  const { roles } = useMst();
  const rolesData = roles.data;

  return (
    <div className="p-4">
      <PermissionProtected permissionKey={RolesPermissions.CREATE_ROLE}>
        <div className="flex justify-end mb-3">
          <CreateModalButton />
        </div>
      </PermissionProtected>
      <RolesTable
        data={[...rolesData.docs]}
        limit={rolesData.limit}
        page={rolesData.page}
        totalDocs={rolesData.totalDocs}
      />
    </div>
  );
});
