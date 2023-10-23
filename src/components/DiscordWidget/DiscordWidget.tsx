import { useState } from "react";
import { useTheme } from "styled-components";

import DiscordIcon from "@assets/DiscordIcon";

import { ChatWidget, ChatWidgetContainer, DiscordButton } from "./styles";
import { DISCORD_CHANNEL_ID, DISCORD_SERVER_ID } from "../../utils/config";

export const DiscordWidget = () => {

  const [isChatOpened, setChatOpened] = useState(false);
  const [isInitialized, setInitialized] = useState(false);
  const theme = useTheme();

  const iconColor = isChatOpened ? theme?.typography.clickable.active : theme?.typography.clickable.enabled;

  return (
    <>
      <DiscordButton onClick={() => {
        setChatOpened(!isChatOpened);
        setInitialized(true);
      }}>
        <DiscordIcon fill={iconColor} />
      </DiscordButton>
      {isInitialized &&
        <ChatWidgetContainer $visible={isChatOpened}>
          <ChatWidget
            server={DISCORD_SERVER_ID}
            channel={DISCORD_CHANNEL_ID}
            width={400}
            height={600}
          />
        </ChatWidgetContainer>
      }
    </>
  );
};
