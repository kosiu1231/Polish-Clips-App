import { MovieOutlined } from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    Container,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useRef, useState, useEffect } from "react";
import useAuth from "../Hooks/useAuth";

const CLIPID_REGEX = /^[a-zA-Z]+-[a-zA-Z0-9_-]+$/;

function Create() {
    const clipIdRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const { auth } = useAuth();

    const [clipId, setClipId] = useState("");
    const [validClipId, setValidClipId] = useState(false);
    const [clipIdFocus, setClipIdFocus] = useState(false);

    const [title, setTitle] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const [url, setUrl] = useState("");

    useEffect(() => {
        clipIdRef.current.focus();
    }, []);

    useEffect(() => {
        setValidClipId(CLIPID_REGEX.test(clipId));
        setUrl(`https://polish-clips.azurewebsites.net/api/clip`);
        setErrMsg("");
        // eslint-disable-next-line
    }, [clipId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!CLIPID_REGEX.test(clipId)) {
            setErrMsg("Nieprawidłowe dane.");
            return;
        }

        const clipInfo = {
            twitchId: clipId,
            title: title,
        };

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    accept: "text/plain",
                    "Content-Type": "application/json",
                    Authorization: `bearer ${auth.accessToken}`,
                },
                body: JSON.stringify(clipInfo),
            });

            const data = await res.json();

            if (!res.ok) {
                throw Error(data.message);
            }

            navigate(`/klip/${data.data.id}`);
        } catch (err) {
            setErrMsg(err.message);
            errRef.current.focus();
        }
    };

    return (
        <Container maxWidth="sm">
            <Card
                sx={{
                    mt: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: 4,
                }}
            >
                <Typography variant="h4" component="h3" sx={{ pt: 2 }}>
                    Dodaj klip
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ py: 1, px: 3, width: "100%" }}
                >
                    <TextField
                        type="text"
                        id="twitchId"
                        label="ID klipa"
                        ref={clipIdRef}
                        autoComplete="off"
                        onChange={(e) => setClipId(e.target.value)}
                        onFocus={() => setClipIdFocus(true)}
                        onBlur={() => setClipIdFocus(false)}
                        fullWidth
                        sx={{ my: 1 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <MovieOutlined
                                        color={
                                            validClipId ? "success" : "error"
                                        }
                                    />
                                </InputAdornment>
                            ),
                        }}
                    ></TextField>

                    <Typography
                        variant="p"
                        m={0.5}
                        id="clipnote"
                        display={
                            clipIdFocus && clipId && !validClipId
                                ? "block"
                                : "none"
                        }
                    >
                        Wprowadź poprawny identyfikator w formacie:
                        <br />
                        "DeterminedBreakableSheepGrammarKing-NbXM0EnraEMgYh6U"
                    </Typography>

                    <TextField
                        type="text"
                        id="title"
                        label="Nazwa klipu(opcjonalnie)"
                        onChange={(e) => setTitle(e.target.value)}
                        fullWidth
                        sx={{ my: 1 }}
                    ></TextField>

                    <Typography
                        variant="p"
                        m={0.5}
                        ref={errRef}
                        display={errMsg ? "block" : "none"}
                        aria-live="assertive"
                    >
                        {errMsg}
                    </Typography>

                    <Button
                        type="submit"
                        fullWidth
                        sx={{ mt: 1, mb: 1, py: 1 }}
                        variant="contained"
                        disabled={!validClipId ? true : false}
                    >
                        Dodaj klip
                    </Button>
                </Box>
            </Card>
        </Container>
    );
}

export default Create;
