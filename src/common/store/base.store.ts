import { types } from "mobx-state-tree";

export const BaseModel = types.model("Base", {
  id: types.string,
  createdAt: types.string,
  updatedAt: types.string,
});
