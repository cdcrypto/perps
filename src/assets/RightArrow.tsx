import { SVGProps } from "react";
import { CustomisableSvg } from "./logos/styles";

const RightArrow = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => {
  const { fill } = props;
  return (
    <CustomisableSvg
      xmlns="http://www.w3.org/2000/svg"
      width={33}
      height={32}
      viewBox="0 0 33 32"
      color="currentColor"
      {...props}
    >
      <path
        fill={fill || "currentColor"}
        d="m27.78 16.708-9 9a1 1 0 0 1-1.415-1.415L24.66 17H5.073a1 1 0 0 1 0-2h19.586l-7.294-7.292a1 1 0 1 1 1.415-1.415l9 9a1 1 0 0 1 0 1.415Z"
      />
    </CustomisableSvg>
  );
};
export default RightArrow;
