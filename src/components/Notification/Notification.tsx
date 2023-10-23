import CloseIcon from "@assets/CloseIcon";
import ErrorIcon from "@assets/ErrorIcon";
import InfoIcon from "@assets/InfoIcon";
import SuccessIcon from "@assets/SuccessIcon";
import WarningIcon from "@assets/WarningIcon";
import { Text } from "@components/Text";
import { TextColor } from "@components/Text/Text";
import { EXPLORER_LINK } from "@utils/constants";
import Lottie from "lottie-react";
import { TypeOptions } from "react-toastify";
import loaderAnimation from "./loaderAnimation.json";
import {
  CloseButtonContainer,
  CloseIconWrapper,
  DialogContainer,
  ExplorerLink,
  GradientWrapper,
  IconPanel,
  IconPanelBackground,
  LoaderWrapper,
  NotificationContainer,
  NotificationTextContainer,
} from "./styles";

export type NotificationType = Exclude<TypeOptions, "default"> | "loading";

type NotificationProps = {
  /**
   * The title text of the notification
   */
  header: string;
  /**
   * The body text of the notification
   */
  body: string;
  /**
   * The type of notification
   */
  variant?: NotificationType;
  /**
   * If you do not wish to be able to close the notification
   */
  removeClose?: boolean;
  className?: string;
  transactionDigest?: string;
};

const COLORS_FOR_VARIANT: Record<NotificationType, TextColor> = {
  success: "success",
  error: "danger",
  info: "information",
  warning: "warning",
  loading: "secondary",
} as const;

const ICONS_FOR_VARIANT: Record<NotificationType, React.ReactNode> = {
  success: <SuccessIcon />,
  error: <ErrorIcon />,
  info: <InfoIcon />,
  warning: <WarningIcon />,
  loading: (
    <LoaderWrapper>
      <Lottie
        style={{
          transform: "scale(2)",
          width: "100%",
          height: "100%",
        }}
        animationData={loaderAnimation}
      />
    </LoaderWrapper>
  ),
} as const;

export const Notification = ({
  header,
  body,
  variant = "success",
  removeClose = false,
  className,
  transactionDigest,
}: NotificationProps) => {

  const icon = ICONS_FOR_VARIANT[variant];
  const textColor = COLORS_FOR_VARIANT[variant];

  return (
    <GradientWrapper>
      <NotificationContainer className={className}>
        <IconPanel>
          <IconPanelBackground type={variant} />
          {icon}
        </IconPanel>
        <DialogContainer>
          <Text variant="h4" color={textColor}>
            {header}
          </Text>

          {(body || transactionDigest) && (
            <NotificationTextContainer>
              <Text variant="caption" color="primary">
                {body ?? ""}{" "}
              </Text>
              {transactionDigest &&
                <Text variant="caption" color="hyperlinkEnabled">
                  <ExplorerLink target="_blank" href={`${EXPLORER_LINK}/tx/${transactionDigest ?? ""}`} rel="noreferrer">
                    View transaction
                  </ExplorerLink>
                </Text>
              }
            </NotificationTextContainer>
          )}

        </DialogContainer>
        {!removeClose && (
          <CloseButtonContainer>
            <CloseIconWrapper>
              <CloseIcon height={11} width={11} />
            </CloseIconWrapper>
          </CloseButtonContainer>
        )}
      </NotificationContainer>
    </GradientWrapper>
  );
};
