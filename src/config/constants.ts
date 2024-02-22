const Constants = {
  // API endpoints
  API_ENDPOINT_USERS: 'https://jsonplaceholder.typicode.com/users',
  API_ENDPOINT_POSTS: 'https://jsonplaceholder.typicode.com/posts',
  // Error messages
  NETWORK_ERROR_MESSAGE: 'Network error. Please check your internet connection and try again.',
  UNEXPECTED_ERROR_MESSAGE: 'An unexpected error occurred. Please try again later.',
  RETRYING_ERROR_MESSAGE: (retryCount: number): string => `Error fetching data. Retrying... (${retryCount} attempts left)`,
  HTTP_ERROR_MESSAGE: (status: number): string => `HTTP error! Status: ${status}`,
  TITLE_BODY_REQUIRED_ERROR: 'Title and body are required',
  // Requests
  POST_REQUEST_CONFIG: {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  },
};

export default Constants;
