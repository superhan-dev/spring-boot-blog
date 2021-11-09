import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { PageNotFoundView } from "./views/PageNotFoundView";

// import BlogLayout from "./layouts/blog/BlogLayout";
import { MainLayout } from "./layouts/main/MainLayout";
import { BlogLayout } from "./layouts/blog/BlogLayout";
import { BlogPage } from "./views/BlogPage/BlogPage";

export const App: React.FC = (): JSX.Element => {
  /**
   * routes.ts로 분리하려 했으나,
   * typescript는 element: <MainLayout />와 같은 방식을 오직 tsx로 선언해야 했다.
   * 따라서 우선 app안에 route를 구현하는 형태로 진행한다.
   */
  const mainRoutes = {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "404", element: <PageNotFoundView /> },
      { path: "/", element: <Navigate to="/blog" /> },
      // { path: "login", element: <Login /> },
    ],
  };

  const blogRoutes = {
    path: "blog",
    element: <BlogLayout />,
    children: [
      { path: "", element: <BlogPage /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  };

  const routing = useRoutes([mainRoutes, blogRoutes]);

  return <>{routing}</>;
};
