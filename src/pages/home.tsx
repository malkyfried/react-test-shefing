import React, { useEffect, useState } from 'react';
import UserTable from '../components/usersTable/usersTable';
import UserPosts from '../components/userPosts/usersPosts';
import Constants from '../config/constants';
import './home.css';
import { isMobile } from 'mobile-device-detect';

interface FilterState {
  name: string;
  email: string;
}

const HomePage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    name: '',
    email: '',
  });

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

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

  const handleFilterChange = (filterKey: string, value: string) => {
    setSelectedUserId(null)
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

  const handleUserClick = (userId: number) => {
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
            //selectedUserId={selectedUserId}
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
