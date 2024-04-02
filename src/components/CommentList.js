import {
    Box,
    Button,
    Card,
    Divider,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";

function CommentList({ comments }) {
    const [comment, setComment] = useState("");

    const handleComment = (e) => {
        alert(comment);
    };

    return (
        <Box sx={{ maxHeight: "65vh", overflowY: "auto", pr: 1 }}>
            <TextField
                id="add-comment-textfield"
                label="Dodaj komentarz"
                multiline
                maxRows={2}
                minRows={2}
                fullWidth
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
            {comments &&
                comments
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
                            {console.log(comment)}
                        </Card>
                    ))}
        </Box>
    );
}

export default CommentList;
