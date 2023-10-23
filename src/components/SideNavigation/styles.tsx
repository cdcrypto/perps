import styled from "styled-components";
import { NavLink } from "react-router-dom";

const SIDE_NAV_BAR_WIDTH = "56px";

export const DrawerHeading = styled.div`
  display: flex;
  color: ${(props) => props.theme.typography.highlight};
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  height: 53px;
  line-height: 54px;
  padding: 0 16px 0 20px;
  opacity: 0;
`;

export const CoinSymbol = styled.span`
  opacity: 0;
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

export const CoinSummary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: ${(props) => props.theme.typography.primary};
  font-size: 12px;
  font-weight: 400;
  opacity: 0;
`;

export const SideNavBarSpacer = styled.div`
  height: 100%;
  min-width: ${SIDE_NAV_BAR_WIDTH};
`;

export const SideNavBarWrapper = styled.div`
  position: fixed;
  z-index: 4;
  /* Navbar height + gutter */
  top: calc(66px + 4px);
  /* 2x 4px gutters + Navbar + headline bar*/
  height: calc(100% - 8px - 66px - 30px);
  left: 0;
  background: ${(props) => props.theme.background[200]};
  border-radius: 0px 12px 12px 0px;
  padding: 1px 1px 1px 0px;
  box-sizing: border-box;

  width: ${SIDE_NAV_BAR_WIDTH};
  &:hover {
    width: 220px;
    background: linear-gradient(
      133.21deg,
      #ffc4b0 0%,
      #f8b7b5 12%,
      #e795c2 33%,
      #cb5fd8 61%,
      #a414f5 95%,
      #9e08fa 100%
    );
  }
  &:hover ${CoinSymbol}, &:hover ${CoinSummary}, &:hover ${DrawerHeading} {
    opacity: 1;
  }
  transition: width 0.1s ease-in-out;
`;

export const SideNavBar = styled.div`
  background: ${(props) => props.theme.background[200]};
  display: inline-flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border-radius: 0px 12px 12px 0px;
  gap: 4px;
  overflow-x: hidden;
`;

export const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DrawerItemContent = styled(NavLink)`
  all: unset;
  overflow: hidden;
  padding: 0 16px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  cursor: pointer;
  border-top: ${(props) => `1px solid ${props.theme.grey[900]}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.grey[900]}`};

  &.active {
    border-bottom: ${({ theme }) => `1px solid ${theme.purple[100]}`};
    background: ${({ theme }) => `1px solid ${theme.grey[700]}`};
    &:last-child {
      border-bottom: ${({ theme }) => `1px solid ${theme.purple[100]}`};
    }
  }
`;

export const CoinRepresentation = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${(props) => props.theme.typography.highlight};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;
