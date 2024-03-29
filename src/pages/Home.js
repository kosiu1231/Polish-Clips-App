import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import useGetFetch from "../Hooks/useGetFetch";
import { useState } from "react";

function Home() {
    const [query, setQuery] = useState([]);
    const [url, setUrl] = useState("https://localhost:7064/api/clips");

    const { data: clips, isLoading, error } = useGetFetch(url);

    return (
        <Box>
            {error && <Typography>Brak danych</Typography>}
            {isLoading ? (
                <p>Loading...</p>
            ) : clips.data.length > 0 ? (
                clips.data.map((clip) => (
                    <Card
                        key={clip.id}
                        sx={{ bgColor: "red", m: 1, p: 1, display: "flex" }}
                    >
                        <CardMedia
                            component="img"
                            sx={{ width: 480, minWidth: 160 }}
                            image={clip.thumbnailUrl}
                            alt="Thumbnail"
                        />
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6">{clip.title}</Typography>
                            <Typography variant="subtitle1">
                                User: {clip.user || "AutoMod"}
                            </Typography>
                            <Typography variant="subtitle1">
                                Streamer: {clip.streamerName}
                            </Typography>
                            <Typography variant="subtitle1">
                                Likes: {clip.likeAmount}
                            </Typography>
                            <Typography variant="subtitle1">
                                Game: {clip.game.name}
                            </Typography>
                            <Typography variant="subtitle1">
                                Duration: {clip.duration} seconds
                            </Typography>
                            <Typography variant="subtitle1">
                                Creation Date:{" "}
                                {new Date(clip.createdAt).toLocaleString()}
                            </Typography>
                            <Typography variant="subtitle1">
                                {clip.commentAmount}{" "}
                                {clip.commentAmount === 1
                                    ? "comment"
                                    : "comments"}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <p>Brak danych</p>
            )}
        </Box>
    );
}

export default Home;
