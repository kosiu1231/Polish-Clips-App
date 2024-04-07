import React, { useState } from "react";
import useGetFetch from "../Hooks/useGetFetch";
import {
    Card,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Link,
    Typography,
} from "@mui/material";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Link as RouterLink } from "react-router-dom";

function ClipsList() {
    const [url] = useState(
        "https://localhost:7064/api/clips?SortBy=CreatedAt&IsDescending=true"
    );
    const { data: clips, isLoading, error } = useGetFetch(url);

    return (
        <Grid container>
            {isLoading && <div>Ładowanie...</div>}
            {error && <Typography>Brak danych</Typography>}
            {clips &&
                !isLoading &&
                !error &&
                clips.data.map((clip) => (
                    <Grid item xs={12} sm={6} md={6} lg={4} key={clip.id}>
                        <Card sx={{ m: 1, p: 1 }}>
                            <Link
                                sx={{ textDecoration: "none", color: "white" }}
                                component={RouterLink}
                                to={`/klip/${clip.id}`}
                            >
                                <CardMedia
                                    position="relative"
                                    component="img"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    image={clip.thumbnailUrl}
                                    alt="Thumbnail"
                                />
                                <CardContent>
                                    <Typography noWrap variant="h6">
                                        {clip.title}
                                    </Typography>
                                    <Divider
                                        sx={{ my: 1 }}
                                        orientation="horizontal"
                                    />
                                    <Typography variant="subtitle1">
                                        Dodany przez:{" "}
                                        {clip.user && clip.user.username
                                            ? clip.user.username
                                            : "AutoMod"}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Streamer: {clip.streamerName}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Kategoria: {clip.game.name}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        Stworzony:{" "}
                                        {new Date(
                                            clip.createdAt
                                        ).toLocaleString()}
                                    </Typography>
                                    <Typography variant="subtitle1" mt={1}>
                                        <InsertCommentOutlinedIcon
                                            sx={{ fontSize: 20 }}
                                        />{" "}
                                        {clip.comments.length}
                                        <ThumbUpOutlinedIcon
                                            sx={{ fontSize: 20, ml: 3 }}
                                        />{" "}
                                        {clip.likeAmount}
                                    </Typography>
                                </CardContent>
                            </Link>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );
}

export default ClipsList;
