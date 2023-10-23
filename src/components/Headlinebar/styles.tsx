import styled from "styled-components";
import { Caption } from "@components/Text/styles";

export const HeadlinebarContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: ${(props) => props.theme.background[400]};
  height: 30px;
  min-height: 30px;
  width: 100vw;
  z-index: 5;
  padding: 3px 8px;
  box-sizing: border-box;
`;

export const StatsSummary = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 0 1rem; */
  font-size: 12px;
  font-weight: 500;
  gap: 24px;
`;

export const IndivStat = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const StyledCaption = styled(Caption)`
  color: ${(props) => props.theme.typography.primary};
  .MuiSkeleton-root {
    background-color: ${(props) => props.theme.typography.secondary};
    display: inline-block;
    width: 28px;
  }
`;

export const SolanaSpeedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  font-size: 12px;
  font-weight: 500;
  gap: 4px;
`;
