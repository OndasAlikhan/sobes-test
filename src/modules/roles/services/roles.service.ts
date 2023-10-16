import RolesRepository, {
  FetchRolesParams,
  RolesResponse,
  PostRoleParams,
  RoleResponse,
  PutRoleParams,
  DeleteRoleParams,
} from "../repositories/roles.repository";
import { rootStore } from "@/common/store/root.store";
import { RolesDataModelType } from "../store/roles.store";
import { AxiosError } from "axios";

export default {
  async fetchRoles(
    params: FetchRolesParams = {},
  ): Promise<ResultWrapper<RolesResponse>> {
    try {
      const result = await RolesRepository.fetchRoles({
        page: 1,
        limit: 10,
        ...params,
      });
      rootStore.roles.setRoles(result.data as RolesDataModelType);
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
  async postRole(params: PostRoleParams): Promise<ResultWrapper<RoleResponse>> {
    try {
      const result = await RolesRepository.postRole(params);

      const fetchParams = {
        page: rootStore.roles.data.page,
      };
      await this.fetchRoles(fetchParams);

      return { result: result.data, err: null };
    } catch (err) {
      console.error("roles.service postRole() error", err);
      const error = err as AxiosError<ErrorData>;
      return {
        result: null,
        err: error.response?.data.message || ["Unknown error"],
      };
    }
  },
  async putRole(params: PutRoleParams): Promise<ResultWrapper<RoleResponse>> {
    try {
      const result = await RolesRepository.putRole(params);

      const fetchParams = {
        page: rootStore.roles.data.page,
      };
      await this.fetchRoles(fetchParams);

      return { result: result.data, err: null };
    } catch (err) {
      console.error("roles.service postRole() error", err);
      const error = err as AxiosError<ErrorData>;
      return {
        result: null,
        err: error.response?.data.message || ["Unknown error"],
      };
    }
  },
  async deleteRole(params: DeleteRoleParams) {
    try {
      const result = await RolesRepository.deleteRole(params);

      const fetchParams = {
        page: rootStore.roles.data.page,
      };
      await this.fetchRoles(fetchParams);

      return { result: result.data, err: null };
    } catch (err) {
      console.error("roles.service postRole() error", err);
      const error = err as AxiosError<ErrorData>;
      return {
        result: null,
        err: error.response?.data.message || ["Unknown error"],
      };
    }
  },
};
