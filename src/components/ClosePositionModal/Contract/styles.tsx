import { Tag } from "@components/Tag";
import styled from "styled-components";

export const ContractContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 8px 0px;
  align-items: center;
  gap: 8px;
`;

export const BuySellTag = styled(Tag)`
  min-width: 60px;
  width: 60px;
  height: 24px;
  min-height: 24px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  padding: 3px 11px 4px 11px;
  box-sizing: border-box;
`;
