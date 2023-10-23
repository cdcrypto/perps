import { SVGProps } from "react";

const NegativeArrow = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={10}
    viewBox="0 0 12 12"
    fill="none"
    {...props}
  >
    <path
      fill="#D53162"
      d="M6 11.05a.745.745 0 0 1-.25-.041.578.578 0 0 1-.217-.142l-4.4-4.4a.649.649 0 0 1-.2-.475.65.65 0 0 1 .2-.475.64.64 0 0 1 .467-.2.64.64 0 0 1 .467.2l3.266 3.266V1.317c0-.19.064-.345.192-.467A.66.66 0 0 1 6 .667c.189 0 .347.064.475.192a.642.642 0 0 1 .192.474v7.45l3.266-3.266a.64.64 0 0 1 .467-.2.64.64 0 0 1 .467.2.65.65 0 0 1 .2.475.647.647 0 0 1-.2.475l-4.4 4.4a.59.59 0 0 1-.217.142.723.723 0 0 1-.25.041Z"
    />
  </svg>
);
export default NegativeArrow;
