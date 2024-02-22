## React Test Application

This is a single-page application built with React, showcasing a UsersTable component and UserPosts functionality.

### Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.
4. Run `npm start` to start the development server.
5. Open your browser and navigate to `http://localhost:5173/` to view the application.

### Features

#### UsersTable

- Displays a table of users fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users).
- Columns: name, email, company name.
- Ability to filter the table by name and email.

#### UserPosts

- Upon selecting a user from the UsersTable, displays a list of posts posted by the selected user.
- Data fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts).
- Create post button opens a dialog to enter details for creating a new post.
- Dialog includes validation.
- After post creation, the list of posts for the user (UserPosts) is updated with the new post.

### Bonus Points

- Error handling for API data fetching.
- Loading indicator while fetching data.
- Search box to filter the table by name or email.

### Recommendations

- Material-UI component library is used for a professional-looking UI.
- Code is well-commented for clarity and understanding.
- Latest React features like hooks are utilized.
- Project structure promotes scalability and maintainability.

### Important

- Ensure all dependencies are correctly installed and the project builds and runs without errors.
- Test the project locally on a clean server to verify dependencies and functionality.