import {
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    Typography,
    Button,
    ButtonGroup,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useGetFetch from "../Hooks/useGetFetch";
import CommentList from "../components/CommentList";
import AuthContext from "../Contexts/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";

function Clip() {
    const { id } = useParams();
    const [clipsUrl] = useState(
        `https://polish-clips.azurewebsites.net/api/clip/${id}`
    );
    const { isLogged, auth, setAuth } = useContext(AuthContext);
    const [isLiked, setIsLiked] = useState(
        // eslint-disable-next-line
        auth.likes ? auth.likes.some((like) => like.clipId == id) : false
    );
    const { data: clip, isLoading, error } = useGetFetch(clipsUrl);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLike = async (id) => {
        try {
            const res = await fetch(
                `https://polish-clips.azurewebsites.net/api/clip/${id}/like`,
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

            let updatedLikes = [];

            if (auth.likes) {
                updatedLikes = [...auth.likes, { clipId: id }];
            } else {
                updatedLikes = [{ clipId: id }];
            }

            const updatedAuth = { ...auth, likes: updatedLikes };

            await localStorage.setItem("user", JSON.stringify(updatedAuth));

            await setAuth(updatedAuth);

            setIsLiked(true);
        } catch (err) {
            console.log(err.message);
            alert(err.message);
        }
    };

    const handleDislike = async (id) => {
        try {
            const res = await fetch(
                `https://polish-clips.azurewebsites.net/api/clip/${id}/dislike`,
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

            const updatedLikes = auth.likes.filter(
                (like) => like.clipId !== id
            );

            const updatedAuth = { ...auth, likes: updatedLikes };

            localStorage.setItem("user", JSON.stringify(updatedAuth));

            await await setAuth(updatedAuth);

            setIsLiked(false);
        } catch (err) {
            console.log(err.message);
            alert(err.message);
        }
    };

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
                            src={`${clip.data.embedUrl}&parent=polish-clips.azurewebsites.net`}
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
                                        {clip.data.user &&
                                        clip.data.user.username
                                            ? clip.data.user.username
                                            : "AutoMod"}
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
                                    <ButtonGroup
                                        variant="contained"
                                        sx={{ width: "100%" }}
                                    >
                                        {isLogged ? (
                                            isLiked ? (
                                                <Button
                                                    onClick={() =>
                                                        handleDislike(id)
                                                    }
                                                    sx={{ width: "100%" }}
                                                >
                                                    USUŃ POLUBIENIE
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() =>
                                                        handleLike(id)
                                                    }
                                                    sx={{ width: "100%" }}
                                                >
                                                    POLUB
                                                </Button>
                                            )
                                        ) : (
                                            <Button
                                                onClick={() =>
                                                    navigate("/logowanie", {
                                                        state: {
                                                            from: location,
                                                        },
                                                        replace: true,
                                                    })
                                                }
                                                sx={{ width: "100%" }}
                                            >
                                                like
                                            </Button>
                                        )}
                                        <Button sx={{ width: "100%" }}>
                                            Two
                                        </Button>
                                        <Button sx={{ width: "100%" }}>
                                            Three
                                        </Button>
                                    </ButtonGroup>
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
