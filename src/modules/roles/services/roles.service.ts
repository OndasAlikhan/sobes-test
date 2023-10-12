import RolesRepository, {
  RolesResponse,
} from "../repositories/roles.repository";
import { rootStore } from "@/common/store/root.store";
import { RolesDataType } from "../store/roles.store";

export default {
  async fetchRoles(): Promise<ResultWrapper<RolesResponse>> {
    try {
      const result = await RolesRepository.fetchRoles();
      rootStore.roles.setRoles(result.data as RolesDataType);
      return { result: result.data, err: null };
    } catch (err) {
      console.log("roles.service fetchRoles() error", err);
      return { result: null, err: err as Error };
    }
  },
};
