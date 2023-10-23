import SettingsIcon from "@assets/SettingsIcon";
import { useState } from "react";
import { SettingsModal } from "./SettingsModal";
import { SettingsButton } from "./styles";

export const Settings = () => {
  const [isSettingsOpened, setSettingsOpened] = useState(false);

  return (
    <>
      <SettingsButton onClick={() => {
        setSettingsOpened(true);
      }}>
        <SettingsIcon />
      </SettingsButton>
      <SettingsModal open={isSettingsOpened} onClose={() => setSettingsOpened(false)} />
    </>
  );
};
