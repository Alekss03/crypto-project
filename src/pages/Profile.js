import React, { useState, useEffect } from "react";
import Header from "../components/Common/Header";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { toast } from "react-toastify";
import axios from "axios";
import "./Profile.css";

function ProfilePage() {
    const { user, login, token } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState(user?.name || "");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) navigate("/login");
    }, [user]);

    if (!user) return null;

    const handleUpdateName = async () => {
        if (!name.trim()) {
            toast.error("Name cannot be empty");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.put(
                "http://localhost:5000/api/auth/update",
                { name },
                { headers: { "x-auth-token": token } }
            );
            login(response.data.user, token);
            toast.success("Ім'я оновлено!");
        } catch (error) {
            toast.error("Помилка оновлення");
        }
        setLoading(false);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("uk-UA", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    return (
        <div>
            <Header/>
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-avatar">
                        <AccountCircleRoundedIcon style={{fontSize:"6rem", color:"var(--blue)"}}/>
                        <h2 className="profile-name">{user.name}</h2>
                        <p className="profile-email">{user.email}</p>
                    </div>
                    <div className="profile-info">
                        <div className="info-row">
                            <p className="info-label">Дата реєстрації</p>
                            <p className="info-value">{formatDate(user.createdAt || new Date())}</p>
                        </div>
                        <div className="info-row">
                            <p className="info-label">Email</p>
                            <p className="info-value">{user.email}</p>
                        </div>
                    </div>
                    <div className="profile-edit">
                        <p className="edit-title">"Change name"</p>
                        <div className="edit-form">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="edit-input"
                                placeholder="New name"
                            />
                            <button
                                className="edit-btn"
                                onClick={handleUpdateName}
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;