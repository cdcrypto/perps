import { SVGProps } from "react";
import { CustomisableSvg } from "@components/Button/styles";

const SellLogo = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <CustomisableSvg
    xmlns="http://www.w3.org/2000/svg"
    width={29}
    height={18}
    fill="none"
    color="negative"
    {...props}
  >
    <path
      fill="currentColor"
      d="M28.073 9v8a1 1 0 0 1-1 1h-8a1 1 0 0 1 0-2h5.586l-9.586-9.586-4.293 4.294a1 1 0 0 1-1.415 0l-9-9A1 1 0 0 1 1.78.293l8.293 8.293 4.292-4.293a1 1 0 0 1 1.415 0l10.293 10.293V9a1 1 0 0 1 2 0Z"
    />
  </CustomisableSvg>
);
export default SellLogo;
