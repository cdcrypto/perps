import * as Sentry from "@sentry/react";
import { Navigate, useRouteError } from "react-router-dom";
import { ROUTES } from "@web/routes";
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export const SentryErrorBoundary = () => {
  const error = useRouteError();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!error) return;
    Sentry.withScope((scope) => {
      scope.setExtras({ ...error, publicKey: publicKey?.toString() });
      scope.setLevel("fatal");
      Sentry.captureException(error);
    });
  }, [error, publicKey]);

  return <Navigate to={ROUTES.TRADE} replace />;
};
