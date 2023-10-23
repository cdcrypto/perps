import { animated } from "@react-spring/web";
import styled, { DefaultTheme } from "styled-components";
import { Close } from "styled-icons/ionicons-outline";
import { Text } from "@components/Text";
import { DefaultButton } from "@components/Button/styles";
import { CancelModalButton } from "@web/components/DepositWithdraw/styles";
import { PriceInput, SingleRow } from "@components/OrderForm/styles";

export const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
`;

export const ModalBackdrop = styled(animated.div)<{
  $getBackgroundColor?: (theme: DefaultTheme) => string;
}>`
  background: ${(props) =>
    props.$getBackgroundColor
      ? props.$getBackgroundColor(props.theme)
      : "rgba(0, 0, 0, 0.85)"};
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export const DialogContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CompulsoryDialog = styled(animated.div)`
  margin: 32px;
  max-height: calc(100% - 64px);
  border-radius: 12px;
  color: ${(props) => props.theme.white};
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Dialog = styled(animated.div)<{ $showBg: boolean }>`
  background: ${(props) => (props.$showBg ? "#121224" : "none")};
  border-radius: 12px;
  color: ${(props) => props.theme.white};
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CloseIcon = styled(Close)`
  position: absolute;
  top: 0;
  right: 0;
  color: #475d87;
  margin-right: 1rem;
  margin-top: 1rem;
  cursor: pointer;
`;

/**
 * react-spring clones a portal twice when used in a transition,
 * wrapping the portal with a plain div fixes this issue.
 */
export const PortalWrapper = styled.div``;

export const DialogContent = styled.div`
  width: 100%;
  background: ${(props) => props.theme.background[300]};
  border-radius: 24px;
  color: ${(props) => props.theme.grey[500]};
`;

export const DialogHeader = styled(Text)`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${(props) => props.theme.grey[600]};
  padding: 10px 0px;
`;

export const StyledDialogContent = styled.div`
  width: 400px;
  background: ${(props) => props.theme.background[300]};
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`;

export const DialogBody = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 24px 24px;
  gap: 24px;
`;

export const CenteredDialogSingleRow = styled(SingleRow)`
  align-items: center;
`;

export const DialogNumericalInput = styled(PriceInput)``;

export const ConfirmCancelButtonContainer = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 32px 24px 24px 24px;

  & > ${DefaultButton} {
    width: 100%;
  }
`;

export const CancelEditOrderModal = styled(CancelModalButton)``;
