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
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
    const [openReportDialog, setOpenReportDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [report, setReport] = useState("");
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

    const handleReportSubmit = async (e) => {
        e.preventDefault();

        const reportInfo = {
            text: report,
            clipId: id,
        };

        setReport("");

        try {
            const res = await fetch(
                "https://polish-clips.azurewebsites.net/api/report",
                {
                    method: "POST",
                    headers: {
                        accept: "text/plain",
                        "Content-Type": "application/json",
                        Authorization: `bearer ${auth.accessToken}`,
                    },
                    body: JSON.stringify(reportInfo),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw Error(data.message);
            }
            setOpenReportDialog(false);
        } catch (err) {
            console.log(err.message);
            alert(err.message);
        }
    };

    const handleClipDelete = async () => {
        try {
            const res = await fetch(
                `https://polish-clips.azurewebsites.net/api/clip?id=${id}`,
                {
                    method: "DELETE",
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

            navigate("/");
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
                            src={`${clip.data.embedUrl}&parent=polish-clips.vercel.app&parent=localhost`}
                            title="clip"
                            height="540px"
                            width="960px"
                            allowFullScreen
                        ></iframe>
                    </Grid>
                    <Grid item md={12} xl={4}>
                        <Card sx={{ p: 1, mb: 1, pb: 0 }}>
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
                                        sx={{ width: "100%", mt: 2 }}
                                    >
                                        {isLogged ? (
                                            isLiked ? (
                                                <Button
                                                    onClick={() =>
                                                        handleDislike(id)
                                                    }
                                                    sx={{ width: "100%" }}
                                                >
                                                    Usuń polubienie
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() =>
                                                        handleLike(id)
                                                    }
                                                    sx={{ width: "100%" }}
                                                >
                                                    Polub
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
                                                Polub
                                            </Button>
                                        )}
                                        {isLogged ? (
                                            <Button
                                                onClick={() =>
                                                    setOpenReportDialog(true)
                                                }
                                                sx={{ width: "50%" }}
                                            >
                                                Zgłoś
                                            </Button>
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
                                                sx={{ width: "50%" }}
                                            >
                                                Zgłoś
                                            </Button>
                                        )}
                                        {auth.role === "Admin" && (
                                            <Button
                                                onClick={() =>
                                                    setOpenDeleteDialog(true)
                                                }
                                                sx={{ width: "100%" }}
                                            >
                                                Usuń klip
                                            </Button>
                                        )}
                                    </ButtonGroup>
                                    <Dialog
                                        open={openReportDialog}
                                        onClose={() =>
                                            setOpenReportDialog(false)
                                        }
                                        component={"form"}
                                        onSubmit={handleReportSubmit}
                                        fullWidth
                                        maxWidth="sm"
                                    >
                                        <DialogTitle>
                                            Zgłoszenie klipu
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Dlaczego chcesz zgłosić ten
                                                klip?
                                            </DialogContentText>
                                            <TextField
                                                margin="dense"
                                                id="report"
                                                label="Powód zgłoszenia"
                                                type="text"
                                                value={report}
                                                fullWidth
                                                autoComplete="off"
                                                multiline
                                                minRows={2}
                                                maxRows={4}
                                                onChange={(e) =>
                                                    setReport(e.target.value)
                                                }
                                                inputProps={{ maxLength: 360 }}
                                            ></TextField>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button
                                                onClick={() =>
                                                    setOpenReportDialog(false)
                                                }
                                                variant="contained"
                                            >
                                                Anuluj
                                            </Button>
                                            <Button
                                                disabled={
                                                    !report.length > 0
                                                        ? true
                                                        : false
                                                }
                                                type="submit"
                                                variant="contained"
                                            >
                                                Zgłoś
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                    <Dialog
                                        open={openDeleteDialog}
                                        onClose={() =>
                                            setOpenDeleteDialog(false)
                                        }
                                        fullWidth
                                        maxWidth="sm"
                                    >
                                        <DialogTitle>
                                            Usunięcie klipu
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Czy na pewno chcesz usunąć ten
                                                klip?
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button
                                                onClick={() =>
                                                    setOpenDeleteDialog(false)
                                                }
                                                variant="contained"
                                            >
                                                Anuluj
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleClipDelete()
                                                }
                                                variant="contained"
                                            >
                                                Usuń
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
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
