import { rootStore } from "@/common/store/root.store";
import RolesService from "../services/roles.service";

export const rolesPageLoader = async () => {
  try {
    rootStore.globalLoader.setGlobalLoader(true);
    return await RolesService.fetchRoles();
  } catch (err) {
    console.error("Error in rolesPage loader", err);
  } finally {
    rootStore.globalLoader.setGlobalLoader(false);
  }
};
