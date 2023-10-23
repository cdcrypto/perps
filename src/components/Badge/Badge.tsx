import { ComponentPropsWithRef } from "react";
import { Badge as BadgeStyled } from "./styles";
import { WebTarget } from "styled-components";

type OriginalBadgeProps = ComponentPropsWithRef<typeof BadgeStyled>;

type BadgeProps = Omit<OriginalBadgeProps, "$variant" | "as"> & {
  component?: WebTarget;
  variant?: OriginalBadgeProps["$variant"];
}

export const Badge = ({
  variant,
  component,
  ...props
}: BadgeProps) => <BadgeStyled $variant={variant} {...props} as={component} />; 
