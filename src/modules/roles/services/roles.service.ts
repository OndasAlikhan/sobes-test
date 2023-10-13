import RolesRepository, {
  RolesResponse,
  PostRoleParams,
  RoleResponse,
  PutRoleParams,
  DeleteRoleParams,
} from "../repositories/roles.repository";
import { rootStore } from "@/common/store/root.store";
import { RolesDataModelType } from "../store/roles.store";

export default {
  async fetchRoles(): Promise<ResultWrapper<RolesResponse>> {
    try {
      const result = await RolesRepository.fetchRoles({ limit: 100 });
      rootStore.roles.setRoles(result.data as RolesDataModelType);
      return { result: result.data, err: null };
    } catch (err) {
      console.log("roles.service fetchRoles() error", err);
      return { result: null, err: err as Error };
    }
  },
  async postRole(params: PostRoleParams): Promise<ResultWrapper<RoleResponse>> {
    try {
      const result = await RolesRepository.postRole(params);
      await this.fetchRoles();
      return { result: result.data, err: null };
    } catch (err) {
      console.log("roles.service postRole() error", err);
      return { result: null, err: err as Error };
    }
  },
  async putRole(params: PutRoleParams): Promise<ResultWrapper<RoleResponse>> {
    try {
      const result = await RolesRepository.putRole(params);
      await this.fetchRoles();
      return { result: result.data, err: null };
    } catch (err) {
      console.log("roles.service postRole() error", err);
      return { result: null, err: err as Error };
    }
  },
  async deleteRole(params: DeleteRoleParams) {
    try {
      const result = await RolesRepository.deleteRole(params);
      await this.fetchRoles();
      return { result: result.data, err: null };
    } catch (err) {
      console.log("roles.service postRole() error", err);
      return { result: null, err: err as Error };
    }
  },
};
