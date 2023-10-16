import AuthRepository, { LoginResponse } from "../repositories/auth.repository";
import {
  clearLocalStorage,
  saveDataToLocalStorage,
} from "../../../common/utils/authUtils";

import { AxiosError, AxiosResponse } from "axios";
import { rootStore } from "@/common/store/root.store";
import PermissionsService from "@/modules/permissions/services/permissions.service";

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
      await this.me();
      await PermissionsService.fetchPermissions();
      return { result, err: null };
    } catch (err) {
      console.error("auth.service login() error");
      const error = err as AxiosError<ErrorData>;
      return {
        result: null,
        err: error.response?.data.message || ["Unknown error"],
      };
    }
  },
  logout() {
    try {
      rootStore.authData.setMe(null);
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
        err: error.response?.data.message || ["Unknown error"],
      };
    }
  },
};
