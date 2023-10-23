import { SVGProps } from "react";

export const PortfolioIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      fill="currentColor"
      d="M2 18c-.55 0-1.021-.196-1.413-.588A1.922 1.922 0 0 1 0 16V2C0 1.45.196.979.588.587A1.922 1.922 0 0 1 2 0h14c.55 0 1.021.196 1.413.588.392.392.588.863.587 1.412v14c0 .55-.196 1.021-.588 1.413A1.922 1.922 0 0 1 16 18H2Zm0-2h6V2H2v14Zm8 0h6V9h-6v7Zm0-9h6V2h-6v5Z"
    />
  </svg>
);
export default PortfolioIcon;
