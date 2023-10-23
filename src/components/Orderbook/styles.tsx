import { Text } from "@components/Text";
import { TransitionGroup } from "react-transition-group";
import styled from "styled-components";
import { ORDERBOOK_ROW_HEIGHT } from "./orderbookRowHeight";

export const OrderbookContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding-top: 15px;
  gap: 6px;
  justify-content: space-between;
  background: ${(props) => props.theme.background[300]};

  /* Hide scroll for orderbook - bit too obtrusive */
  * {
    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .example {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex: auto;
    min-height: 440px;
    height: 975px;
  }
`;

export const OrderbookTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-height: 0;
`;

export const OrderBookTableSection = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const BidAskContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  flex-basis: 0;
  min-height: 0;
  border-left: none;
  overflow: auto;
  &:last-child {
    border-right: none;
  }
`;
export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #1a1d33;
  * {
    flex-grow: 1;
    flex-basis: 0;
    text-align: right;
    &:first-child {
      text-align: left;
    }
  }
`;

export const AccumulativeVolumeShading = styled.div<{
  $isAsk?: boolean;
}>`
  position: absolute;
  z-index: 0;
  background: ${(props) =>
    props.$isAsk ? props.theme.red[400] : props.theme.green[400]};
  height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  transition: 200ms;
`;

export const IndividualVolumeShading = styled(AccumulativeVolumeShading)`
  z-index: 1;
  background: ${(props) =>
    props.$isAsk ? props.theme.red[300] : props.theme.green[300]};
`;

export const OrderbookRowContainer = styled(HeaderContainer)<{
  $isAsk?: boolean;
}>`
  flex-direction: row;
  border: none;
  margin: 0;
  min-height: ${ORDERBOOK_ROW_HEIGHT}px;
  padding: 0 0.5rem;
  position: relative;
  transition: 200ms;
  cursor: pointer;
  z-index: 0;

  ${Text} {
    z-index: 1;
  }

  &.card-enter-active {
    background: transparent;
  }

  &.card-exit {
    background: transparent;
  }
  &.card-exit-active {
    background: transparent;
  }

  &.card-enter-active,
  &.card-exit-active {
    transition: background 500ms;
  }
`;

export const SpreadInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: ${(props) => props.theme.grey[800]};
  padding: 8px;

  * {
    flex-grow: 1;
    flex-basis: 0;
  }
`;

export const AlignedText = styled(Text)`
  display: flex;
  align-items: center;
  gap: 1px;
  & > svg {
    flex-grow: 0;
    flex-basis: auto;
  }
`;

export const PriceIncrementContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0;
`;

export const CenterButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const InnerRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  > * + * {
    margin-left: 0.3rem;
  }
`;

export const BidAskTransitionGroup = styled(TransitionGroup)`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;
