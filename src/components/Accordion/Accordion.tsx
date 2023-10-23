import { useSpring } from "@react-spring/web";
import { useRef, useState } from "react";
import {
  HeaderContainer,
  AnimatedBodyWrapper,
  BodyContainer,
  AccordionContainer,
} from "./styles";

type AccordionProps = {
  /**
   * This is the static header component of the accordion, which is clickable to show/hide the body (content)
   */
  header: JSX.Element;
  /**
   * This is the body component of the accordion, which can be revealed or hidden
   */
  body: JSX.Element;
  className?: string;
  // TODO: Can add onToggle() in future to pass down into handleOpen()
  // For e.g. can be used to change direction of an arrow icon, if a header contains an arrow
};

export const Accordion = ({ header, body, className }: AccordionProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <AccordionContainer className={className}>
      <HeaderContainer onClick={handleOpen}>{header}</HeaderContainer>
      <AccordionDetails open={open}>{body}</AccordionDetails>
    </AccordionContainer>
  );
};

interface AccordionDetailsProps {
  children?: React.ReactNode;
  open: boolean;
  className?: string;
}

export const AccordionDetails = ({
  open,
  children,
  className,
}: AccordionDetailsProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const springs = useSpring({
    opacity: open ? 1 : 0,
    height: open ? contentRef.current?.offsetHeight ?? 0 : 0,
    onRest: () => {
      setTimeout(() => {
        if (containerRef.current && open) {
          // Set height to auto after animation so it is impervious to changing screen dimensions
          containerRef.current.style.height = "auto";
        }
      });
    },
  });

  return (
    <AnimatedBodyWrapper
      ref={containerRef}
      style={springs}
      className={className}
    >
      <BodyContainer ref={contentRef}>{children}</BodyContainer>
    </AnimatedBodyWrapper>
  );
};
