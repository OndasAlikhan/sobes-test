import { AxiosResponse } from "axios";
import { httpClient } from "../../../common/utils/httpClient";
import { MeModelType } from "../store/auth.store";

export type LoginResponse = {
  access_token: string;
  refresh_token: string;
};

const PATHS = {
  LOGIN: "/api/admin-api/auth/login",
  ME: "/api/admin-api/me",
};

export default {
  login(params: {
    username: string;
    password: string;
  }): Promise<AxiosResponse<LoginResponse>> {
    return httpClient.post(PATHS.LOGIN, params);
  },
  me(): Promise<AxiosResponse<MeModelType>> {
    return httpClient.get(PATHS.ME);
  },
};
