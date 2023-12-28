import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

const CreatePost = ({ open, onClose, userId, onPostCreated }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState("");

    const handleCreatePost = async () => {
        // Basic input validation
        if (!title || !body) {
            setError("Title and body are required");
            return;
        }
        try {
            // Make a fake POST request to create a new post
            const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    title,
                    body,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const newPost = await response.json();
            console.log("response", response)
            // Reset input fields and clear error
            setTitle("");
            setBody("");
            setError("");
            // Close the dialog
            onClose();
            // Notify parent component that a new post has been created
            onPostCreated(newPost);
        } catch (error) {
            setError("Error creating post. Please try again.");
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
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleCreatePost} style={{ backgroundColor: '#4caf50', color: '#fff' }}>
                    Create Post
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreatePost;
