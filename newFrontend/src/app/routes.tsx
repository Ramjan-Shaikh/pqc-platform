import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AnalysisResultPage } from "./pages/AnalysisResultPage";
import { Root } from "./components/Root";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { path: "/", Component: LandingPage },
      { path: "/login", Component: LoginPage },
      { path: "/register", Component: RegisterPage },
      {
        Component: ProtectedRoute,
        children: [
          { path: "/dashboard", Component: DashboardPage },
          { path: "/analysis/:id", Component: AnalysisResultPage },
        ],
      },
    ],
  },
]);
