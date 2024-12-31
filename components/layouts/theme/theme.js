import { createTheme } from "@mui/material/styles";
import components from "./ComponentOverRide";
import shadows from "./Shadows";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#E88C87",
      light: "#e8918857",
      dark: "#05b2bd",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#fb9678",
      light: "#fcf1ed",
      dark: "#e67e5f",
      contrastText: "#ffffff",
    },
    success: {
      main: "#00c292",

      dark: "#00964b",
      contrastText: "#ffffff",
    },
    danger: {
      main: "#e46a76",
      light: "#fdf3f5",
    },
    info: {
      oldmain: "#0bb2fb",
      old_main: "#539BFF",
      main: "rgb(37 99 235)",
      light: "rgb(191 219 254)",
      old_light: "#a7e3f4",
    },
    error: {
      old_main: "#e46a76",
      main1: "#EF2626",
      main: "#EF4444",
      light: "#FECACA",
      dark: "#e45a68",
      contrastText: "#EF4444",
    },    
    warning: {
      main: "#fec90f",
      dark: "#dcb014",
      contrastText: "#ffffff",
    },
    text: {
      secondary: "#777e89",
      danger: "#fc4b6c",
    },
    grey: {
      A100: "#ecf0f2",
      A200: "#99abb4",
      A400: "#767e89",
      A700: "#e6f4ff",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "rgba(0, 0, 0, 0.03)",
    },
    background: {
      default: "#fafbfb",
    },
  },
  mixins: {
    toolbar: {
      color: "#949db2",
      "@media(min-width:1280px)": {
        minHeight: "64px",
        padding: "0 30px",
      },
      "@media(max-width:1280px)": {
        minHeight: "64px",
      },
    },
  },
  components,
  shadows,
});

export default theme;
