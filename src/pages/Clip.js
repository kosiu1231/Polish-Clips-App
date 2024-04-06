import {
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useGetFetch from "../Hooks/useGetFetch";
import CommentList from "../components/CommentList";

function Clip() {
    const { id } = useParams();
    const [url] = useState(`https://localhost:7064/api/clip/${id}`);
    const { data: clip, isLoading, error } = useGetFetch(url);

    return (
        <Box>
            {isLoading && <div>Ładowanie...</div>}
            {error && <Typography>Brak danych</Typography>}
            {clip && !isLoading && !error && (
                <Grid container spacing={2} sx={{ height: "90vh" }}>
                    <Grid
                        item
                        md={12}
                        xl={8}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <iframe
                            src={`${clip.data.embedUrl}&parent=localhost`}
                            title="clip"
                            height="540px"
                            width="960px"
                            allowFullScreen
                        ></iframe>
                    </Grid>
                    <Grid item md={12} xl={4}>
                        <Card sx={{ p: 1, mb: 1 }}>
                            <CardContent>
                                <Box>
                                    <Typography noWrap variant="h6">
                                        {clip.data.title}
                                    </Typography>
                                    <Divider
                                        sx={{ my: 1 }}
                                        orientation="horizontal"
                                    />
                                    <Typography variant="subtitle1">
                                        Dodany przez:{" "}
                                        {clip.data.user || "AutoMod"}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Streamer: {clip.data.streamerName}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Kategoria: {clip.data.game.name}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Stworzony:{" "}
                                        {new Date(
                                            clip.data.createdAt
                                        ).toLocaleString()}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                        {clip && (
                            <CommentList
                                comments={clip.data.comments}
                                commentId={id}
                            />
                        )}
                    </Grid>
                </Grid>
            )}
        </Box>
    );
}

export default Clip;
