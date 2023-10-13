import AuthRepository, { LoginResponse } from "../repositories/auth.repository";
import {
  clearLocalStorage,
  saveDataToLocalStorage,
} from "../../../common/utils/authUtils";

import { AxiosError, AxiosResponse } from "axios";
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
      const error = err as AxiosError<ErrorData>;
      return {
        result: null,
        err: error.response?.data.message || ["Unkown error"],
      };
    }
  },
  logout() {
    try {
      rootStore.authData.setIsAuthorized(false);
      clearLocalStorage();
      window.location.href = "/login";
    } catch (err) {
      return { result: null, err };
    }
  },
  async me() {
    try {
      const result = await AuthRepository.me();
      rootStore.authData.setMe(result.data);
      return { result, err: null };
    } catch (err) {
      const error = err as AxiosError<ErrorData>;
      return {
        result: null,
        err: error.response?.data.message || ["Unkown error"],
      };
    }
  },
};
