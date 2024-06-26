import useGetFetch from "../Hooks/useGetFetch";
import {
    Card,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Link,
    Typography,
    Pagination,
    Box,
} from "@mui/material";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { Link as RouterLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Contexts/AuthProvider";
import { ThumbUp } from "@mui/icons-material";

function ClipsList({ url, page, compRef, handlePages }) {
    const {
        data: clips,
        isLoading,
        error,
    } = useGetFetch(url + `&PageNumber=${page}`);
    const { auth } = useContext(AuthContext);

    return (
        <Box
            overflow={"auto"}
            maxHeight={"90vh"}
            ref={compRef}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Grid container>
                {isLoading && <div>Ładowanie...</div>}
                {error && <Typography>Brak danych</Typography>}
                {clips &&
                    !isLoading &&
                    !error &&
                    clips.data.map((clip) => (
                        <Grid item xs={12} sm={6} md={6} lg={4} key={clip.id}>
                            <Card sx={{ m: 1, p: 1, pb: 0 }}>
                                <Link
                                    sx={{
                                        textDecoration: "none",
                                        color: "white",
                                    }}
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
                                        <Divider sx={{ my: 1 }}></Divider>
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-evenly",
                                                pt: 1.5,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {auth.likes ? (
                                                    auth.likes.some(
                                                        (like) =>
                                                            // eslint-disable-next-line
                                                            like.clipId ==
                                                            clip.id
                                                    ) ? (
                                                        <ThumbUp
                                                            sx={{ mr: 1 }}
                                                            color="primary"
                                                        />
                                                    ) : (
                                                        <ThumbUpOutlinedIcon
                                                            sx={{ mr: 1 }}
                                                        />
                                                    )
                                                ) : (
                                                    <ThumbUpOutlinedIcon
                                                        sx={{ mr: 1 }}
                                                    />
                                                )}{" "}
                                                {clip.likeAmount}
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <InsertCommentOutlinedIcon
                                                    sx={{ mr: 1 }}
                                                />{" "}
                                                {clip.comments.length}
                                            </Box>
                                        </Typography>
                                    </CardContent>
                                </Link>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
            {clips.data && (
                <Pagination
                    count={Math.ceil(clips.noOfElements / 12)}
                    page={page}
                    onChange={handlePages}
                    sx={{ my: 1 }}
                />
            )}
        </Box>
    );
}

export default ClipsList;
