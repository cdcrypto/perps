import { Button } from "@components/Button";
import { Text } from "@components/Text";
import Lottie from "lottie-react";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 24px;
  align-items: center;
`;

export const SuccessLottie = styled(Lottie)`
  padding: 50px 0px;
`;

export const InfoContainer = styled.div`
  display: flex;
  padding: 8px 24px;
  flex-direction: column;
  align-items: center;
`;

export const AmountText = styled(Text)`
  font-size: 32px;
  font-weight: 500;
  line-height: 40px;
`;

export const AssetRow = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export const TextContainer = styled.div`
  display: flex;
  padding: 8px 24px;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

export const DescriptionText = styled(Text)`
  display: flex;
  padding: 8px 24px;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

export const PrimaryButton = styled(Button)`
  margin-top: 32px;
  margin-bottom: 8px;
  width: 100%;
  height: 48px;
`;
