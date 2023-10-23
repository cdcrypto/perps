import { Text } from "@components/Text";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 24px;
`;

export const OrderTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 120px;
  gap: 8px;
`;

export const OrderPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const LimitOrderText = styled(Text)`
  margin-top: 12px;
`;
