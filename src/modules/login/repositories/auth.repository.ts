import { AxiosResponse } from "axios";
import { httpClient } from "../../../common/utils/httpClient";

export type LoginResponse = {
  access: string;
  refresh: string;
};

const PATHS = {
  LOGIN: "/api/admin-api/auth/login",
};

export default {
  login(params: {
    username: string;
    password: string;
  }): Promise<AxiosResponse<LoginResponse>> {
    const url = PATHS.LOGIN;
    return httpClient.post(url, params);
  },
};
