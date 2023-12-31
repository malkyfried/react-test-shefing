import './App.css';
import HomePage from './components/usersTable/Home';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';


function App() {
  return (
    <div >
     <ThemeProvider theme={theme}>
     <HomePage></HomePage>
     </ThemeProvider>
    </div>
  );
}

export default App;
