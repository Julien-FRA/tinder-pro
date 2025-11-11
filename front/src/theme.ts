import { createTheme } from "@mui/material/styles";

// Extension des types pour la palette custom
declare module "@mui/material/styles" {
  interface Palette {
    extraColors: {
      blue: {
        main: string;
      };
      white: {
        main: string;
      };
      darkGrenn: {
        main: string;
      };
      green: {
        main: string;
      };
      lightGreen: {
        main: string;
      };
    };
  }
  interface PaletteOptions {
    extraColors?: {
      blue: {
        main: string;
      };
      white: {
        main: string;
      };
      darkGrenn: {
        main: string;
      };
      green: {
        main: string;
      };
      lightGreen: {
        main: string;
      };
    };
  }
}

const theme = createTheme({
  palette: {
    background: {
      default: "#f4f6fa",
    },
    extraColors: {
      blue: {
        main: "#05386b",
      },
      white: {
        main: "#edf5e1",
      },
      darkGrenn: {
        main: "#379683",
      },
      green: {
        main: "#5cdb95",
      },
      lightGreen: {
        main: "#8ee4af",
      },
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
