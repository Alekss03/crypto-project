import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

export default function AnchorTemporaryDrawer() {
    const [open, setOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        toast.success("You have been logged out");
        navigate("/");
        setOpen(false);
    };

    return (
        <div>
            <IconButton onClick={() => setOpen(true)}>
                <MenuRoundedIcon className='link'/>
            </IconButton>
            <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
                <div className="drawer-div">
                    <Link to="/" onClick={() => setOpen(false)}>
                        <p className="link">Home</p>
                    </Link>
                    <Link to="/compare" onClick={() => setOpen(false)}>
                        <p className="link">Compare</p>
                    </Link>
                    <Link to="/watchlist" onClick={() => setOpen(false)}>
                        <p className="link">Watchlist</p>
                    </Link>
                    <Link to="/portfolio">
                        <p className="link">Portfolio</p>
                    </Link>
                    <Link to="/dashboard" onClick={() => setOpen(false)}>
                        <p className="link">Dashboard</p>
                    </Link>
                    {user ? (
                        <p className="link" onClick={handleLogout}>Log Out</p>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setOpen(false)}>
                                <p className="link">Login</p>
                            </Link>
                            <Link to="/register" onClick={() => setOpen(false)}>
                                <p className="link">Sign Up</p>
                            </Link>
                        </>
                    )}
                </div>
            </Drawer>
        </div>
    );
}