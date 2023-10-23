import styled from "styled-components";
import { Text } from "@components/Text";
import { MarketPriceDisplay } from "@components/OrderForm/MarketPriceDisplay";
import { EstMarketPriceWrapper } from "@components/OrderForm/styles";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  flex: 1 0 0;
`;

export const OrderTypeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex: 1 0 0;
`;

export const MarketOrderInfo = styled.div`
  display: flex;
  padding: 12px 8px 12px 0px;
  align-items: center;
  gap: 4px;
`;

export const StyledMarketPrice = styled(MarketPriceDisplay)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  flex: 1 0 0;

  & > ${Text} {
    font-size: 11px;
    font-weight: 400;
    line-height: 13px;
  }

  & > ${EstMarketPriceWrapper} > ${Text} {
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
  }
`;
