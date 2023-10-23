import styled from "styled-components";
import WidgetBot from "@widgetbot/react-embed";

export const DiscordButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
`;

export const ChatWidgetContainer = styled.div <{ $visible: boolean }>`
  display: ${(props) => props.$visible ? "block" : "none"};
  top: 66px;
  right: 60px;
  position: fixed;
`;

export const ChatWidget = styled(WidgetBot)`
`;
