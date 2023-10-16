import { FilialModel } from "@/modules/filials/store/filials.store";
import { RoleModel } from "@/modules/roles/store/roles.store";
import { Instance, types } from "mobx-state-tree";

export type MeModelType = Instance<typeof MeModel>;

export const MeModel = types.model("MeModel", {
  id: types.string,
  createdAt: types.string,
  updatedAt: types.string,
  name: types.string,
  username: types.string,
  roleId: types.string,
  role: RoleModel,
  filialIds: types.array(types.string),
  filials: types.array(FilialModel),
});

export const AuthDataModel = types
  .model("AuthData", {
    me: types.maybeNull(MeModel),
  })
  .actions((authData) => ({
    setMe(me: MeModelType | null) {
      authData.me = me;
    },
  }))
  .views((self) => ({
    get getMyPermissions() {
      return self.me?.role?.permissions || [];
    },
    checkPermission(permissionKey: string) {
      if (!self.me?.role?.permissions) return false;

      return self.me?.role?.permissions.includes(permissionKey);
    },
  }));
