import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import { getPortfolio, addAsset, removeAsset, savePortfolioHistory } from "../functions/portfolio";
import { get100Coins } from "../functions/get100coins";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import "./Portfolio.css";

const COLORS = ['#3a80e9','#e93a3a','#61c96f','#f5a623','#9b59b6','#1abc9c'];

function PortfolioPage() {
    const [history, setHistory] = useState([]);
    const [assets, setAssets] = useState([]);
    const [allCoins, setAllCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ coinId: "", quantity: "", buyPrice: "" });
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) { navigate("/login"); return; }
        getData();
    }, [user]);

    useEffect(() => {
        if (assets.length > 0 && allCoins.length > 0) {
            const total = assets.reduce((sum, a) => {
                const coin = allCoins.find(c => c.id === a.coinId);
                return sum + a.quantity * (coin ? coin.current_price : 0);
            }, 0);
            savePortfolioHistory(parseFloat(total.toFixed(2)));
        }
    }, [assets, allCoins]);

    const getData = async () => {
        const [portfolioData, coins] = await Promise.all([getPortfolio(), get100Coins()]);
        setAssets(portfolioData.assets || []);
        setHistory(portfolioData.history || []);
        setAllCoins(coins);
        setLoading(false);
    };

    const handleAdd = async () => {
        if (!form.coinId || !form.quantity || !form.buyPrice) {
            toast.error("Please fill in all fields");
            return;
        }
        const coin = allCoins.find(c => c.id === form.coinId);
        if (!coin) return;
        const asset = {
            coinId: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            image: coin.image,
            quantity: parseFloat(form.quantity),
            buyPrice: parseFloat(form.buyPrice),
        };
        const updated = await addAsset(asset);
        if (updated) {
            setAssets(updated.assets || updated);
            setForm({ coinId: "", quantity: "", buyPrice: "" });
            setShowForm(false);
            toast.success(`${coin.name} added to portfolio`);
        }
    };

    const handleRemove = async (assetId, name) => {
        const updated = await removeAsset(assetId);
        if (updated) {
            setAssets(updated.assets || updated);
            toast.error(`${name} "removed from portfolio"`);
        }
    };

    const getCurrentPrice = (coinId) => {
        const coin = allCoins.find(c => c.id === coinId);
        return coin ? coin.current_price : 0;
    };

    const totalInvested = assets.reduce((sum, a) => sum + a.quantity * a.buyPrice, 0);
    const totalCurrent = assets.reduce((sum, a) => sum + a.quantity * getCurrentPrice(a.coinId), 0);
    const totalPnL = totalCurrent - totalInvested;
    const totalPnLPercent = totalInvested > 0 ? ((totalPnL / totalInvested) * 100).toFixed(2) : 0;

    const pieData = assets.map(a => ({
        name: a.symbol.toUpperCase(),
        value: parseFloat((a.quantity * getCurrentPrice(a.coinId)).toFixed(2)),
    }));

    const lineData = history.map(h => ({
        date: new Date(h.date).toLocaleDateString("uk-UA"),
        value: h.totalValue,
    }));

    return (
        <div>
            <Header/>
            {loading ? <Loader/> : (
                <div className="portfolio-container">
                    <div className="portfolio-metrics">
                        <div className="metric-card">
                            <p className="metric-label">Total Value</p>
                            <p className="metric-value">${totalCurrent.toLocaleString("en-US", {maximumFractionDigits: 2})}</p>
                        </div>
                        <div className="metric-card">
                            <p className="metric-label">Invested</p>
                            <p className="metric-value">${totalInvested.toLocaleString("en-US", {maximumFractionDigits: 2})}</p>
                        </div>
                        <div className="metric-card">
                            <p className="metric-label">Profit/Loss</p>
                            <p className={`metric-value ${totalPnL >= 0 ? "green" : "red"}`}>
                                {totalPnL >= 0 ? "+" : ""}${totalPnL.toLocaleString("en-US", {maximumFractionDigits: 2})}
                            </p>
                        </div>
                        <div className="metric-card">
                            <p className="metric-label">Change %</p>
                            <p className={`metric-value ${totalPnL >= 0 ? "green" : "red"}`}>
                                {totalPnL >= 0 ? "+" : ""}{totalPnLPercent}%
                            </p>
                        </div>
                    </div>

                    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1.5rem"}}>
                        {pieData.length > 0 && (
                            <div className="portfolio-chart grey-wrapper">
                                <p className="chart-title">Portfolio Allocation</p>
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({name, percent}) => `${name} ${(percent*100).toFixed(1)}%`}>
                                            {pieData.map((entry, index) => (
                                                <Cell key={index} fill={COLORS[index % COLORS.length]}/>
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(v) => `$${v.toLocaleString("en-US")}`}/>
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        )}

                        {lineData.length > 1 && (
                            <div className="portfolio-chart grey-wrapper">
                                <p className="chart-title">Portfolio Performance</p>
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={lineData}>
                                        <XAxis dataKey="date" stroke="#888" tick={{fontSize:11}}/>
                                        <YAxis stroke="#888" tick={{fontSize:11}}/>
                                        <Tooltip formatter={(v) => `$${v.toLocaleString("en-US")}`}/>
                                        <Line type="monotone" dataKey="value" stroke="#3a80e9" strokeWidth={2} dot={false}/>
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </div>

                    <div className="grey-wrapper">
                        <div className="portfolio-header">
                            <p className="section-title">My Assets</p>
                            <button className="add-btn" onClick={() => setShowForm(!showForm)}>
                                {showForm ? "Cancel" : "+ Add Asset"}
                            </button>
                        </div>

                        {showForm && (
                            <div className="add-form">
                                <select value={form.coinId} onChange={e => setForm({...form, coinId: e.target.value})} className="form-select">
                                    <option value="">Select a coin</option>
                                    {allCoins.map(coin => (
                                        <option key={coin.id} value={coin.id}>{coin.name}</option>
                                    ))}
                                </select>
                                <input type="number" placeholder="Amount" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} className="form-input"/>
                                <input type="number" placeholder="Buy Price ($)" value={form.buyPrice} onChange={e => setForm({...form, buyPrice: e.target.value})} className="form-input"/>
                                <button className="add-btn" onClick={handleAdd}>Add</button>
                            </div>
                        )}

                        {assets.length === 0 ? (
                            <p className="empty-text">Portfolio is empty — add your first asset</p>
                        ) : (
                            <table className="portfolio-table">
                                <thead>
                                    <tr>
                                        <th>Coin</th>
                                        <th>Amount</th>
                                        <th>Buy Price</th>
                                        <th>Current Price</th>
                                        <th>Value</th>
                                        <th>P&L</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {assets.map((asset) => {
                                        const currentPrice = getCurrentPrice(asset.coinId);
                                        const currentValue = asset.quantity * currentPrice;
                                        const invested = asset.quantity * asset.buyPrice;
                                        const pnl = currentValue - invested;
                                        const pnlPercent = ((pnl / invested) * 100).toFixed(2);
                                        return (
                                            <tr key={asset._id}>
                                                <td>
                                                    <div className="coin-cell">
                                                        <img src={asset.image} alt={asset.name} width={28}/>
                                                        <div>
                                                            <p className="coin-sym">{asset.symbol.toUpperCase()}</p>
                                                            <p className="coin-nm">{asset.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{asset.quantity}</td>
                                                <td>${asset.buyPrice.toLocaleString("en-US")}</td>
                                                <td>${currentPrice.toLocaleString("en-US")}</td>
                                                <td>${currentValue.toLocaleString("en-US", {maximumFractionDigits:2})}</td>
                                                <td className={pnl >= 0 ? "green" : "red"}>
                                                    {pnl >= 0 ? "+" : ""}${pnl.toLocaleString("en-US", {maximumFractionDigits:2})}
                                                    <span style={{fontSize:"0.8rem", marginLeft:"4px"}}>({pnl >= 0 ? "+" : ""}{pnlPercent}%)</span>
                                                </td>
                                                <td>
                                                    <DeleteRoundedIcon className="delete-icon" onClick={() => handleRemove(asset._id, asset.name)}/>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PortfolioPage;