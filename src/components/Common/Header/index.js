import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import AnchorTemporaryDrawer from "./drawer";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';


function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        toast.success("You have been logged out");
        navigate("/");
        setShowMenu(false);
    };

    return (
        <div className="navbar">
            <Link to="/" style={{textDecoration: "none"}}>
                <h1 className="logo">
                    CryptoTracker<span style={{color:"var(--blue)"}}>.</span>
                </h1>
            </Link>
            
            <div className="links">
                <Link to="/"><p className="link">Home</p></Link>
                <Link to="/compare"><p className="link">Compare</p></Link>  
                <Link to="/watchlist"><p className="link">Watchlist</p></Link>
                <Link to="/portfolio"><p className="link">Portfolio</p></Link>
                <Link to="/dashboard"><Button text={"Dashboard"} onClick={()=>{}}/></Link>

                {user ? (
                    <div style={{position:"relative"}} ref={menuRef}>
                        <AccountCircleRoundedIcon
                            style={{color:"var(--white)", fontSize:"2rem", cursor:"pointer", display:"block"}}
                            onClick={() => setShowMenu(!showMenu)}
                        />
                        {showMenu && (
                            <div style={{
                                position:"absolute",
                                right:0,
                                top:"2.5rem",
                                backgroundColor:"#1a1a1a",
                                borderRadius:"0.8rem",
                                padding:"1rem 1.5rem",
                                minWidth:"200px",
                                zIndex:9999,
                                border:"1px solid rgba(255,255,255,0.15)",
                                boxShadow:"0 8px 32px rgba(0,0,0,0.8)",
                            }}>
                                <p style={{color:"var(--white)", fontWeight:600, marginBottom:"0.3rem"}}>{user.name}</p>
                                <p style={{color:"var(--grey)", fontSize:"0.85rem", marginBottom:"1rem"}}>{user.email}</p>
                                <div style={{borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:"0.8rem"}}>
                                    <p
                                        style={{color:"var(--red)", cursor:"pointer", fontSize:"0.9rem"}}
                                        onClick={handleLogout}
                                    >
                                        Log out
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link to="/login"><Button text={"Login"} outlined={true} onClick={()=>{}}/></Link>
                        <Link to="/register"><Button text={"Sign Up"} onClick={()=>{}}/></Link>
                    </>
                )}
            </div>
            <div className="mobile-drawer">
                <AnchorTemporaryDrawer/>
            </div>
        </div>
    );
}

export default Header;