import { SVGProps } from "react";
import { useTheme } from "styled-components";

const TwitterIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => {
  const theme = useTheme();
  const { fill = theme?.purple[200], ...otherProps } = props;
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill={fill} xmlns="http://www.w3.org/2000/svg" {...otherProps}>
      <path
        d="M15.171 1.875H17.9277L11.9052 8.75833L18.9902 18.125H13.4419L9.09686 12.4442L4.1252 18.125H1.36686L7.80853 10.7625L1.0127 1.875H6.70019L10.6277 7.0675L15.1694 1.875H15.171ZM14.2035 16.475H15.731L5.87103 3.43833H4.23186L14.2035 16.475Z"
      />

    </svg>
  );
};

export default TwitterIcon;


