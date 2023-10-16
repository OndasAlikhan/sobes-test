import { Navigate, createBrowserRouter, redirect } from "react-router-dom";
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
import { clearLocalStorage } from "./common/utils/authUtils";
import toast from "react-hot-toast";
import PermissionsService from "./modules/permissions/services/permissions.service";

const authorizationPages = ["/login"];

export const PageToPermissionMap: Record<string, string> = {
  RolesPage: "GET_ROLES",
  AdminUsersPage: "GET_ADMIN_USER",
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

const RouteProtected = ({ children, permissionKey }: any) => {
  console.log(
    "-- calling RouteProtected rootStore.authData.me",
    rootStore.authData.me,
  );
  if (!rootStore.authData.me) {
    return <Navigate to="/" replace />;
  }
  const permitted =
    rootStore.authData.me.role.permissions.includes(permissionKey);
  console.log("-- calling RouteProtected permitted", permitted);

  if (!permitted) {
    toast.error("You don't have right access");
    return <Navigate to="/" replace />;
  }
  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: async ({ request }) => {
      console.log("calling / loader");
      return await authorizationGuard(request);
    },
    errorElement: <ErrorBoundary />,
    children: [
      {
        // index: true,
        element: <MainLayout />,
        loader: () => {
          console.log("calling MainLayout loader");
          return null;
        },
        children: [
          {
            index: true,
            element: <MainPage />,
            loader: () => {
              console.log("calling MainPage loader");
              return null;
            },
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
            loader: () => {
              console.log("calling AdminUserPage loader");
              return null;
            },
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
        loader: () => {
          console.log("calling LoginPage loader");
          return null;
        },
      },
    ],
  },
]);
