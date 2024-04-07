import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    Link,
    Stack,
} from "@mui/material";
import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import AuthContext from "../Contexts/AuthProvider";

function Navbar() {
    const { Logout, isLogged, auth } = useContext(AuthContext);

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
                    {isLogged && auth.role === "Admin" && (
                        <Link
                            sx={{
                                color: "white",
                                textDecoration: "none",
                                mr: 2,
                            }}
                            component={RouterLink}
                            to="/admin"
                        >
                            Panel Administratora
                        </Link>
                    )}
                </Stack>
                {isLogged ? (
                    <Button
                        sx={{
                            color: "white",
                            textDecoration: "none",
                            borderColor: "white",
                            "&:hover": { borderColor: "white" },
                        }}
                        variant="outlined"
                        onClick={() => {
                            Logout();
                        }}
                    >
                        Wyloguj się
                    </Button>
                ) : (
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
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
