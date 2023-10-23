import { SVGProps } from "react";
import { useTheme } from "styled-components";

const ShareIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => {
  const theme = useTheme();
  const { fill = theme?.purple[200], ...otherProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      fill={fill}
      {...otherProps}
    >
      <path
        fill="#7A4EB2"
        d="M11 10a2.494 2.494 0 0 0-1.789.756l-2.88-1.852a2.488 2.488 0 0 0 0-1.808l2.88-1.852a2.5 2.5 0 1 0-.54-.84L5.788 6.256a2.5 2.5 0 1 0 0 3.488l2.881 1.852A2.5 2.5 0 1 0 11 10Zm0-8a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM4 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm7 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
      />
    </svg>
  );
}; 
export default ShareIcon;
