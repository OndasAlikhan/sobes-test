import { AxiosResponse } from "axios";
import { httpClient } from "../../../common/utils/httpClient";
import { RolesDataType } from "../store/roles.store";

export type RolesResponse = RolesDataType;

const PATHS = {
  ROLES: "/api/admin-api/roles",
};

export default {
  fetchRoles(): Promise<AxiosResponse<RolesResponse>> {
    const url = PATHS.ROLES;
    return httpClient.get(url);
  },
};
