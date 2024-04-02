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
    const loggedIn = false;

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
                        to="/games"
                    >
                        Games
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
                {loggedIn ? (
                    <Link
                        sx={{
                            color: "white",
                            textDecoration: "none",
                            mr: 2,
                        }}
                        component={RouterLink}
                        to="/create"
                    >
                        Add clip
                    </Link>
                ) : (
                    <Button
                        sx={{
                            color: "white",
                            borderColor: "white",
                            "&:hover": { borderColor: "white" },
                        }}
                        variant="outlined"
                    >
                        Sign in
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;