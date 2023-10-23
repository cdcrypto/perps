import { SVGProps } from "react";

const EthereumIcon = (
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
    <path
      fill="#627EEA"
      d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z"
    />
    <path
      fill="#F8F1FF"
      d="M12.373 3v6.652l5.623 2.513L12.374 3Z"
      opacity={0.6}
    />
    <path fill="#F8F1FF" d="M12.373 3 6.75 12.165l5.623-2.512V3Z" />
    <path
      fill="#F8F1FF"
      d="M12.373 16.476v4.52L18 13.212l-5.627 3.264Z"
      opacity={0.6}
    />
    <path fill="#F8F1FF" d="M12.373 20.996v-4.52L6.75 13.211l5.623 7.784Z" />
    <path
      fill="#F8F1FF"
      d="m12.373 15.43 5.623-3.265-5.622-2.511v5.776Z"
      opacity={0.2}
    />
    <path
      fill="#F8F1FF"
      d="m6.75 12.165 5.623 3.265V9.654L6.75 12.165Z"
      opacity={0.6}
    />
  </svg>
);
export default EthereumIcon;
