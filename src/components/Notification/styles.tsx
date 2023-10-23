import { ToastContainer } from "react-toastify";
import styled, { css, keyframes } from "styled-components";
import { NotificationType } from "./Notification";
import "react-toastify/dist/ReactToastify.css";
import { Text } from "@components/Text";

export const GradientWrapper = styled.div`
  border-radius: 8px;
  z-index: 2;
  box-sizing: border-box;
  background: ${(props) => props.theme.gradient[100]};
  padding: 1px;
  min-height: 41px;
`;

export const NotificationContainer = styled.div`
  display: flex;
  flex-direction: row;
  background: ${(props) => props.theme.background[200]};
  height: 100%;
  border-radius: 8px;
  box-sizing: border-box;
  overflow: hidden;
`;

const fade = keyframes`
  0% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.7;
  }
`;

export const IconPanel = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  & > svg {
    z-index: 1;
  }
`;

export const IconPanelBackground = styled.div<{ type: NotificationType }>`
  position: absolute;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background: ${(props) =>
    props.type === "success"
      ? props.theme.signals.success
      : props.type === "error"
      ? props.theme.signals.danger
      : props.type === "info"
      ? props.theme.signals.info
      : props.type === "warning"
      ? props.theme.signals.warning
      : props.theme.gradient[100]};

  ${({ type }) =>
    type === "loading" &&
    css`
      animation: ${fade} 2s infinite;
    `}
`;

export const DialogContainer = styled.div`
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  padding: 12px 12px 14px;
  background: ${(props) => props.theme.background[200]};
  width: 100%;
  & > ${Text} {
    text-align: left;
  }
`;

export const LoaderWrapper = styled.div`
  width: 18px;
  height: 18px;
`;

export const CloseButtonContainer = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
`;

export const CloseIconWrapper = styled.button`
  background: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
`;

export const StyledToastContainer = styled(ToastContainer)`
  width: 361px;

  &&&.Toastify__toast-container {
    & > div {
      background: transparent;
    }

    .Toastify__toast-theme--colored.Toastify__toast--default,
    .Toastify__toast-theme--light {
      background: transparent;
    }
  }
`;

export const NotificationTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const ExplorerLink = styled.a`
  color: ${({ theme }) => theme.typography.hyperlink.enabled};
  margin-left: 22px;
  white-space: nowrap;
`;

