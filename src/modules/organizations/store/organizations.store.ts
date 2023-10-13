import { types } from "mobx-state-tree";

export const OrganizationModel = types.model("OrganizationModel", {
  id: types.string,
  createdAt: types.string,
  updatedAt: types.string,
  name: types.string,
  smartlombard_login: types.string,
  smartlombard_password: types.string,
});
