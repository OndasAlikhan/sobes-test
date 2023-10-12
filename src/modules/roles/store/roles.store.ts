import { Instance, types } from "mobx-state-tree";

export type RoleType = Instance<typeof Role>;
export type RolesDataType = Instance<typeof RolesData>;
export type RolesType = Instance<typeof Roles>;

const Role = types.model({
  id: types.string,
  createdAt: types.string,
  updatedAt: types.string,
  name: types.string,
  description: types.string,
  permissions: types.array(types.string),
});

const RolesData = types.model({
  limit: types.number,
  page: types.number,
  totalDocs: types.number,
  totalPages: types.number,
  docs: types.array(Role),
});

export const Roles = types
  .model({
    data: RolesData,
  })
  .actions((self) => ({
    setRoles(rolesData: RolesDataType) {
      self.data = rolesData;
    },
  }));
