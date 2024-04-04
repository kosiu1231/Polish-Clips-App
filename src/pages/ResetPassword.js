import { PasswordOutlined, VpnKeyOutlined } from "@mui/icons-material";
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

// at least one small letter, big letter, digit and special symbol
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,32}/;
const TOKEN_REGEX = /^[A-Z0-9]{48}$/;

function ResetPassword() {
    const tokenRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [token, setToken] = useState("");
    const [validToken, setValidToken] = useState(false);
    const [tokenFocus, setTokenFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    const [url] = useState(`https://localhost:7064/auth/reset-password`);

    useEffect(() => {
        tokenRef.current.focus();
    }, []);

    useEffect(() => {
        setValidToken(TOKEN_REGEX.test(token));
    }, [token]);

    useEffect(() => {
        setValidPwd(PASSWORD_REGEX.test(pwd));
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg("");
    }, [token, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = TOKEN_REGEX.test(token);
        const v2 = PASSWORD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Nieprawidłowe dane.");
            return;
        }

        const userInfo = {
            token: token,
            password: pwd,
            confirmPassword: matchPwd,
        };

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    accept: "text/plain",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo),
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
                    Zmiana hasła
                </Typography>

                <Typography variant="p" mt={0.5}>
                    Sprawdź skrzynkę pocztową.
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ py: 1, px: 3 }}
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

                    <TextField
                        type="password"
                        id="password"
                        label="Hasło"
                        onChange={(e) => setPwd(e.target.value)}
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        fullWidth
                        sx={{ my: 1 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <PasswordOutlined
                                        color={validPwd ? "success" : "error"}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    ></TextField>

                    <Typography
                        variant="p"
                        m={0.5}
                        id="pwdnote"
                        display={pwdFocus && !validPwd ? "block" : "none"}
                    >
                        Musi zawierać wielką literę, małą literę, cyfrę oraz
                        znak specjalny.
                        <br />
                        Dozwolone znaki specjalne: !, @, #, $, %.
                        <br />
                        Musi zawierać od 6 do 32 znaków.
                    </Typography>

                    <TextField
                        type="password"
                        id="confirm_pwd"
                        label="Potwierdź Hasło"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="matchnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        fullWidth
                        sx={{ my: 1 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <PasswordOutlined
                                        color={
                                            validMatch && matchPwd
                                                ? "success"
                                                : "error"
                                        }
                                    />
                                </InputAdornment>
                            ),
                        }}
                    ></TextField>

                    <Typography
                        variant="p"
                        m={0.5}
                        id="matchnote"
                        display={matchFocus && !validMatch ? "block" : "none"}
                    >
                        Musi mieć taką samą wartość jak hasło.
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
                        disabled={
                            !validToken || !validPwd || !validMatch
                                ? true
                                : false
                        }
                    >
                        Zmień hasło
                    </Button>
                </Box>
            </Card>
        </Container>
    );
}

export default ResetPassword;
