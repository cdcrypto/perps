import { SVGProps } from "react";

const OutlinedCancelIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={19}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fill="#7A4EB2"
      d="M10.354 6.354 8.707 8l1.647 1.646a.5.5 0 0 1-.708.708L8 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L7.293 8 5.646 6.354a.5.5 0 1 1 .708-.708L8 7.293l1.646-1.647a.5.5 0 0 1 .708.708ZM14.5 8A6.5 6.5 0 1 1 8 1.5 6.507 6.507 0 0 1 14.5 8Zm-1 0A5.5 5.5 0 1 0 8 13.5 5.506 5.506 0 0 0 13.5 8Z"
    />
  </svg>
);
export default OutlinedCancelIcon;
