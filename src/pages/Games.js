import React, { useEffect, useRef, useState } from "react";
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
    Pagination,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Undo } from "@mui/icons-material";

function Games() {
    const [gameName, setGameName] = useState("");
    const [page, setPage] = useState(1);
    const compRef = useRef();
    const [url, setUrl] = useState(
        `https://polish-clips.azurewebsites.net/api/games?PageNumber=${page}`
    );
    const { data: games, isLoading, error } = useGetFetch(url);

    const handlePages = (event, newPage) => {
        setPage(newPage);
        scrollToRef(compRef);
    };

    const scrollToRef = (ref) => {
        ref.current.scroll({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        setUrl(
            `https://polish-clips.azurewebsites.net/api/games?Name=${gameName}&PageNumber=${page}`
        );
        // eslint-disable-next-line
    }, [page]);

    return (
        <Box
            ref={compRef}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                pb={1}
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    setPage(1);
                    setUrl(
                        `https://polish-clips.azurewebsites.net/api/games?Name=${gameName}&PageNumber=${page}`
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
                            scrollToRef(compRef);
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
            {games.data && (
                <Pagination
                    count={Math.ceil(games.noOfElements / 12)}
                    page={page}
                    onChange={handlePages}
                    sx={{ my: 1 }}
                />
            )}
        </Box>
    );
}

export default Games;
