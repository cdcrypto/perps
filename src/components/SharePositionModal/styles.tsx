import { rgba } from "polished";
import { Modal } from "@components/Modal";
import styled from "styled-components";
import bg from "./bg.webp";
import { Text } from "@components/Text";
import { ZetaLogoSpaced } from "@assets/logos/brand/ZetaLogoSpaced";
import { Button } from "../Button";
import { Badge } from "../Badge";
import { DialogContent } from "../Modal/styles";


export const SharePositionStyledModal = styled(Modal)`
  padding: 0px;
  background: transparent;
  width: 440px;

  ${DialogContent} {
    background: transparent;
  }
`;

export const SharedPositionWrap = styled.div`
  padding: 8px;
`;

export const SharePositionControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 12px 8px;
`;

export const PositionDialogWrap = styled.div`
  padding: 4px;
  background: ${(props) => props.theme.gradient[100]};
  border-radius: 16px;
`;

export const PositionDialogContent = styled.div`
  background: ${({ theme }) => theme.background[400]} url(${bg}) center center no-repeat;
  padding: 24px;
  border-radius: 14px;
`;

export const Logo = styled(ZetaLogoSpaced)`
  height: 26px;
`;

export const PnlValue = styled(Text)`
  font-size: 64px;
  line-height: 80px;
  margin: 76px 0 0;
  text-align: center;
`;

export const PnlSubtitle = styled(Text)`
  text-align: center;
`;

export const PositionDetails = styled.div`

  margin-top: 40px;
  padding: 16px;
  position: relative;

  &:before {
    background-color: ${({ theme }) => rgba(theme.background[100], 0.4)};
    mix-blend-mode: difference;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }
`;

export const PositionDetailsTitle = styled.div`
  border-bottom: 1px solid;
  border-image-source: ${({ theme }) => theme.gradient[100]};
  border-image-slice: 2;
  gap: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 16px;
  position: relative;
`;

export const AssetLabelWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 8px;

  svg {
    margin-right: 4px;
  }

`;

export const PositionDetailsBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 28px 0 9px;
  position: relative;
`;

export const BottomBarButton = styled(Button)`
  background: none;
  color: ${({ theme }) => theme.purple[200]};
  border: 0;
  padding: 0;
`;

export const PositionBadge = styled(Badge)`
  height: 24px;
  line-height: 24px;
  border-radius: 8px;
  border-color: transparent;
  font-size: 12px;
  font-weight: 500;
`;

export const LeveradgeBadgeWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: auto;
  gap: 8px;
`;

export const LeverageBadge = styled(PositionBadge)`
  background: ${({ theme }) => theme.gradient[100]};
  border: 0;
  padding: 1px;
`;

export const LeverageBadgeInner = styled.div`
  background: ${({ theme }) => theme.background[200]};
  border-radius: 7px;
  padding: 0px 11px;
  box-sizing: border-box;
  height: 22px;
  line-height: 22px;
`;

export const PositionSideBadge = styled(PositionBadge) <{ $isLong: boolean }>`
  background: ${({ theme, $isLong }) => $isLong ? theme.green[300] : theme.red[300]};
  color: ${({ theme, $isLong }) => $isLong ? theme.green[100] : theme.red[100]};
  line-height: 14px;
  padding: 3px 8px 5px;
  height: auto;
`;

export const Footer = styled.div`
  text-align: center;
  padding: 48px 0 16px;

  ${Text} {
    text-align: center;
  }
`;
