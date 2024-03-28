import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { deepPurple } from "@mui/material/colors";

const darkTheme = createTheme({
    palette: {
        primary: deepPurple,
        mode: "dark",
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div className="App">test</div>
        </ThemeProvider>
    );
}

export default App;
