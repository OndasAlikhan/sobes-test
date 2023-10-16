import { Instance, types, cast } from "mobx-state-tree";

export const PermissionModel = types.model("PermissionsModel", {
  name: types.string,
  code: types.string,
});

// Permissions dictionary
export const PermissionsModel = types
  .model("PermissionModel", {
    permissions: types.array(PermissionModel),
    permissionsMap: types.map(PermissionModel),
  })
  .actions((self) => ({
    setPermissions(permissions: PermissionModelType[]) {
      self.permissions = cast(permissions);

      self.permissionsMap.clear();
      for (const item of permissions) {
        self.permissionsMap.set(item.code, item);
      }
    },
  }));

export type PermissionModelType = Instance<typeof PermissionModel>;
export type PermissionsModelType = Instance<typeof PermissionsModel>;
