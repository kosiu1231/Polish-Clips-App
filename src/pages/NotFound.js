import { Button, Card, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <Container maxWidth="xs">
            <Card
                sx={{
                    mt: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    borderRadius: 4,
                }}
            >
                <Typography variant="h4" sx={{ pt: 2 }}>
                    Error 404
                </Typography>
                <br />
                <Typography variant="p">Strona nie istnieje.</Typography>
                <br />
                <Button variant="outlined" onClick={goBack} sx={{ mb: 2 }}>
                    Wróć
                </Button>
            </Card>
        </Container>
    );
}

export default NotFound;
