import { Instance, types } from "mobx-state-tree";

export type RoleModelType = Instance<typeof RoleModel>;
export type RolesDataModelType = Instance<typeof RolesDataModel>;
export type RolesModelType = Instance<typeof RolesModel>;

export const RoleModel = types.model("RoleModel", {
  id: types.string,
  createdAt: types.string,
  updatedAt: types.string,
  name: types.string,
  description: types.string,
  permissions: types.array(types.string),
});

const RolesDataModel = types.model("RolesDataModel", {
  limit: types.number,
  page: types.number,
  totalDocs: types.number,
  totalPages: types.number,
  docs: types.array(RoleModel),
});

export const RolesModel = types
  .model("RolesModel", {
    data: RolesDataModel,
  })
  .actions((self) => ({
    setRoles(rolesData: RolesDataModelType) {
      self.data = rolesData;
    },
  }))
  .views((self) => ({
    get getRoles() {
      return self.data;
    },
  }));
