import { OrganizationModel } from "@/modules/organizations/store/organizations.store";
import { types } from "mobx-state-tree";

export const FilialModel = types.model("FilialModel", {
  id: types.string,
  createdAt: types.string,
  updatedAt: types.string,
  name: types.string,
  organizationId: types.string,
  organization: OrganizationModel,
});
