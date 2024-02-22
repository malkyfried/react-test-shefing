// UserTable.js

import React from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Box,
} from '@mui/material';
import './usersTable.css';
import Search from '../shared/search';

const UserTable = ({
  users,
  loading,
  error,
  filters,
  onFilterChange,
  onUserClick,
}) => {
  // Filter users based on the provided filters (name and email)
  const filteredUsers = Array.isArray(users)
    ? users.filter((user) =>
        Object.values(filters).some(
          (filterValue) =>
            user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
            user.email.toLowerCase().includes(filterValue.toLowerCase())
        )
      )
    : [];

  return (
    <Paper className="paper-root">
      <h1 className="table-title">Users Table</h1>
      <Box className="search-box">
        <Search filters={filters} onFilterChange={onFilterChange} />
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
                    onClick={() => onUserClick(user.id)}
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
            <div className="no-users-found">
              <p>No users found.</p>
            </div>
          )}
        </div>
      )}
    </Paper>
  );
};

export default UserTable;
