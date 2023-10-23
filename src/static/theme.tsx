export type ZetaTheme = typeof theme;

export const theme = {
  background: {
    400: "#090012",
    300: "#140D22",
    200: "#1E132D",
    100: "#2D203E",
  },
  white: "#FFFFFF",
  grey: {
    900: "#10081A",
    800: "#241734",
    700: "#342646",
    600: "#443358",
    500: "#695482",
    400: "#8C6EAE",
    300: "#A68AC6",
    200: "#BCA4D7",
    100: "#ECDCFE",
  },
  gradient: {
    300: "radial-gradient(63.81% 130.98% at 94.4% -15.58%, #162B53 0%, #000E28 100%)",
    200: "linear-gradient(3.81deg, #9E08FA -3.28%, #F1C1B1 94.71%)",
    100: "linear-gradient(133.21deg, #FFC4B0 0%, #F8B7B5 12%, #E795C2 33%, #CB5FD8 61%, #A414F5 95%, #9E08FA 100%)",
  },
  typography: {
    highlight: "#F2E2FF",
    primary: "#D3BFEA",
    secondary: "#6A7DA1",
    tertiary: "#685086",
    long: "#43B88E",
    short: "#D43162",
    clickable: {
      enabled: "#7A4EB2",
      active: "#BD89FF",
      disabled: "#443358",
    },
    hyperlink: {
      enabled: "#AC8FFF",
      hover: "#B9A6FF",
      pressed: "#9069FF",
      visited: "#8872CA",
    },
  },
  signals: {
    info: "#2089EA",
    success: "#5AA96B",
    alert: "#34C642",
    warning: "#C69D34",
    caution: "#C66034",
    danger: "#C22F2F",
  },
  /* Primary & Secondary Buttons */
  violet: {
    400: "#1F023C",
    300: "#650FBA",
    200: "#7806EA",
    100: "#9039E7",
  },
  /* Tertiary Button */
  plum: {
    500: "#1D0F2C",
    400: "#271736",
    300: "#270D42",
    200: "#39244E",
    100: "#371F4F",
  },
  /* Buy Button */
  green: {
    400: "#042527",
    300: "#01514C",
    200: "#23956C",
    100: "#43B88E",
  },
  /* Sell Button */
  red: {
    400: "#310C27",
    300: "#5C0C2E",
    200: "#B62752",
    100: "#D43162",
  },
  /* Hyperlink */
  lilac: {
    400: "#8872CA",
    300: "#9069FF",
    200: "#AC8FFF",
    100: "#B9A6FF",
  },
  /* Navigation */
  purple: {
    200: "#7A4EB2",
    100: "#BD89FF",
  },
  radius: {
    island: "12px",
  },
  breakpoints: {
    sm: "1280px",
    md: "1440px",
    lg: "1728px",
  },
} as const;
