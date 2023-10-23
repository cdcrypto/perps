import {
  MoreMenuTooltip,
  MoreMenuNav,
  MenuContainer,
  MenuItem,
} from "./styles";
import { MoreIcon } from "@assets/MoreIcon";
import { DOCS_LINK, LEARN_LINK, DISCORD_LINK } from "./MenuLinks";
const moreMenuOption = [
  { link: DOCS_LINK, label: "Docs" },
  {
    link: LEARN_LINK,
    label: "Learn",
  },
  { link: DISCORD_LINK, label: "Discord" },
];

export const HoverMoreMenu = () => {
  return (
    <>
      <MoreMenuNav className="more-menu-nav">
        <MoreIcon />
        More
      </MoreMenuNav>
      <MoreMenuTooltip
        noArrow
        anchorSelect=".more-menu-nav"
        place="bottom"
        clickable
      >
        <MenuContainer>
          {moreMenuOption.map((option) => {
            return (
              <MenuItem href={option.link} key={option.label} target="_blank">
                {option.label}
              </MenuItem>
            );
          })}
        </MenuContainer>
      </MoreMenuTooltip>
    </>
  );
};
