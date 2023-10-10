import { types } from "mobx-state-tree";

const AuthData = types
  .model("AuthData", {
    accessToken: "",
  })
  .actions((authData) => ({
    setAccessToken(token: string) {
      authData.accessToken = token;
    },
    removeAccessToken() {
      authData.accessToken = "";
    },
  }))
  .views((self) => ({
    get isAuthorized() {
      return !!self.accessToken;
    },
  }));

export const authDataStore = AuthData.create();
