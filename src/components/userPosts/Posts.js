import React, { useEffect, useState } from "react";
import { Button, CircularProgress, List, ListItem, ListItemText, Paper } from "@mui/material";
import CreatePost from "../newPost/createPost";
import './posts.css';
import Constants from '../../config/constants';

const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      let retryCount = 5;
      while (retryCount > 0) {
        try {
          // Fetch posts for the specified user from the API endpoint
          const response = await fetch(`${Constants.API_ENDPOINT_POSTS}?userId=${userId}`);
          if (!response.ok) {
            throw new Error(Constants.HTTP_ERROR_MESSAGE(response.status));
          }
          const data = await response.json();
          setPosts(data);
          return; // Exit the function after successful attempt
        } catch (error) {
           // Handle different types of errors (network, unexpected, retrying)
          if (error instanceof TypeError) {
            setError(Constants.NETWORK_ERROR_MESSAGE);
          } else {
            retryCount--;
            if (retryCount === 0) {
              setError(Constants.UNEXPECTED_ERROR_MESSAGE);
            } else {
              setError(Constants.RETRYING_ERROR_MESSAGE(retryCount));
            }
          }
        } finally {
          // Set loading state to false after fetching data
          setLoading(false);
        }
      }
    };

    fetchPosts();
  }, [userId]);

  // Event handler to open the post creation dialog
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  // Event handler to close the post creation dialog
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

// Event handler for handling the creation of a new post
  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <Paper className="paper-root">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 className="table-title">Posts by User</h1>
          <div style={{ marginRight: 'auto' }}>
            <Button variant="contained" onClick={handleDialogOpen} style={{ backgroundColor: '#4caf50', color: '#fff', marginLeft: '22px' }}>
              Create Post
            </Button>
          </div>
        </div>
        <CreatePost
          open={isDialogOpen}
          onClose={handleDialogClose}
          userId={userId}
          onPostCreated={handlePostCreated}
        />
        {loading ? (
          <CircularProgress className="loading-spinner" />
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <List className="post-list">
            {posts.map(post => (
              <ListItem key={post.id}>
                <ListItemText primary={post.title} />
                {/* <ListItemText >{post.body}</ListItemText>  */}
              </ListItem>
            ))}
          </List>
        )}
    </Paper>
  );
};

export default UserPosts;