import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import App from "App";
import { ROUTES } from "@web/routes";
import { tradeLoader } from "@web/components/Trade";
import { ErrorScreen } from "@web/components/ErrorScreen";
import { SentryErrorBoundary } from "@utils/errorTracking";

export const ROUTES_CONFIG = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorScreen />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.TRADE} replace />,
        errorElement: <SentryErrorBoundary />,
      },
      {
        path: ROUTES.PORTFOLIO,
        lazy: () => import("@web/components/Portfolio"),
        errorElement: <SentryErrorBoundary />,
      },
      {
        path: `${ROUTES.TRADE}/:asset?`,
        lazy: () => import("@web/components/Trade"),
        loader: tradeLoader,
        errorElement: <SentryErrorBoundary />,
      },
    ],
  },
];
const router = createBrowserRouter(ROUTES_CONFIG);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
