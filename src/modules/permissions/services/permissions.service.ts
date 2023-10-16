import { AxiosError } from "axios";
import PermissionsRepository, {
  PermissionsResponse,
} from "../repository/permissions.repository";
import { rootStore } from "@/common/store/root.store";

export default {
  async fetchPermissions(): Promise<ResultWrapper<PermissionsResponse>> {
    try {
      const result = await PermissionsRepository.fetchPermissions();
      rootStore.permissions.setPermissions(result.data);
      return { result: result.data, err: null };
    } catch (err) {
      console.error("roles.service fetchRoles() error", err);
      const error = err as AxiosError<ErrorData>;
      return {
        result: null,
        err: error.response?.data.message || ["Unknown error"],
      };
    }
  },
};
