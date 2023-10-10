import { createBrowserRouter, redirect } from "react-router-dom";
import { LoginPage } from "@/modules/login/pages/LoginPage";
import { authDataStore } from "@/common/store/authStore";
import { Layout } from "./common/components/Layout";

const publicPages = ["/login"];

// executes at every route
const authorizationGuard = (request: Request) => {
  const url = new URL(request.url);
  // public pages dont need authorization
  if (publicPages.includes(url.pathname)) {
    return null;
  }
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
    loader: ({ request }) => authorizationGuard(request),
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/login2",
        element: <LoginPage />,
      },
    ],
  },
]);
