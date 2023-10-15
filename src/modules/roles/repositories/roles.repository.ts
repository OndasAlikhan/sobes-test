import { AxiosResponse } from "axios";
import { httpClient } from "../../../common/utils/httpClient";
import { RoleModelType, RolesDataModelType } from "../store/roles.store";

export type RoleResponse = RoleModelType;
export type RolesResponse = RolesDataModelType;
export type FetchRolesParams = BasePaginationParams;
export type PostRoleParams = {
  name: string;
  description: string;
  permissions: string[];
};
export type PutRoleParams = PostRoleParams & {
  id: string;
};
export type DeleteRoleParams = {
  id: string;
};

const PATHS = {
  ROLES: "/api/admin-api/roles",
};

export default {
  fetchRoles(params: FetchRolesParams): Promise<AxiosResponse<RolesResponse>> {
    return httpClient.get(PATHS.ROLES, { params });
  },
  postRole(params: PostRoleParams): Promise<AxiosResponse<RoleResponse>> {
    return httpClient.post(PATHS.ROLES, params);
  },
  putRole(params: PutRoleParams): Promise<AxiosResponse<RoleResponse>> {
    return httpClient.put(`${PATHS.ROLES}/${params.id}`, params);
  },
  deleteRole(params: DeleteRoleParams): Promise<AxiosResponse<null>> {
    return httpClient.delete(`${PATHS.ROLES}/${params.id}`);
  },
};
