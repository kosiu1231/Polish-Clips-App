import {
    Box,
    Button,
    Card,
    Divider,
    TextField,
    Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import AuthContext from "../Contexts/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

function CommentList({ comments, commentId }) {
    const [comment, setComment] = useState("");
    const [commentList, setCommentList] = useState(comments);
    const { isLogged } = useContext(AuthContext);
    const { auth } = useAuth();
    const [url] = useState(`https://localhost:7064/api/comment`);
    const location = useLocation();
    const navigate = useNavigate();

    const handleComment = async (e) => {
        if (isLogged) {
            const commentInfo = {
                text: comment,
                clipId: commentId,
            };

            setComment("");

            try {
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        accept: "text/plain",
                        "Content-Type": "application/json",
                        Authorization: `bearer ${auth.accessToken}`,
                    },
                    body: JSON.stringify(commentInfo),
                });

                const data = await res.json();

                if (!res.ok) {
                    throw Error(data.message);
                }
                const newComments = data.data.comments;
                setCommentList(newComments);
            } catch (err) {
                console.log(err.message);
                alert(err.message);
            }
        } else {
            navigate("/logowanie", {
                state: { from: location },
                replace: true,
            });
        }
    };

    return (
        <Box sx={{ maxHeight: "65vh", overflowY: "auto", pr: 1, pt: 1 }}>
            <TextField
                id="add-comment-textfield"
                label="Dodaj komentarz"
                multiline
                maxRows={2}
                minRows={2}
                fullWidth
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <Button
                id="add-comment-button"
                fullWidth
                variant="contained"
                sx={{ mt: 1, color: "primary" }}
                onClick={() => {
                    handleComment();
                }}
            >
                Dodaj komentarz
            </Button>
            {commentList &&
                commentList
                    .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((comment) => (
                        <Card key={comment.id} sx={{ p: 1, mt: 1 }}>
                            <Typography variant="h7">
                                {comment.user.username}
                            </Typography>
                            <Typography sx={{ fontSize: 12 }}>
                                {new Date(comment.createdAt).toLocaleString()}
                            </Typography>
                            <Divider sx={{ my: 1 }} orientation="horizontal" />
                            <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: "normal" }}
                            >
                                {comment.text}
                            </Typography>
                        </Card>
                    ))}
        </Box>
    );
}

export default CommentList;
