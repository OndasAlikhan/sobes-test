import { AxiosResponse } from "axios";
import { httpClient } from "@/common/utils/httpClient";
import { PermissionModelType } from "../store/permissions.store";

export type PermissionsResponse = PermissionModelType[];

const PATHS = {
  GET: "/api/admin-api/permissions",
};

export default {
  fetchPermissions(): Promise<AxiosResponse<PermissionsResponse>> {
    return httpClient.get(PATHS.GET);
  },
};
