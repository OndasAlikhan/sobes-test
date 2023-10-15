import { IAnyModelType, types } from "mobx-state-tree";

export const BaseListModel = <T extends IAnyModelType>(model: T) =>
  types.model("BaseListModel", {
    docs: types.array(model),
    totalDocs: 0,
    totalPages: 0,
    limit: 10,
    page: 0,
    loading: true,
  });
