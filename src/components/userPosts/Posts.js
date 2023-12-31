import React, { useEffect, useState } from "react";
import { Button, CircularProgress, List, ListItem, ListItemText, Typography } from "@mui/material";
import CustomScrollbar from "../shared/scrollbar";
import CreatePost from "../newPost/createPost";
import './Posts.css';
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
          const response = await fetch(`${Constants.API_ENDPOINT_POSTS}?userId=${userId}`);
          if (!response.ok) {
            throw new Error(Constants.HTTP_ERROR_MESSAGE(response.status));
          }
          const data = await response.json();
          setPosts(data);
          return; // Exit the function after successful attempt
        } catch (error) {
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
          setLoading(false);
        }
      }
    };

    fetchPosts();
  }, [userId]);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handlePostCreated = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="user-posts">
      <CustomScrollbar>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h1">Posts by User</Typography>
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
          <List>
            {posts.map(post => (
              <ListItem key={post.id}>
                <ListItemText primary={post.title} />
                {/* <ListItemText >{post.body}</ListItemText>  */}
              </ListItem>
            ))}
          </List>
        )}
      </CustomScrollbar>
    </div>
  );
};

export default UserPosts;