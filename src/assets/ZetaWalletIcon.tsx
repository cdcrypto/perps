import { SVGProps } from "react";
export const ZetaWalletIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    {...props}
  >
    <rect width={31} height={31} x={0.5} y={0.5} fill="#090012" rx={11.5} />
    <path
      fill="url(#zeta-logo-a)"
      d="M14.8 13.2 8 24V8h2v5.2h4.8Zm2.4 5.6H22V24h2V8l-6.8 10.8Z"
    />
    <rect width={31} height={31} x={0.5} y={0.5} stroke="url(#zeta-logo-b)" rx={11.5} />
    <defs>
      <linearGradient
        id="zeta-logo-a"
        x1={8.242}
        x2={24.725}
        y1={7.742}
        y2={23.228}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFC4B0" />
        <stop offset={0.12} stopColor="#F8B7B5" />
        <stop offset={0.33} stopColor="#E795C2" />
        <stop offset={0.61} stopColor="#CB5FD8" />
        <stop offset={0.95} stopColor="#A414F5" />
        <stop offset={1} stopColor="#9E08FA" />
      </linearGradient>
      <linearGradient
        id="zeta-logo-b"
        x1={0.484}
        x2={33.45}
        y1={-0.515}
        y2={30.456}
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
  </svg>
);
