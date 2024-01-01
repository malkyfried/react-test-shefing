// HomePage.js
import React, { useEffect, useState } from 'react';
import UserTable from '../components/usersTable/usersTable';
import UserPosts from '../components/userPosts/posts';
import Constants from '../config/constants';
import './home.css'

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


  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    const container = document.querySelector('.container');
    container.classList.toggle('hide-table', !!userId);
  };

  return (
    <div className="container">
      <UserTable
        users={users}
        loading={loading}
        error={error}
        filters={filters}
        onFilterChange={handleFilterChange}
        onUserClick={handleUserClick}
      />
      {selectedUserId && (
        <div className="user-posts-container">
          <UserPosts userId={selectedUserId} className="user-posts" />
        </div>
      )}
    </div>
  );
};

export default HomePage;
