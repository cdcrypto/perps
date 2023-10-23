import { SVGProps } from "react";
import { CustomisableSvg } from "@components/Button/styles";

const WarningLogo = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <CustomisableSvg
    xmlns="http://www.w3.org/2000/svg"
    width={29}
    height={25}
    // fill="none"
    color="warning"
    {...props}
  >
    <path
      fill="currentColor"
      d="M27.673 20.511 16.74 1.528a3.095 3.095 0 0 0-5.337 0L.473 20.51a2.939 2.939 0 0 0 0 2.965A3.043 3.043 0 0 0 3.14 25h21.863a3.044 3.044 0 0 0 2.666-1.524 2.938 2.938 0 0 0 .003-2.965Zm-1.734 1.964a1.063 1.063 0 0 1-.935.525H3.14a1.064 1.064 0 0 1-.935-.525.949.949 0 0 1 0-.965L13.138 2.526a1.094 1.094 0 0 1 1.875 0l10.93 18.984a.949.949 0 0 1-.004.965ZM13.073 15v-5a1 1 0 0 1 2 0v5a1 1 0 1 1-2 0Zm2.5 4.5a1.499 1.499 0 1 1-2.998 0 1.499 1.499 0 0 1 2.998 0Z"
    />
  </CustomisableSvg>
);
export default WarningLogo;
