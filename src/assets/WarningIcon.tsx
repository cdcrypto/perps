import { SVGProps } from "react";
import { useTheme } from "styled-components";

const WarningIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => {
  const theme = useTheme();
  const { fill = theme?.typography.highlight } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={15}
      viewBox="0 0 18 15"
      fill={fill}
      {...props}
    >
      <path d="M1.27 15a.816.816 0 0 1-.708-.417.92.92 0 0 1-.115-.406.74.74 0 0 1 .115-.427L8.271.417a.819.819 0 0 1 .323-.313A.863.863 0 0 1 9 0c.139 0 .274.035.407.104.132.07.24.174.322.313l7.708 13.333a.752.752 0 0 1 .115.428.9.9 0 0 1-.115.405.814.814 0 0 1-.291.303.775.775 0 0 1-.417.114H1.271Zm1.438-1.667h12.584L9 2.5 2.708 13.333ZM9 12.5c.236 0 .434-.08.594-.24.16-.16.24-.358.24-.593a.807.807 0 0 0-.24-.595.803.803 0 0 0-.594-.239.807.807 0 0 0-.594.24.803.803 0 0 0-.24.594c0 .236.08.434.24.594.16.16.358.24.594.239ZM9 10c.236 0 .434-.08.594-.24.16-.16.24-.358.24-.593v-2.5a.807.807 0 0 0-.24-.595A.803.803 0 0 0 9 5.833a.807.807 0 0 0-.594.24.803.803 0 0 0-.24.594v2.5c0 .236.08.434.24.594.16.16.358.24.594.239Z" />
    </svg>
  );
};
export default WarningIcon;
