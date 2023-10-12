import AuthRepository, { LoginResponse } from "../repositories/auth.repository";
import { saveDataToLocalStorage } from "../../../common/utils/authUtils";
import { authDataStore } from "../store/auth.store";
import { AxiosResponse } from "axios";
export type LoginServiceParams = {
  username: string;
  password: string;
};
type LoginReturn = {
  result: AxiosResponse<LoginResponse> | null;
  err: Error | null;
};
export default {
  async login(params: LoginServiceParams): Promise<LoginReturn> {
    try {
      const result = await AuthRepository.login(params);
      saveDataToLocalStorage(result.data);
      authDataStore.setIsAuthorized(true);
      return { result, err: null };
    } catch (err) {
      console.log("auth.service login() error");
      return { result: null, err: err as Error };
    }
  },
};
