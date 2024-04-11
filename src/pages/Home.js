import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ClipsList from "../components/ClipsList";
import { Undo } from "@mui/icons-material";
import {
    Box,
    Grid,
    TextField,
    Typography,
    Button,
    ButtonGroup,
    FormControlLabel,
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

function Home() {
    const [searchParams] = useSearchParams();
    const gameName = searchParams.get("gameName");

    const [query, setQuery] = useState({
        Name: "",
        Game: gameName || "",
        Broadcaster: "",
        StartDate: "",
        EndDate: "",
        SortBy: "CreatedAt",
        IsDescending: true,
    });
    const [url, setUrl] = useState(
        gameName
            ? `https://polish-clips.azurewebsites.net/api/clips?SortBy=CreatedAt&IsDescending=true&Game=${gameName}`
            : "https://polish-clips.azurewebsites.net/api/clips?SortBy=CreatedAt&IsDescending=true"
    );
    const [resetButtonClicked, setResetButtonClicked] = useState(false);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const compRef = useRef();

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

    const updateQueryField = (field, value) => {
        setQuery((prevQuery) => ({
            ...prevQuery,
            [field]: value,
        }));
    };

    const constructURL = () => {
        const {
            Name,
            Game,
            Broadcaster,
            StartDate,
            EndDate,
            SortBy,
            IsDescending,
        } = query;
        const baseUrl = "https://polish-clips.azurewebsites.net/api/clips";

        const queryParams = new URLSearchParams({
            Name,
            Game,
            Broadcaster,
            StartDate,
            EndDate,
            SortBy,
            IsDescending: IsDescending ? "true" : "false",
        });

        setPage(1);
        scrollToRef(compRef);
        setUrl(`${baseUrl}?${queryParams.toString()}`);
    };

    const handleReset = () => {
        setQuery(() => ({
            Name: "",
            Game: "",
            Broadcaster: "",
            StartDate: "",
            EndDate: "",
            SortBy: "CreatedAt",
            IsDescending: true,
        }));
        setPage(1);
        scrollToRef(compRef);
        navigate("/");
        setResetButtonClicked(true);
    };

    useEffect(() => {
        if (resetButtonClicked) {
            constructURL();
            setResetButtonClicked(false);
        }
        // eslint-disable-next-line
    }, [resetButtonClicked]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} xl={3}>
                <Typography sx={{ mb: 2 }} variant="h5">
                    Filtrowanie
                </Typography>

                <Box
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        constructURL();
                    }}
                >
                    <TextField
                        autoComplete="off"
                        type="text"
                        label="Nazwa klipu"
                        fullWidth
                        sx={{ mr: 1, my: 1 }}
                        value={query.Name}
                        onChange={(e) => {
                            const newName = e.target.value;
                            updateQueryField("Name", newName);
                        }}
                    ></TextField>
                    <TextField
                        autoComplete="off"
                        type="text"
                        label="Nazwa gry"
                        fullWidth
                        sx={{ mr: 1, my: 1 }}
                        value={query.Game}
                        onChange={(e) => {
                            const newGame = e.target.value;
                            updateQueryField("Game", newGame);
                        }}
                    ></TextField>
                    <TextField
                        autoComplete="off"
                        type="text"
                        label="Streamer"
                        fullWidth
                        sx={{ mr: 1, my: 1 }}
                        value={query.Broadcaster}
                        onChange={(e) => {
                            const newBroadcaster = e.target.value;
                            updateQueryField("Broadcaster", newBroadcaster);
                        }}
                    ></TextField>
                    <Box sx={{ my: 1, width: 1 }} display={"flex"}>
                        <FormControl fullWidth>
                            <InputLabel id="sort-by-label">
                                Sortuj po
                            </InputLabel>
                            <Select
                                labelId="sort-by-label"
                                id="sort-by-select"
                                defaultValue={query.SortBy}
                                value={query.SortBy}
                                label="Sortuj po"
                                onChange={(e) => {
                                    updateQueryField("SortBy", e.target.value);
                                }}
                            >
                                <MenuItem value={"CreatedAt"}>
                                    Data stworzenia
                                </MenuItem>
                                <MenuItem value={"LikeAmount"}>
                                    Ilość polubień
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    defaultChecked
                                    value={query.IsDescending}
                                    onChange={(e) => {
                                        updateQueryField(
                                            "IsDescending",
                                            e.target.checked
                                        );
                                    }}
                                />
                            }
                            label="Czy malejąco?"
                            sx={{ ml: 1 }}
                        />
                    </Box>
                    <ButtonGroup fullWidth sx={{ pt: 1 }}>
                        <Button
                            type="submit"
                            variant="outlined"
                            sx={{
                                color: "white",
                                borderColor: "white",
                            }}
                        >
                            Wyszukaj
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<Undo />}
                            sx={{
                                alignSelf: "right",
                                color: "white",
                                borderColor: "white",
                            }}
                            onClick={handleReset}
                        >
                            Zrestartuj
                        </Button>
                    </ButtonGroup>
                </Box>
            </Grid>
            <Grid item xs={12} xl={9}>
                <ClipsList
                    url={url}
                    page={page}
                    compRef={compRef}
                    handlePages={handlePages}
                />
            </Grid>
        </Grid>
    );
}

export default Home;
