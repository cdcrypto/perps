import { SVGProps } from "react";
import { useTheme } from "styled-components";

const FilledCircle = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => {
  const theme = useTheme();
  const { fill = theme?.green[100] } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="7"
      height="6"
      viewBox="0 0 7 6"
      fill={fill}
    >
      <circle cx="3.5" cy="3" r="3" />
    </svg>
  );
};

export default FilledCircle;
