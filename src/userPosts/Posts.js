import React, { useEffect, useState } from "react";
import { Button, CircularProgress, List, ListItem, ListItemText, Typography } from "@mui/material";
import CustomScrollbar from "../shared/scrollbar";
import CreatePost from "../newPost/createPost";
import './Posts.css';

const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError('Error fetching posts data. Please try again.');
      } finally {
        setLoading(false);
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
    //show posts where all posts are displayed
    console.log("new post has been created")
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
              </ListItem>
            ))}
          </List>
        )}
      </CustomScrollbar>
    </div>
  );
};

export default UserPosts;
