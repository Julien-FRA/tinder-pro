import { Button, Container, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function App() {
  const theme = useTheme();
  return (
    <Container>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Stack spacing={2} direction="column" sx={{ my: 4 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.extraColors.blue.main,
            color: "#fff",
            "&:hover": { backgroundColor: "#032d4d" },
          }}
        >
          Blue
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.extraColors.white.main,
            color: "#05386b",
            "&:hover": { backgroundColor: "#dbead7" },
          }}
        >
          White
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.extraColors.darkGrenn.main,
            color: "#fff",
            "&:hover": { backgroundColor: "#27695a" },
          }}
        >
          Dark Green
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.extraColors.green.main,
            color: "#fff",
            "&:hover": { backgroundColor: "#3cae6e" },
          }}
        >
          Green
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: theme.palette.extraColors.lightGreen.main,
            color: "#05386b",
            "&:hover": { backgroundColor: "#6fd6a7" },
          }}
        >
          Light Green
        </Button>
      </Stack>
    </Container>
  );
}

export default App;
