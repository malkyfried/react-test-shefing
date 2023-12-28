import React, { useEffect, useState } from "react";
import { CircularProgress, List, ListItem, ListItemText, Typography } from "@mui/material";
import './Posts.css';
import CustomScrollbar from "../shared/scrollbar";

const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="user-posts">
    <CustomScrollbar>
      <Typography variant="h1">Posts by User</Typography>
      {loading ? (
        <CircularProgress className="loading-spinner"/>
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
