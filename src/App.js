import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import DashboardPage from './pages/Dashboard';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CoinPage from './pages/Coin';
import Watchlist from './pages/Watchlist';
import ComparePage from './pages/ComparePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import Portfolio from './pages/Portfolio';
import ProfilePage from './pages/Profile.js';


const theme = createTheme();

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <div className="cursor" id="cursor" />
        <div className="cursor-pointer" id="cursor-pointer" />
        <ToastContainer/>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/coin/:id" element={<CoinPage />} />
              <Route path="/compare" element={<ComparePage/>} />
              <Route path="/watchlist" element={<Watchlist />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </div>
    </AuthProvider>
  );
}

export default App;