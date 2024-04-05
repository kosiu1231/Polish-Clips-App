import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    Link,
    Stack,
} from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

function Navbar() {
    return (
        <AppBar sx={{ position: "fixed" }}>
            <Toolbar>
                <Typography sx={{ color: "white" }} variant="h5" component="h1">
                    <Link
                        sx={{ textDecoration: "none", color: "white" }}
                        component={RouterLink}
                        to="/"
                    >
                        Polish Clips
                    </Link>
                </Typography>
                <Stack
                    justifyContent="center"
                    direction="row"
                    sx={{ flexGrow: 1 }}
                    spacing={3}
                >
                    <Link
                        sx={{
                            color: "white",
                            textDecoration: "none",
                            mr: 2,
                        }}
                        component={RouterLink}
                        to="/gry"
                    >
                        Gry
                    </Link>
                    <Link
                        sx={{
                            color: "white",
                            textDecoration: "none",
                            mr: 2,
                        }}
                        component={RouterLink}
                        to="/"
                    >
                        CosTuBedzie
                    </Link>
                </Stack>
                <Link
                    sx={{
                        color: "white",
                        textDecoration: "none",
                        mr: 2,
                    }}
                    component={RouterLink}
                    to="/dodaj"
                >
                    Dodaj klip
                </Link>
                <Button
                    sx={{
                        color: "white",
                        textDecoration: "none",
                        borderColor: "white",
                        "&:hover": { borderColor: "white" },
                    }}
                    variant="outlined"
                    component={RouterLink}
                    to="/logowanie"
                >
                    Zaloguj się
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
