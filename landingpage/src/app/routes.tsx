import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AnalysisResultPage } from "./pages/AnalysisResultPage";
import { Root } from "./components/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { path: "/", Component: LandingPage },
      { path: "/login", Component: LoginPage },
      { path: "/dashboard", Component: DashboardPage },
      { path: "/analysis/:id", Component: AnalysisResultPage },
    ],
  },
]);
