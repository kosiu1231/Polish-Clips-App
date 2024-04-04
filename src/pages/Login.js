import {
    Box,
    Button,
    Card,
    Container,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthProvider";

function Login() {
    const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const [url] = useState(`https://localhost:7064/auth/login`);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [email, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userInfo = {
            email: email,
            password: pwd,
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

            const accessToken = data.data.token;
            const role = data.data.user.role;
            const username = data.data.user.username;
            setAuth({ email, username, pwd, role, accessToken });
            navigate("/");
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
                    Zaloguj się
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ py: 1, px: 3, width: "100%" }}
                >
                    <TextField
                        type="text"
                        id="email"
                        label="E-mail"
                        ref={emailRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        sx={{ my: 1 }}
                    ></TextField>

                    <TextField
                        type="password"
                        id="pwd"
                        label="Hasło"
                        onChange={(e) => setPwd(e.target.value)}
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
                        disabled={!email || !pwd ? true : false}
                    >
                        Zaloguj się
                    </Button>

                    <Typography variant="subtitle1" fontSize={12}>
                        Nie posiadasz konta?{" "}
                        <Link
                            sx={{ color: "white" }}
                            component={RouterLink}
                            to="/rejestracja"
                        >
                            Zarejestruj się
                        </Link>
                    </Typography>

                    <Typography variant="subtitle1" fontSize={12}>
                        Nie pamiętasz hasła?{" "}
                        <Link
                            sx={{ color: "white" }}
                            component={RouterLink}
                            to="/przypomnijhaslo"
                        >
                            Przypomnij
                        </Link>
                    </Typography>
                </Box>
            </Card>
        </Container>
    );
}

export default Login;
