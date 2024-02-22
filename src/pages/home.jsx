import React, { useEffect, useState } from 'react';
import UserTable from '../components/usersTable/usersTable';
import UserPosts from '../components/userPosts/usersPosts';
import Constants from '../config/constants';
import './home.css'
import { isMobile } from 'mobile-device-detect';

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
      // Retry fetch in case of errors
      let retryCount = 5;
      while (retryCount > 0) {
        try {
           // Fetch user data from the API endpoint
          const response = await fetch(Constants.API_ENDPOINT_USERS);
          // Handle non-successful HTTP responses
          if (!response.ok) {
            throw new Error(Constants.HTTP_ERROR_MESSAGE(response.status));
          }
          const data = await response.json();
          setUsers(data);
        } catch (error) {
           // Handle different types of errors (network, unexpected, retrying)
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

  // Event handler for changing filter values
  const handleFilterChange = (filterKey, value) => {
    setSelectedUserId(null)
    // Update filters based on the filter key
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

  // Event handler for clicking on a user row
  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  return (
    <div className={`container ${!isMobile && !selectedUserId ? '' : 'hide-table'}`}>
      {(!isMobile || !selectedUserId) && (
        <div className="container">
          <UserTable
            users={users}
            loading={loading}
            error={error}
            filters={filters}
            onFilterChange={handleFilterChange}
            onUserClick={handleUserClick}
            selectedUserId={selectedUserId}
          />
        </div>
      )}
      {selectedUserId && (
        <div className="user-posts-container">
          <UserPosts userId={selectedUserId} className="user-posts" />
        </div>
      )}
    </div>
  );
};

export default HomePage;