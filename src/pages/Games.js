import React, { useState } from "react";
import useGetFetch from "../Hooks/useGetFetch";
import {
    Card,
    CardMedia,
    Grid,
    Link,
    Typography,
    Box,
    TextField,
    Button,
    ButtonGroup,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Undo } from "@mui/icons-material";

function Games() {
    const [url, setUrl] = useState(
        "https://polish-clips.azurewebsites.net/api/games"
    );
    const [gameName, setGameName] = useState("");
    const { data: games, isLoading, error } = useGetFetch(url);

    return (
        <Box>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                pb={1}
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    setUrl(
                        `https://polish-clips.azurewebsites.net/api/games?Name=${gameName}`
                    );
                }}
            >
                <TextField
                    autoComplete="off"
                    type="text"
                    label="Nazwa gry"
                    sx={{ mr: 1 }}
                    value={gameName}
                    onChange={(e) => {
                        setGameName(e.target.value);
                    }}
                ></TextField>
                <ButtonGroup>
                    <Button
                        type="submit"
                        variant="outlined"
                        sx={{
                            color: "white",
                            borderColor: "white",
                            py: 1.3,
                        }}
                    >
                        Wyszukaj
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<Undo />}
                        sx={{ color: "white", borderColor: "white", py: 1.3 }}
                        onClick={() => {
                            setUrl(
                                "https://polish-clips.azurewebsites.net/api/games"
                            );
                            setGameName("");
                        }}
                    >
                        Zrestartuj
                    </Button>
                </ButtonGroup>
            </Box>
            <Grid
                container
                maxWidth={"xl"}
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    margin: "0 auto",
                }}
            >
                {isLoading && <div>Ładowanie...</div>}
                {error && <Typography>Brak danych</Typography>}
                {games &&
                    !isLoading &&
                    !error &&
                    games.data.map((game) => (
                        <Grid item xxs={6} xs={4} md={3} lg={2} key={game.id}>
                            <Card sx={{ m: 1, p: 1 }}>
                                <Link
                                    sx={{
                                        textDecoration: "none",
                                        color: "white",
                                    }}
                                    component={RouterLink}
                                    to={{
                                        pathname: "/",
                                        search: `?gameName=${game.name}`,
                                    }}
                                >
                                    <CardMedia
                                        position="relative"
                                        component="img"
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                        }}
                                        image={game.artUrl
                                            .replace("{width}", "285")
                                            .replace("{height}", "380")}
                                        alt="Thumbnail"
                                    />
                                    <Typography
                                        noWrap
                                        sx={{ fontSize: 12, pt: 1 }}
                                        variant="subtitle2"
                                    >
                                        {game.name} (ID: {game.id})
                                    </Typography>
                                </Link>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </Box>
    );
}

export default Games;
