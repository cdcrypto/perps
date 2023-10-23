import { ChildWrapper, StyledTooltip } from "@components/Tooltip/styles";
import styled from "styled-components";

export const MoreMenuTooltip = styled(StyledTooltip)`
  && {
    padding: 3px;
    opacity: 1;
  }
  &.example-arrow {
    display: flex;
  }
`;
export const MoreMenuNav = styled(ChildWrapper)`
  gap: 15px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  align-items: center;
  padding: 10px 16px 12px 16px;
  cursor: pointer;
  color: ${(props) => props.theme.typography.clickable.enabled};
  &:hover {
    color: ${(props) => props.theme.typography.clickable.active};
    & > svg {
      color: ${(props) => props.theme.typography.clickable.active};
    }
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.background[200]};
  z-index: 1;
`;

export const MenuItem = styled.a`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px 8px;
  margin: -2px;

  color: ${(props) => props.theme.typography.clickable.enabled};
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  border-bottom: 1px solid #10081a;
  &:hover {
    background: ${(props) => props.theme.grey[600]};
    color: ${(props) => props.theme.typography.highlight};
  }

  &:first-child {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
  &:last-child {
    border-bottom: none;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;
