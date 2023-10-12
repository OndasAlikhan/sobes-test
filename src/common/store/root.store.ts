import { Roles } from "@/modules/roles/store/roles.store";
import { Instance, types } from "mobx-state-tree";

const RootModel = types.model("Root", {
  roles: Roles,
});

const rootStore = RootModel.create({
  roles: {
    data: {
      limit: 0,
      page: 0,
      totalDocs: 0,
      totalPages: 0,
      docs: [],
    },
  },
});

export { rootStore };

export type RootModelType = Instance<typeof RootModel>;
