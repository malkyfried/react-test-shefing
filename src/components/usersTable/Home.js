import React, { useEffect, useState } from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Box } from '@mui/material';
import './Home.css';
import Search from '../shared/search';
import UserPosts from '../userPosts/Posts';
import Constants from '../../config/constants';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
  });

  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let retryCount = 5;
      while (retryCount > 0) {
        try {
          const response = await fetch(Constants.API_ENDPOINT_USERS);
          if (!response.ok) {
            throw new Error(Constants.HTTP_ERROR_MESSAGE(response.status));
          }
          const data = await response.json();
          setUsers(data);
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
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (filterKey, value) => {
    if (filterKey === 'name' || filterKey === 'email') {
      setFilters((prevFilters) => ({
        ...prevFilters,
        name: value,
        email: value,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterKey]: value,
      }));
    }
  };

  const filteredUsers = Array.isArray(users)
    ? users.filter((user) =>
      Object.values(filters).some(
        (filterValue) =>
          user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.email.toLowerCase().includes(filterValue.toLowerCase())
      )
    ) : [];

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    const container = document.querySelector('.container');
    container.classList.toggle('hide-table', !!userId);
  };

  return (
    <div className="container">
      <Paper className="paper-root">
        <h1 className="table-title">Users Table</h1>
        <Box className="search-box">
          <Search filters={filters} onFilterChange={handleFilterChange} />
        </Box>
        {loading ? (
          <CircularProgress className="loading-spinner" />
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="table-container">
            {filteredUsers.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="table-header">Name</TableCell>
                    <TableCell className="table-header">Email</TableCell>
                    <TableCell className="table-header">Company Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      onClick={() => handleUserClick(user.id)}
                      className="table-row"
                    >
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.company.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>No users found.</p>
            )}
          </div>
        )}
      </Paper>
      {selectedUserId && (
        <div className="user-posts-container">
          <UserPosts userId={selectedUserId} className='user-posts' />
        </div>
      )}
    </div>
  );
};

export default HomePage;
