import { createBrowserRouter, redirect } from "react-router-dom";
import { LoginPage } from "@/modules/login/pages/LoginPage";

import { Layout } from "@/common/layouts/Layout";
import { MainPage } from "./modules/main/pages/MainPage";
import { MainLayout } from "./common/layouts/MainLayout";
import { ErrorBoundary } from "./common/pages/ErrorBoundary";
import { RolesPage } from "./modules/roles/pages/RolesPage";
import { AdminUsersPage } from "./modules/admin-users/pages/AdminUsersPage";
import { rolesPageLoader } from "./modules/roles/pages/rolesPageLoader";
import AuthService from "./modules/login/services/auth.service";
import { clearLocalStorage } from "./common/utils/authUtils";
import PermissionsService from "./modules/permissions/services/permissions.service";
import { RouteProtected } from "./common/components/RouteProtected";
import { RolesPermissions } from "./modules/roles/roles.const";
import { AdminUsersPermissions } from "./modules/admin-users/admin-users.const";

const authorizationPages = ["/login"];

const PageToPermissionMap: Record<string, string> = {
  RolesPage: RolesPermissions.GET_ROLES,
  AdminUsersPage: AdminUsersPermissions.GET_ADMIN_USERS,
};

const authorizationGuard = async (request: Request) => {
  const url = new URL(request.url);
  const token = localStorage.getItem("access_token");

  // login page
  if (authorizationPages.includes(url.pathname)) {
    // don't have token - do nothing
    if (!token) return null;

    /**
     * if fails with unauthorized automatically:
     * clears storage and redirects to "/login".
     * See httpClient.ts goToAuth()
     */
    const { err } = await AuthService.me();

    // some problem - clear storage and do nothing
    if (err) {
      clearLocalStorage();
      return null;
    }

    // we have a token and it's valid - redirect to "/"
    return redirect("/");
  }

  // private page
  if (!authorizationPages.includes(url.pathname)) {
    // don't have token - go to /login
    if (!token) redirect("/login");

    /**
     * if fails with unauthorized automatically:
     * clears storage and redirects to "/login".
     * See httpClient.ts goToAuth()
     */
    const { err } = await AuthService.me();

    // some problem - clear storage and go to "/login"
    if (err) {
      clearLocalStorage();
      return redirect("/login");
    }

    // fetch dictionaries
    await PermissionsService.fetchPermissions();

    // we have a token and it's valid - do nothing
    return null;
  }
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: async ({ request }) => {
      return await authorizationGuard(request);
    },
    errorElement: <ErrorBoundary />,
    children: [
      {
        // index: true,
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          {
            path: "/roles",
            loader: rolesPageLoader,
            element: (
              <RouteProtected permissionKey={PageToPermissionMap.RolesPage}>
                <RolesPage />
              </RouteProtected>
            ),
          },
          {
            path: "/admin-users",
            element: <AdminUsersPage />,
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
]);
