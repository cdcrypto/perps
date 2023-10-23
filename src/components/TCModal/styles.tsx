import styled from "styled-components";
import { Modal } from "@components/Modal";
import { Button } from "@components/Button";
import { ButtonLabel } from "@components/Button/styles";
import { Text } from "@components/Text";
import { DialogContent } from "@components/Modal/styles";
export const StyledModal = styled(Modal)`
  padding: 32px;
  ${DialogContent} {
    width: 544px;
    height: 858px;
    padding: 38px 46px 0px;
    box-sizing: border-box;
  }
`;

export const TCHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
`;

export const DialogHeader = styled(Text)`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #263e6d;
  padding: 10px 0px;
`;

export const DialogBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 48px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
`;

export const Instructions = styled(Text)`
  font-weight: 500;
  padding-bottom: 15px;
  padding-bottom: 24px;
`;

export const Breakdown = styled.div`
  border-radius: 20px;
  z-index: 2;
  box-sizing: border-box;
  background: ${(props) => props.theme.gradient[100]};
  padding: 1px;

  letter-spacing: 0em;
  text-align: left;
  color: ${(props) => props.theme.typography.highlight};

  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TCTextContent = styled.div`
  background: ${(props) => props.theme.background[200]};
  border-radius: 20px;
  padding: 16px 16px 6px 0;
  & > ul {
    margin: 0;
  }
  & > ul > li {
    padding-bottom: 10px;
  }
`;

export const ExternalLink = styled.a`
  color: ${(props) => props.theme.lilac[200]};
  text-decoration: underline;
  cursor: pointer;
`;

export const AgreeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 48px 24px 48px;
  gap: 16px;
`;

export const AgreeText = styled(Text)``;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding-bottom: 48px;
  padding: 20px 48px 48px 48px;

  & ${ButtonLabel} {
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }
`;

export const ContinueButton = styled(Button)`
  && {
    height: 48px;
    padding: 12px 16px;
    border-radius: 24px;
    flex: 1 1 0;
    border: none;
  }
`;
