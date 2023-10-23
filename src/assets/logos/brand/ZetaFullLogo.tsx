import { SVGProps } from "react";
export const ZetaFullLogo = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={88}
    height={20}
    viewBox="0 0 88 20"
    {...props}
  >
    <defs>
      <linearGradient
        id="a"
        x1={0.303}
        x2={20.906}
        y1={-0.322}
        y2={19.035}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFC4B0" />
        <stop offset={0.12} stopColor="#F8B7B5" />
        <stop offset={0.33} stopColor="#E795C2" />
        <stop offset={0.61} stopColor="#CB5FD8" />
        <stop offset={0.95} stopColor="#A414F5" />
        <stop offset={1} stopColor="#9E08FA" />
      </linearGradient>
    </defs>
    <path
      fill="url(#a)"
      d="M8.5 6.5 0 20V0h2.5v6.5h6Zm3 7h6V20H20V0l-8.5 13.5Z"
    />
    <path
      fill="#F2E2FF"
      d="M36 4.5h-7V2h11.5l-8 13.5h8V18H28l8-13.5ZM46 2h8.5v2.5h-6V8H54v2.5h-5.5v5h6V18H46V2ZM66 18h-2.5V4.5H59V2h11.5v2.5H66V18ZM83.5 14h-7l-2 4H72l8-16 8 16h-2.5l-2-4Zm-1-2-2-4.5-.5-1-.5 1-2 4.5h5Z"
    />

  </svg>
);
