import { VpnKeyOutlined } from "@mui/icons-material";
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

const TOKEN_REGEX = /^[A-Z0-9]{48}$/;

function VerifyEmail() {
    const tokenRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [token, setToken] = useState("");
    const [validToken, setValidToken] = useState(false);
    const [tokenFocus, setTokenFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    const [url, setUrl] = useState("");

    useEffect(() => {
        tokenRef.current.focus();
    }, []);

    useEffect(() => {
        setValidToken(TOKEN_REGEX.test(token));
        setUrl(`https://localhost:7064/auth/verify?token=` + token);
        setErrMsg("");
        // eslint-disable-next-line
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!TOKEN_REGEX.test(token)) {
            setErrMsg("Nieprawidłowe dane.");
            return;
        }

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    accept: "text/plain",
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw Error(data.message);
            }

            navigate("/logowanie");
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
                    Weryfikacja
                </Typography>

                <Typography variant="p" mt={0.5}>
                    Sprawdź skrzynkę pocztową.
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ py: 1, px: 3, width: "100%" }}
                >
                    <TextField
                        type="text"
                        id="token"
                        label="Token"
                        ref={tokenRef}
                        autoComplete="off"
                        onChange={(e) => setToken(e.target.value)}
                        aria-invalid={validToken ? "false" : "true"}
                        aria-describedby="tokennote"
                        onFocus={() => setTokenFocus(true)}
                        onBlur={() => setTokenFocus(false)}
                        fullWidth
                        sx={{ my: 1 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <VpnKeyOutlined
                                        color={validToken ? "success" : "error"}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    ></TextField>

                    <Typography
                        variant="p"
                        m={0.5}
                        id="tokennote"
                        display={tokenFocus && !validToken ? "block" : "none"}
                    >
                        Wprowadź poprawny token o długości 48 znaków.
                    </Typography>

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
                        disabled={!validToken ? true : false}
                    >
                        Zweryfikuj
                    </Button>
                </Box>
            </Card>
        </Container>
    );
}

export default VerifyEmail;
