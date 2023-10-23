import { SVGProps } from "react";
import { CustomisableSvg } from "./logos/styles";

const LeftArrow = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <CustomisableSvg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={17}
    viewBox="0 0 33 32"
    {...props}
  >
    <path
      fill="currentColor"
      d="M28.073 16a1 1 0 0 1-1 1H7.486l7.294 7.293a1 1 0 0 1-1.415 1.415l-9-9a1 1 0 0 1 0-1.415l9-9a1 1 0 1 1 1.415 1.415L7.486 15h19.587a1 1 0 0 1 1 1Z"
    />
  </CustomisableSvg>
);
export default LeftArrow;
