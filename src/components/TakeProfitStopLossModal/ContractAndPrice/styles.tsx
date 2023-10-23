import styled from "styled-components";
import { SingleRow } from "@components/OrderForm/styles";

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  align-items: flex-end;
`;

export const PriceWrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`;

export const ContractAndPriceContainer = styled(SingleRow)`
  gap: 24px;
`;

export const ContractContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding-bottom: 8px;
`;
