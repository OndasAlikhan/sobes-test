import RolesService from "../services/roles.service";

export const rolesPageLoader = async () => {
  return await RolesService.fetchRoles();
};
