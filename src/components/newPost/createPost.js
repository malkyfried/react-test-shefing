import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import Constants from "../../config/constants";

const CreatePost = ({ open, onClose, userId, onPostCreated }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState("");

    const handleCreatePost = async () => {
        // Basic input validation
        if (!title || !body) {
            setError(Constants.TITLE_BODY_REQUIRED_ERROR);
            return;
        }
        let retryCount = 5;
        while (retryCount > 0) {
            try {
                const response = await fetch(Constants.API_ENDPOINT_POSTS, {
                    ...Constants.POST_REQUEST_CONFIG,
                    body: JSON.stringify({
                        userId,
                        title,
                        body,
                    }),
                });
                if (!response.ok) {
                    throw new Error(Constants.HTTP_ERROR_MESSAGE(response.status));
                }
                const newPost = await response.json();
                setTitle("");
                setBody("");
                setError("");
                // Close the dialog
                onClose();
                onPostCreated(newPost);
                return; // Successful post creation, exit the loop
            } catch (error) {
                if (error instanceof TypeError) {
                    setError(Constants.NETWORK_ERROR_MESSAGE);
                } else {
                    // Decrement the retry count
                    retryCount--;
                    if (retryCount === 0) {
                        setError(Constants.UNEXPECTED_ERROR_MESSAGE);
                    } else {
                        setError(Constants.RETRYING_ERROR_MESSAGE(retryCount));
                    }
                }
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Post</DialogTitle>
            <DialogContent>
                <TextField
                    label="Title"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Body"
                    multiline
                    fullWidth
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    margin="normal"
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
            </DialogContent>
            <DialogActions style={{ justifyContent: "center" }}>
                <Button variant="contained" onClick={onClose} style={{ backgroundColor: '#4caf50' }}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleCreatePost} style={{ backgroundColor: '#4caf50' }}>
                    Create Post
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreatePost;