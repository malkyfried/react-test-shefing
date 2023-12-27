import React, { useEffect, useState } from 'react';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from '@mui/material';
import './Home.css';
import Search from '../shared/search';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError('Error fetching user data. Please try again.');
      } finally {
        setLoading(false);
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

  const filteredUsers = users.filter((user) => {
    return Object.values(filters).some((filterValue) =>
      user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
      user.email.toLowerCase().includes(filterValue.toLowerCase())
    );
  });

  return (
    <Paper className="paper-root">
      <h1 className="table-title">Users Table</h1>
      <Search filters={filters} onFilterChange={handleFilterChange}/>
      {loading ? (
        <CircularProgress className="loading-spinner" />
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <Table style={{ width: 1000 }}>
          <TableHead>
            <TableRow>
              <TableCell className="table-header">Name</TableCell>
              <TableCell className="table-header">Email</TableCell>
              <TableCell className="table-header">Company Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.company.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default HomePage;