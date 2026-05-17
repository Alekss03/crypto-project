import axios from "axios";

const API_URL = "http://localhost:5000/api/watchlist";

const getToken = () => localStorage.getItem("token");


export const getWatchlist = async () => {
    const token = getToken();
    if (!token) return [];
    try {
        const response = await axios.get(API_URL, {
            headers: { "x-auth-token": token }
        });
        return response.data;
    } catch (error) {
        console.log("ERROR>>>", error.message);
        return [];
    }
};


export const addToWatchlist = async (coinId) => {
    const token = getToken();
    if (!token) return;
    try {
        const response = await axios.post(`${API_URL}/add`, { coinId }, {
            headers: { "x-auth-token": token }
        });
        console.log("Response:", response.data);
    } catch (error) {
        console.log("ERROR>>>", error.message);
    }
};


export const removeFromWatchlist = async (coinId) => {
    const token = getToken();
    if (!token) return;
    try {
        await axios.post(`${API_URL}/remove`, { coinId }, {
            headers: { "x-auth-token": token }
        });
    } catch (error) {
        console.log("ERROR>>>", error.message);
    }
};

// Перевірити чи є монета в watchlist
export const isInWatchlist = async (coinId) => {
    const watchlist = await getWatchlist();
    return watchlist.includes(coinId);
};