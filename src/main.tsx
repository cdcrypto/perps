import React from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { Root } from "@utils/setup/Root";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";

if (import.meta.env.VITE_SENTRY_ENABLED === "true") {
  Sentry.init({
    dsn: "https://0ae4afa64ff78259b45a121988a29797@o4505797270765568.ingest.sentry.io/4505797332434944",
    integrations: [
      new Sentry.BrowserTracing({
        // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
        // tracePropagationTargets: ["localhost", "https:yourserver.io/api/"],
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),
      new Sentry.Replay(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    environment: import.meta.env.PROD ? "production" : "development",
  });
}

const ProfiledRoot = Sentry.withProfiler(Root, {
  disabled: import.meta.env.VITE_SENTRY_ENABLED === "true",
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProfiledRoot />
  </React.StrictMode>
);
