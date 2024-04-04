import {
    AccountCircleOutlined,
    EmailOutlined,
    PasswordOutlined,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    Container,
    InputAdornment,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import React from "react";
import { useRef, useState, useEffect } from "react";

const USERNAME_REGEX = /[a-zA-Z0-9-_]{4,32}/;
// at least one small letter, big letter, digit and special symbol
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,32}/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

function Register() {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    const [url] = useState(`https://localhost:7064/auth/register`);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidName(USERNAME_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPwd(PASSWORD_REGEX.test(pwd));
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd, email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USERNAME_REGEX.test(user);
        const v2 = PASSWORD_REGEX.test(pwd);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Nieprawidłowe dane.");
            return;
        }

        const userInfo = {
            email: email,
            username: user,
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

            navigate("/weryfikacja");
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
                    Zarejestruj się
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ py: 1, px: 3 }}
                >
                    <TextField
                        type="text"
                        id="username"
                        label="Nazwa użytkownika"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        fullWidth
                        sx={{ my: 1 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <AccountCircleOutlined
                                        color={validName ? "success" : "error"}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    ></TextField>

                    <Typography
                        variant="p"
                        m={0.5}
                        id="uidnote"
                        display={
                            userFocus && user && !validName ? "block" : "none"
                        }
                    >
                        Dozwolone są wielkie litery, małe litery oraz cyfry.
                        <br />
                        Musi zawierać od 4 do 32 znaków.
                    </Typography>

                    <TextField
                        type="text"
                        id="email"
                        label="E-mail"
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="emailnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        fullWidth
                        sx={{ my: 1 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <EmailOutlined
                                        color={validEmail ? "success" : "error"}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    ></TextField>

                    <Typography
                        variant="p"
                        m={0.5}
                        id="emailnote"
                        display={
                            emailFocus && email && !validEmail
                                ? "block"
                                : "none"
                        }
                    >
                        Wprowadź poprawny adres e-mail.
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
                            !validName ||
                            !validPwd ||
                            !validEmail ||
                            !validMatch
                                ? true
                                : false
                        }
                    >
                        Zarejestruj się
                    </Button>
                    <Typography variant="subtitle1" fontSize={12}>
                        Posiadasz konto?{" "}
                        <Link
                            sx={{ color: "white" }}
                            component={RouterLink}
                            to="/logowanie"
                        >
                            Zaloguj się
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </Container>
    );
}

export default Register;
