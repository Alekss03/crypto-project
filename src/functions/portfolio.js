import axios from "axios";

const API_URL = "http://localhost:5000/api/portfolio";
const getToken = () => localStorage.getItem("token");

export const getPortfolio = async () => {
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

export const savePortfolioHistory = async (totalValue) => {
    const token = getToken();
    if (!token) return;
    try {
        await axios.post(`${API_URL}/history`, { totalValue }, {
            headers: { "x-auth-token": token }
        });
    } catch (error) {
        console.log("ERROR>>>", error.message);
    }
};

export const addAsset = async (asset) => {
    const token = getToken();
    if (!token) return;
    try {
        const response = await axios.post(`${API_URL}/add`, asset, {
            headers: { "x-auth-token": token }
        });
        return response.data;
    } catch (error) {
        console.log("ERROR>>>", error.message);
    }
};

export const removeAsset = async (assetId) => {
    const token = getToken();
    if (!token) return;
    try {
        const response = await axios.delete(`${API_URL}/remove/${assetId}`, {
            headers: { "x-auth-token": token }
        });
        return response.data;
    } catch (error) {
        console.log("ERROR>>>", error.message);
    }
};