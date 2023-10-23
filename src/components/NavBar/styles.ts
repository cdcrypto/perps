import { styled } from "styled-components";
import { Link, NavLink } from "react-router-dom";

export const NavbarSpacer = styled.div`
  height: 66px;
  width: 100vw;
`;
export const NavbarLinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

export const LogoLink = styled(Link)`
  cursor: pointer;
`;
export const NavbarContainer = styled.div`
  padding: 10px 30px 10px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background: ${(props) => props.theme.background[400]};
  min-height: 66px;
  height: 66px;
  width: 100vw;
  position: sticky;
  top: 0;
  z-index: 3;
`;

export const NavLinksWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLinkRoute = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  cursor: pointer;
  color: ${(props) => props.theme.typography.clickable.enabled};
  &.active {
    color: ${(props) => props.theme.typography.clickable.active};

    & > svg {
      color: ${(props) => props.theme.typography.clickable.active};
    }
  }
  padding: 10px 16px 12px 16px;

  font-size: 14px;
  font-weight: 500;
  line-height: 20px;

  & > svg {
    color: ${(props) => props.theme.typography.clickable.enabled};
  }
`;

export const NavbarButtons = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  align-items: stretch;
`;

export const NavbarRightPanel = styled(NavbarButtons) <{ $increasedGap: boolean }>`
  gap: ${({ $increasedGap }) => $increasedGap ? "8px" : "4px"};
`;
