import { EmailOutlined } from "@mui/icons-material";
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

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

function ForgotPassword() {
    const emailRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    const [url, setUrl] = useState("");

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
        setUrl(
            `https://polish-clips.azurewebsites.net/auth/forgot-password?email=` +
                email
        );
        setErrMsg("");
        // eslint-disable-next-line
    }, [email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!EMAIL_REGEX.test(email)) {
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

            navigate("/zmianahasla");
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
                    Przypomnij hasło
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ py: 1, px: 3, width: "100%" }}
                >
                    <TextField
                        type="text"
                        id="email"
                        label="E-mail"
                        ref={emailRef}
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
                        disabled={!validEmail ? true : false}
                    >
                        Zweryfikuj
                    </Button>
                </Box>
            </Card>
        </Container>
    );
}

export default ForgotPassword;
