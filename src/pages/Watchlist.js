import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import { get100Coins } from "../functions/get100coins";
import { getWatchlist } from "../functions/watchlist";
import List from "../components/Dashboard/List";
import Grid from "../components/Dashboard/Grid";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function WatchlistPage() {
    const [coins, setCoins] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState("grid");
    const { user } = useAuth();
    const navigate = useNavigate();

    const theme = createTheme({
        palette: {
            primary: { main: "#3a80e9" },
        },
    });

    const style = {
        color: "var(--white)",
        width: "50vw",
        fontSize: "1.2rem",
        fontWeight: 600,
        fontFamily: "Inter",
        textTransform: "capitalize",
    };

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        getData();
    }, [user]);

    const getData = async () => {
        const wl = await getWatchlist();
        setWatchlist(wl);
        const allCoins = await get100Coins();
        if (allCoins) {
            const watchlistCoins = allCoins.filter((coin) =>
                wl.includes(coin.id)
            );
            setCoins(watchlistCoins);
            setLoading(false);
        }
    };

    return (
        <div>
            <Header/>
            {loading ? (
                <Loader/>
            ) : (
                <>
                    {coins.length === 0 ? (
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "60vh",
                            color: "var(--grey)",
                            fontSize: "1.5rem",
                        }}>
                            <p>"Watchlist is empty — add coins by clicking ⭐"</p>
                        </div>
                    ) : (
                        <ThemeProvider theme={theme}>
                            <TabContext value={value}>
                                <TabList
                                    onChange={(e, newValue) => setValue(newValue)}
                                    variant="fullWidth"
                                >
                                    <Tab label="Grid" value="grid" sx={style}/>
                                    <Tab label="List" value="list" sx={style}/>
                                </TabList>
                                <TabPanel value="grid">
                                    <div className="grid-flex">
                                        {coins.map((coin, i) => (
                                            <Grid coin={coin} key={i} watchlist={watchlist}/>
                                        ))}
                                    </div>
                                </TabPanel>
                                <TabPanel value="list">
                                    <table>
                                        {coins.map((coin, i) => (
                                            <List coin={coin} key={i} watchlist={watchlist}/>
                                        ))}
                                    </table>
                                </TabPanel>
                            </TabContext>
                        </ThemeProvider>
                    )}
                </>
            )}
        </div>
    );
}

export default WatchlistPage;