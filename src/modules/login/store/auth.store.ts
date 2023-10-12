import { types } from "mobx-state-tree";

const AuthData = types
  .model("AuthData", {
    isAuthorized: false,
  })
  .actions((authData) => ({
    setIsAuthorized(isAuthorized: boolean) {
      authData.isAuthorized = isAuthorized;
    },
  }))
  .views((self) => ({
    get isAuthorizedGetter() {
      return self.isAuthorized;
    },
  }));

export const authDataStore = AuthData.create();
