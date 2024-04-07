import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    Container,
    Divider,
    Typography,
    Link,
    Button,
} from "@mui/material";
import useAuth from "../Hooks/useAuth";
import { Link as RouterLink } from "react-router-dom";

function AdminPanel() {
    const { auth } = useAuth();
    const [reports, setReports] = useState([]);
    const [reviewedReports, setReviewedReports] = useState([]);
    const [notReviewedReports, setNotReviewedReports] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://localhost:7064/api/reports", {
                    method: "GET",
                    headers: {
                        accept: "text/plain",
                        Authorization: `bearer ${auth.accessToken}`,
                    },
                });

                const data = await res.json();

                if (!res.ok) {
                    throw Error(data.message);
                }

                setReports(data.data);
            } catch (err) {
                console.log(err.message);
                alert(err.message);
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setReviewedReports(reports.filter((report) => report.isReviewed));
        setNotReviewedReports(reports.filter((report) => !report.isReviewed));
    }, [reports]);

    const handleReview = async (id) => {
        try {
            const res = await fetch(
                `https://localhost:7064/api/report/${id}/review`,
                {
                    method: "POST",
                    headers: {
                        accept: "text/plain",
                        Authorization: `bearer ${auth.accessToken}`,
                    },
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw Error(data.message);
            }

            setReports(data.data);
        } catch (err) {
            console.log(err.message);
            alert(err.message);
        }
    };

    return (
        <Container maxWidth="md">
            {(reviewedReports.length > 0 || notReviewedReports.length > 0) && (
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
                        Zgłoszenia
                    </Typography>

                    <Typography
                        variant="h6"
                        component="h5"
                        sx={{ alignSelf: "start", px: 3 }}
                    >
                        Nierozpatrzone
                    </Typography>

                    <Box sx={{ py: 3, px: 3, width: "100%" }}>
                        {reports &&
                            notReviewedReports.map((report, i) => (
                                <Box key={report.id}>
                                    <Card
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            p: 1,
                                        }}
                                        elevation={1}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            flex={1}
                                        >
                                            Report(ID: {report.id}) dodany przez{" "}
                                            {report.user.username}:{" "}
                                            {report.text}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Link
                                                component={RouterLink}
                                                to={`/klip/${report.clip.id}`}
                                                sx={{
                                                    color: "white",
                                                    mr: 1,
                                                    ml: 1,
                                                }}
                                            >
                                                <Typography variant="subtitle1">
                                                    Klip(ID: {report.clip.id})
                                                </Typography>
                                            </Link>
                                        </Box>

                                        <Button
                                            onClick={() =>
                                                handleReview(report.id)
                                            }
                                            sx={{ color: "white", py: 0 }}
                                        >
                                            Rozpatrz
                                        </Button>
                                    </Card>
                                    {i !== notReviewedReports.length - 1 && (
                                        <Divider
                                            sx={{ my: 1 }}
                                            orientation="horizontal"
                                        />
                                    )}
                                </Box>
                            ))}
                    </Box>

                    <Typography
                        variant="h6"
                        component="h5"
                        sx={{ alignSelf: "start", px: 3 }}
                    >
                        Rozpatrzone
                    </Typography>

                    <Box sx={{ py: 3, px: 3, width: "100%" }}>
                        {reports &&
                            reviewedReports.map((report, i) => (
                                <Box key={report.id}>
                                    <Card
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            p: 1,
                                        }}
                                        elevation={1}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            flex={1}
                                        >
                                            Report(ID: {report.id}) dodany przez{" "}
                                            {report.user.username}:{" "}
                                            {report.text}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Link
                                                component={RouterLink}
                                                to={`/klip/${report.clip.id}`}
                                                sx={{
                                                    color: "white",
                                                    mr: 1,
                                                    ml: 1,
                                                }}
                                            >
                                                <Typography variant="subtitle1">
                                                    Klip(ID: {report.clip.id})
                                                </Typography>
                                            </Link>
                                        </Box>
                                    </Card>
                                    {i !== reviewedReports.length - 1 && (
                                        <Divider
                                            sx={{ my: 1 }}
                                            orientation="horizontal"
                                        />
                                    )}
                                </Box>
                            ))}
                    </Box>
                </Card>
            )}
        </Container>
    );
}

export default AdminPanel;
