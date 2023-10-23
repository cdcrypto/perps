import { CustomisableSvg } from "@components/Button/styles";
import { SVGProps } from "react";

const BuyLogo = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <CustomisableSvg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={18}
    fill="none"
    color="positive"
    {...props}
  >
    <path
      fill="currentColor"
      d="M28.073 1v8a1 1 0 1 1-2 0V3.414L15.78 13.707a1.001 1.001 0 0 1-1.415 0l-4.292-4.293-8.293 8.293a1 1 0 0 1-1.415-1.415l9-9a1 1 0 0 1 1.415 0l4.293 4.294L24.659 2h-5.586a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1Z"
    />
  </CustomisableSvg>
);
export default BuyLogo;
