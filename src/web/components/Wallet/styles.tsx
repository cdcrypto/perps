import styled, { keyframes } from "styled-components";
import { Modal } from "@components/Modal";
import { Button } from "@components/Button";
import { ButtonLabel, DefaultButton } from "@components/Button/styles";

import WalletOutlinedLogo from "@assets/logos/Wallet/WalletOutlined";
import { Text } from "@components/Text/styles";
export const WalletButtonContainer = styled.div`
  z-index: 100;
  display: flex;
  justify-content: center;
`;

export const StyledModal = styled(Modal)`
  max-height: none;
  overflow-y: clip;
  padding: 0px;
  background: ${(props) => props.theme.background[300]};

  > * {
    text-align: center;
  }

  > * + * {
    margin-top: 1rem;
  }
`;

export const WalletListItemIcon = styled.img`
  height: 32px;
  width: 32px;
`;

export const WalletListItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 16px;
  justify-content: center;
  gap: 8px;
  background: ${(props) => props.theme.plum[400]};
  border-radius: 16px;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
`;

export const WalletListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 16px;
`;

export const GridWalletListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  grid-gap: 16px;
`;

export const UnconnectedWalletButtonWrapper = styled(Button)`
  width: 180px;
  height: 32px;
  & > ${ButtonLabel} {
    text-transform: none;
    white-space: nowrap;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }
`;

export const WalletModalContentBody = styled.div`
  box-sizing: border-box;
  background: ${(props) => props.theme.background[300]};
  padding: 40px 24px 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  & > ${Text} {
    text-align: center;
  }
`;

export const SuccessfullyConnectedWalletContainer = styled.div`
  width: 360px;
  box-sizing: border-box;
  background: ${(props) => props.theme.background[300]};
  padding: 200px 24px 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 62px;

  & > ${DefaultButton} {
    width: 100%;
  }
`;
export const SuccessfulConnectedStatus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ConnectedWalletContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  gap: 8px;
`;

export const NoWalletAvailableContainer = styled.div`
  box-sizing: border-box;
  background: ${(props) => props.theme.background[300]};
  padding: 40px 24px 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  & > ${Text} {
    text-align: center;
    padding-bottom: 16px;
  }
`;

export const NoWalletListItemContainer = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 20px 16px;
  justify-content: center;
  gap: 8px;
  background: ${(props) => props.theme.plum[400]};
  border-radius: 16px;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
`;

export const LoadingConnectBody = styled.div`
  width: 360px;
  box-sizing: border-box;
  background: ${(props) => props.theme.background[300]};
  padding: 148px 24px 222px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > ${Text} {
    text-align: center;
  }
`;

export const LoadingGraphicsWrapper = styled.div`
  display: flex;
  padding: 18px 0px;
  gap: 16px;
  align-items: center;
`;

export const BlinkingDotsWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const blink = keyframes`
  0% { 
    opacity: 0.2;
  }
  50% { 
    opacity: 1;
  }
  100% { 
    opacity: 0.2;
  }
`;

export const BlinkingDot = styled.div`
  animation-timing-function: ease-in-out;
  background-color: #ecdcfe;
  animation-name: ${blink};
  animation-iteration-count: infinite;
  height: 8px;
  width: 8px;
  border-radius: 50%;
`;

export const WalletAddressLabel = styled.span`
  display: inline-block;
  width: 101px;
`;

export const WalletIcon = styled(WalletOutlinedLogo)`
  padding-right: 4px;
`;
