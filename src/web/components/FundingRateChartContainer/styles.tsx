import { FundingRateChart } from "@components/Chart/FundingRateChart";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ChartContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  width: 100%;
`;

export const StyledFundingChart = styled(FundingRateChart)`
  flex: 1;
  width: 100%;
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
`;
