import { createBrowserRouter, redirect } from "react-router-dom";
import { LoginPage } from "@/modules/login/pages/LoginPage";
import { authDataStore } from "@/modules/login/store/auth.store";
import { Layout } from "@/common/layouts/Layout";
import { MainPage } from "./modules/main/pages/MainPage";
import { MainLayout } from "./common/layouts/MainLayout";
import { ErrorBoundary } from "./common/pages/ErrorBoundary";
import { RolesPage, rolesPageLoader } from "./modules/roles/pages/RolesPage";
import { AdminUsersPage } from "./modules/admin-users/pages/AdminUsersPage";

const authorizationPages = ["/login"];

const checkIsAuthorizedStore = () => {
  if (!authDataStore.isAuthorized && localStorage.getItem("access_token")) {
    authDataStore.setIsAuthorized(true);
  }
};

// executes at every route
const authorizationGuard = (request: Request) => {
  const url = new URL(request.url);

  // authorization pages
  if (authorizationPages.includes(url.pathname)) {
    if (authDataStore.isAuthorized) {
      return redirect("/");
    }
    return null;
  }

  // other pages
  // if not authorized redirect to login
  if (!authDataStore.isAuthorized) {
    return redirect("/login");
  }
  // if authorized do nothing
  return null;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: ({ request }) => {
      checkIsAuthorizedStore();
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
