import { SVGProps } from "react";

const SolanaIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"

    fill="none"
    {...props}
  >
    <circle cx={12} cy={12} r={12} fill="#10081A" />
    <path
      fill="url(#a)"
      d="M7.139 15.159a.457.457 0 0 1 .333-.147h11.492c.21 0 .316.27.167.428l-2.27 2.414a.457.457 0 0 1-.333.146H5.035c-.21 0-.315-.27-.166-.427l2.27-2.414Z"
    />
    <path
      fill="url(#b)"
      d="M7.14 6.146A.47.47 0 0 1 7.471 6h11.493c.21 0 .315.27.166.427l-2.27 2.414a.457.457 0 0 1-.333.146H5.035c-.21 0-.315-.269-.166-.427l2.27-2.414Z"
    />
    <path
      fill="url(#c)"
      d="M16.86 10.624a.457.457 0 0 0-.332-.147H5.035c-.21 0-.315.27-.166.428l2.27 2.414a.457.457 0 0 0 .333.146h11.492c.21 0 .316-.27.167-.427l-2.27-2.414Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={17.867}
        x2={9.119}
        y1={4.558}
        y2={20.316}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00FFA3" />
        <stop offset={1} stopColor="#DC1FFF" />
      </linearGradient>
      <linearGradient
        id="b"
        x1={14.389}
        x2={5.642}
        y1={2.627}
        y2={18.385}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00FFA3" />
        <stop offset={1} stopColor="#DC1FFF" />
      </linearGradient>
      <linearGradient
        id="c"
        x1={16.117}
        x2={7.369}
        y1={3.587}
        y2={19.344}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00FFA3" />
        <stop offset={1} stopColor="#DC1FFF" />
      </linearGradient>
    </defs>
  </svg>
);
export default SolanaIcon;
