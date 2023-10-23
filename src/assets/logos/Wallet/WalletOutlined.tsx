import { SVGProps } from "react";
import { CustomisableSvg } from "../styles";

const WalletOutlinedLogo = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <CustomisableSvg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={18}
    fill="none"
    color="highlight"
    viewBox="0 0 19 18"
    {...props}
  >
    <path
      fill="currentColor"
      d="M17.25 3.75h-15a.75.75 0 0 1 0-1.5H15a.75.75 0 1 0 0-1.5H2.25A2.25 2.25 0 0 0 0 3v12a2.25 2.25 0 0 0 2.25 2.25h15a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5Zm0 12h-15A.75.75 0 0 1 1.5 15V5.122c.24.085.494.128.75.128h15v10.5Zm-4.5-5.625a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
    />
  </CustomisableSvg>
);
export default WalletOutlinedLogo;
