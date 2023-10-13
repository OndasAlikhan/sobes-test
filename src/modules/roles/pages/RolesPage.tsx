import { observer } from "mobx-react-lite";
import { CreateModalButton } from "../components/CreateRoleButton";
import { useMst } from "@/common/store/root.store";
import { RolesTable } from "../components/RolesTable";

export const RolesPage = observer(() => {
  const { roles } = useMst();

  return (
    <div className="p-4">
      <div className="flex justify-end mb-3">
        <CreateModalButton />
      </div>
      <RolesTable data={[...roles.getRoles.docs]} />
    </div>
  );
});
