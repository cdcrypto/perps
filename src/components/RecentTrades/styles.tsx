import styled from "styled-components";
import { Text } from "@components/Text";
import { HeaderContainer } from "@components/Orderbook/styles";
import { TransitionGroup } from "react-transition-group";

export const RecentTradesTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  background: ${(props) => props.theme.background[300]};
`;

export const RecentTradesContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  flex-grow: 1;
  flex-basis: 0;
  border-left: none;
  overflow: hidden;
  /* TODO: This will change as per design, to set min/max */
  min-height: 204px;
  &:last-child {
    border-right: none;
  }
`;

export const TradesTransitionGroup = styled(TransitionGroup)`
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
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

export const RecentTradeRowContainer = styled(HeaderContainer)`
  flex-direction: row;
  border: none;
  margin: 0;
  padding: 0.25rem 0.5rem;
  position: relative;
  transition: 200ms;
  cursor: pointer;

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
