import { Modal } from "@components/Modal";
import { DialogContent } from "@components/Modal/styles";
import { Tab } from "@components/Tabs";
import { Text } from "@components/Text";
import styled, { keyframes } from "styled-components";
import { InputWrapper } from "../Input/styles";
import { Button } from "@components/Button";
import { ButtonLabel } from "@components/Button/styles";

export const StyledSettingsModal = styled(Modal)`
  max-height: 90vh;
  &, ${DialogContent} {
    background: none;
    overflow: auto;
    border-radius: 0;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const TitleButton = styled(Button)`
  height: 32px;
  line-height: 32px;
  width: 160px;

  ${ButtonLabel} {
    font-size: 14px;
    font-weight: 400;
    text-transform: none;
  }
`;

export const CancelButton = styled(TitleButton)`
  width: 74px;
  &, &:hover {
    background: none;
  }

  ${ButtonLabel} {
   color: ${({ theme }) => theme.violet[200]};
  }
`;

export const Title = styled(Text)`
  margin: 16px 0;
`;


export const SettingsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
`;

export const SliderContainer = styled.div`
  width: 360px;
`;

export const PriorityTab = styled(Tab)`
  width: 120px;
  height: 32px;
`;

export const RpcProviderTab = styled(PriorityTab)`
  width: 180px;
`;

export const RpcInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: flex-end;
  justify-content: space-between;
  padding: 7px 0 16px;

  ${InputWrapper} {
    flex: 1;
  }

  button {
    width: 120px;
  }
`;

export const RpcUrlTextArea = styled.textarea`
  padding: 12px 16px;
  background: ${({ theme }) => theme.plum[500]};
  border-radius: 12px;
  border: 0;
  resize: none;
  flex: 1;
  outline: none;
  color: ${({ theme }) => theme.typography.highlight};
  font-family: Sora;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  &:disabled {
    color: ${({ theme }) => theme.typography.clickable.disabled};
  }

  &::placeholder { 
    color: ${({ theme }) => theme.typography.secondary};
  }
`;

export const LoaderWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 201;
  background: ${({ theme }) => theme.background[400]};
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 31px;
`;

export const LoaderContainer = styled.div`
  width: 400px;
  height: 4px;
  background: ${({ theme }) => theme.grey[700]};
`;


const progress = keyframes`
  0% { 
   width: 0%;
  }

  100% { 
    width: 400px;
  }
`;

export const Loader = styled.div`
  width: 400px;
  height: 100%;
  animation-timing-function: ease-in-out;
  background: ${({ theme }) => theme.gradient[100]};
  animation-name: ${progress};
  animation-duration: 2s;
`;

export const FeesContainer = styled.div`
  margin-top: 8px;
`;
