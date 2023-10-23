import styled from "styled-components";
import { Modal } from "@components/Modal";
import { Slider } from "@components/Slider";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

export const StyledModal = styled(Modal)`
  width: 440px;
  padding: 0px;
  background: ${(props) => props.theme.background[300]};
  max-height: 90vh;
`;

export const DialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const InputControls = styled.div`
  display: flex;
  padding: 0px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 24px;
`;

export const OrderInput = styled(Input)`
  display: flex;
  padding: 12px;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
`;

export const Spacer = styled.div<{ height: string }>`
  width: 100%;
  height: ${(props) => props.height};
`;

export const StyledButton = styled(Button)`
  height: 48px;
`;

export const StyledSlider = styled(Slider)`
  margin-top: -16px; /* Need to fine tune these values */
  margin-bottom: -8px;
`;
