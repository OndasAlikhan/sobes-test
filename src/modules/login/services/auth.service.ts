import AuthRepository, { LoginResponse } from "../repositories/auth.repository";
import {
  clearLocalStorage,
  saveDataToLocalStorage,
} from "../../../common/utils/authUtils";

import { AxiosResponse } from "axios";
import { rootStore } from "@/common/store/root.store";

export type LoginServiceParams = {
  username: string;
  password: string;
};

export default {
  async login(
    params: LoginServiceParams,
  ): Promise<ResultWrapper<AxiosResponse<LoginResponse>>> {
    try {
      const result = await AuthRepository.login(params);
      saveDataToLocalStorage(result.data);
      rootStore.authData.setIsAuthorized(true);
      return { result, err: null };
    } catch (err) {
      console.log("auth.service login() error");
      return { result: null, err: err as Error };
    }
  },
  logout() {
    try {
      rootStore.authData.setIsAuthorized(false);
      clearLocalStorage();
      window.location.href = "/login";
    } catch (err) {
      return { result: null, err: err as Error };
    }
  },
  async me() {
    try {
      console.log("calling me");
      const result = await AuthRepository.me();
      rootStore.authData.setMe(result.data);
      return { result, err: null };
    } catch (err) {
      return { result: null, err: err as Error };
    }
  },
};
