import { rootStore } from "@/common/store/root.store";
import RolesService from "../services/roles.service";

export const rolesPageLoader = async () => {
  rootStore.globalLoader.setGlobalLoader(true);

  try {
    return await RolesService.fetchRoles();
  } finally {
    rootStore.globalLoader.setGlobalLoader(false);
  }
};
