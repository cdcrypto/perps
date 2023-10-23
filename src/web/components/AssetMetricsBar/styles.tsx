import { PercentageText } from "@components/PriceDelta/styles";
import { styled } from "styled-components";

export const AssetMetricsBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
  background: ${(props) => props.theme.background[300]};
  height: 56px;
  border-radius: 12px;
  padding-left: 8px;
 `;

export const AssetIconName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
`;
export const AssetTextWrapper = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`;
export const QtyTextWrapper = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  justify-content: flex-end;
  gap: 4px;
`;
export const AssetMetricsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 3px;

  ${PercentageText} {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
  }
`;

export const FundingRatesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;
