import { SVGProps } from "react";

const PositiveArrow = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={10}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fill="#43B88E"
      d="M8 16a.968.968 0 0 1-.713-.288A.964.964 0 0 1 7 15V3.825L2.125 8.7c-.2.2-.438.3-.713.3A.97.97 0 0 1 .7 8.7.96.96 0 0 1 .4 8c0-.267.1-.5.3-.7L7.3.7c.1-.1.208-.17.325-.212.117-.041.242-.062.375-.063.133 0 .263.021.388.063.125.042.23.113.312.212l6.6 6.6c.2.2.3.433.3.7 0 .267-.1.5-.3.7-.2.2-.438.3-.713.3a.97.97 0 0 1-.712-.3L9 3.825V15a.968.968 0 0 1-.288.713A.964.964 0 0 1 8 16Z"
    />
  </svg>
);
export default PositiveArrow;
