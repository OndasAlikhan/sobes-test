import { AuthDataModel } from "@/modules/login/store/auth.store";
import { RolesModel } from "@/modules/roles/store/roles.store";
import { PermissionsModel } from "@/modules/permissions/store/permissions.store";
import { Instance, types } from "mobx-state-tree";
import { createContext, useContext } from "react";

const GlobalLoaderModel = types
  .model("GlobalLoaderModel", {
    loading: false,
  })
  .actions((self) => ({
    setGlobalLoader(loading: boolean) {
      self.loading = loading;
    },
  }));

const RootModel = types.model("Root", {
  roles: RolesModel,
  authData: AuthDataModel,
  globalLoader: GlobalLoaderModel,
  permissions: PermissionsModel,
});

export const rootStore = RootModel.create({
  roles: {
    data: {
      limit: 0,
      page: 0,
      totalDocs: 0,
      totalPages: 0,
      docs: [],
    },
  },
  authData: {
    me: null,
  },
  globalLoader: {
    loading: false,
  },
  permissions: {
    permissions: [],
    permissionsMap: {},
  },
});

export const RootStoreContext = createContext<RootModelType>(
  {} as RootModelType,
);

export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error("Store cannot be null, please add a context provider");
  }
  return store;
}
export const Provider = RootStoreContext.Provider;
export type RootModelType = Instance<typeof RootModel>;
