import { SVGProps } from "react";

const AscendingIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#BCBEC0"
      d="M11.354 10.646a.498.498 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L8 13.293l2.646-2.647a.5.5 0 0 1 .708 0Z"
      opacity={0.58}
    />
    <path
      fill="#D6B1FE"
      d="M5.354 5.354 8 2.707l2.646 2.647a.5.5 0 1 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 .708.708Z"
    />
  </svg>
);
export default AscendingIcon;
