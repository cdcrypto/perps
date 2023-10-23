import { SVGProps } from "react";

export const CreateWalletIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={62}
    height={62}
    viewBox="0 0 62 62"
    fill="none"
    {...props}
  >
    <g filter="url(#a)">
      <rect width={48} height={48} x={7} y={7} fill="url(#b)" rx={12} />
      <rect
        width={48}
        height={48}
        x={7}
        y={7}
        fill="#000"
        fillOpacity={0.94}
        rx={12}
      />
      <path
        fill="#F2E2FF"
        d="M41.22 23.907H21.687a1.221 1.221 0 0 1 0-2.442h16.605a.733.733 0 0 0 0-1.465H21.686A2.686 2.686 0 0 0 19 22.686v15.628A2.686 2.686 0 0 0 21.686 41h19.535a1.71 1.71 0 0 0 1.71-1.71V25.617a1.71 1.71 0 0 0-1.71-1.709Zm.245 15.384a.244.244 0 0 1-.244.244H21.686a1.22 1.22 0 0 1-1.22-1.221V25.078c.377.194.795.295 1.22.294h19.535a.244.244 0 0 1 .244.244v13.675Zm-3.419-7.326a1.22 1.22 0 1 1-2.44 0 1.22 1.22 0 0 1 2.44 0Z"
      />
      <g filter="url(#c)">
        <path
          fill="#F2E2FF"
          d="M41.256 23.907H21.72a1.221 1.221 0 0 1 0-2.442h16.605a.733.733 0 0 0 0-1.465H21.72a2.686 2.686 0 0 0-2.686 2.686v15.628A2.686 2.686 0 0 0 21.72 41h19.535a1.71 1.71 0 0 0 1.71-1.71V25.617a1.71 1.71 0 0 0-1.71-1.709Zm.244 15.384a.244.244 0 0 1-.244.244H21.72a1.22 1.22 0 0 1-1.221-1.221V25.078c.378.194.796.295 1.221.294h19.535a.244.244 0 0 1 .244.244v13.675Zm-3.419-7.326a1.221 1.221 0 1 1-2.442 0 1.221 1.221 0 0 1 2.442 0Z"
        />
      </g>
      <rect width={47} height={47} x={7.5} y={7.5} stroke="url(#d)" rx={11.5} />
      <rect
        width={47}
        height={47}
        x={7.5}
        y={7.5}
        stroke="#9B9B9B"
        strokeOpacity={0.8}
        rx={11.5}
      />
      <rect
        width={47}
        height={47}
        x={7.5}
        y={7.5}
        stroke="#000"
        strokeOpacity={0.2}
        rx={11.5}
      />
    </g>
    <path
      stroke="#fff"
      d="M59 17c0-7.732-6.268-14-14-14m14 42c0 7.732-6.268 14-14 14m-28 0C9.268 59 3 52.732 3 45m0-28C3 9.268 9.268 3 17 3"
    />
    <g filter="url(#e)" opacity={0.54}>
      <path
        stroke="#fff"
        d="M59 17c0-7.732-6.268-14-14-14m14 42c0 7.732-6.268 14-14 14m-28 0C9.268 59 3 52.732 3 45m0-28C3 9.268 9.268 3 17 3"
      />
    </g>
    <defs>
      <filter
        id="a"
        width={48}
        height={48}
        x={7}
        y={7}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset />
        <feGaussianBlur stdDeviation={7} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0" />
        <feBlend in2="shape" result="effect1_innerShadow_274_51736" />
      </filter>
      <filter
        id="c"
        width={31.93}
        height={29}
        x={15.035}
        y={16}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_274_51736"
          stdDeviation={2}
        />
      </filter>
      <filter
        id="e"
        width={61}
        height={61}
        x={0.5}
        y={0.5}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_274_51736"
          stdDeviation={1}
        />
      </filter>
      <linearGradient
        id="b"
        x1={55}
        x2={7}
        y1={55}
        y2={55}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F1A83B" />
        <stop offset={0.5} stopColor="#D95BB6" />
        <stop offset={1} stopColor="#7428F0" />
      </linearGradient>
      <linearGradient
        id="d"
        x1={55}
        x2={7}
        y1={55}
        y2={55}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F1A83B" />
        <stop offset={0.5} stopColor="#D95BB6" />
        <stop offset={1} stopColor="#7428F0" />
      </linearGradient>
    </defs>
  </svg>
);
