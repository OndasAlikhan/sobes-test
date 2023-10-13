import { createBrowserRouter, redirect } from "react-router-dom";
import { LoginPage } from "@/modules/login/pages/LoginPage";

import { Layout } from "@/common/layouts/Layout";
import { MainPage } from "./modules/main/pages/MainPage";
import { MainLayout } from "./common/layouts/MainLayout";
import { ErrorBoundary } from "./common/pages/ErrorBoundary";
import { RolesPage } from "./modules/roles/pages/RolesPage";
import { AdminUsersPage } from "./modules/admin-users/pages/AdminUsersPage";
import { rolesPageLoader } from "./modules/roles/pages/rolesPageLoader";
import { rootStore } from "./common/store/root.store";
import AuthService from "./modules/login/services/auth.service";

const authorizationPages = ["/login"];

const routeToPermissionMap: Record<string, string> = {
  "/roles": "GET_ROLES",
  "/admin-users": "GET_ADMIN_USER",
};

const checkIsAuthorizedStore = () => {
  if (
    !rootStore.authData.isAuthorized &&
    localStorage.getItem("access_token")
  ) {
    rootStore.authData.setIsAuthorized(true);
  }
};

const checkMe = async () => {
  if (!rootStore.authData.me) await AuthService.me();
};

const checkPermission = async (request: Request) => {
  const url = new URL(request.url);

  if (rootStore.authData.me && url.pathname !== "/") {
    const permitted = rootStore.authData.me.role.permissions.includes(
      routeToPermissionMap[url.pathname],
    );
    return permitted ? null : redirect("/");
  }
};

// executes at every route
const authorizationGuard = async (request: Request) => {
  const url = new URL(request.url);

  // authorization pages
  if (authorizationPages.includes(url.pathname)) {
    if (rootStore.authData.isAuthorized) {
      return redirect("/");
    }
    return null;
  }

  // other pages
  // if not authorized redirect to login
  if (!rootStore.authData.isAuthorized) {
    return redirect("/login");
  }
  // if authorized do nothing
  return null;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: async ({ request }) => {
      checkIsAuthorizedStore();
      await checkMe();
      const checkPermissionResult = await checkPermission(request);
      if (checkPermissionResult) return checkPermissionResult;
      return authorizationGuard(request);
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
            element: <RolesPage />,
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
