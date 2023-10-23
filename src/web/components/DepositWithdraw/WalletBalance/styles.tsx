import styled from "styled-components";
import { Text } from "@components/Text";

export const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  padding: 8px 24px 0px 24px;
`;
export const BalanceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  & > ${Text} {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;
