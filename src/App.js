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
import { useState, useEffect, createContext, useContext } from 'react';

export const ThemeModeContext = createContext();
export const useThemeMode = () => useContext(ThemeModeContext);

function App() {
  const [isDark, setIsDark] = useState(true);

useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty('--background', '#0f0f0f');
      root.style.setProperty('--background-secondary', '#1a1a1a');
      root.style.setProperty('--white', '#ffffff');
      root.style.setProperty('--grey', '#a0a0a0');
      root.style.setProperty('--card-bg', '#1e1e1e');
      root.style.setProperty('--border', 'rgba(255,255,255,0.1)');
      root.style.setProperty('--text', '#ffffff');
      root.style.setProperty('--black', '#0f0f0f');  // додай сюди
    } else {
      root.style.setProperty('--background', '#f5f5f5');
      root.style.setProperty('--background-secondary', '#ffffff');
      root.style.setProperty('--white', '#1a1a1a');
      root.style.setProperty('--grey', '#555555');
      root.style.setProperty('--card-bg', '#ffffff');
      root.style.setProperty('--border', 'rgba(0,0,0,0.1)');
      root.style.setProperty('--text', '#1a1a1a');
      root.style.setProperty('--black', '#ffffff');  // додай сюди
    }
  }, [isDark]);

  const theme = createTheme({
    palette: { mode: isDark ? 'dark' : 'light' },
  });

  return (
    <ThemeModeContext.Provider value={{ isDark, setIsDark }}>
      <AuthProvider>
        <div className="App">
          <div className="cursor" id="cursor" />
          <div className="cursor-pointer" id="cursor-pointer" />
          <ToastContainer />
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/coin/:id" element={<CoinPage />} />
                <Route path="/compare" element={<ComparePage />} />
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
    </ThemeModeContext.Provider>
  );
}

export default App;