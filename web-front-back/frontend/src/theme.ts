import {
  createTheme,
  experimentalStyled as styled,
} from "@mui/material/styles";
import { green, purple, grey } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    background: {
      default: "red", // your desired color
    },
    primary: {
      main: grey[900],
    },
    secondary: {
      main: grey[600],
    },
  },
});
