import React, { useState } from "react";
import "./styles.css";
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Link } from "react-router-dom";
import { addToWatchlist, removeFromWatchlist } from "../../../functions/watchlist";
import { toast } from "react-toastify";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';

function Grid({ coin, watchlist = [] }) {
    const [watching, setWatching] = useState(watchlist.includes(coin.id));

    const handleWatchlist = async (e) => {
        e.preventDefault();
        if (watching) {
            await removeFromWatchlist(coin.id);
            toast.error(`${coin.name} видалено з Watchlist`);
        } else {
            await addToWatchlist(coin.id);
            toast.success(`${coin.name} додано до Watchlist`);
        }
        setWatching(!watching);
    };

    return (
        <Link to={`/coin/${coin.id}`} style={{textDecoration: "none"}}>
            <div className={`grid-container ${coin.price_change_percentage_24h < 0 && "grid-container-red"}`}>
                <div className="info-flex">
                    <img src={coin.image} className="coin-logo" alt={coin.name}/>
                    <div className="name-col">
                        <p className="coin-symbol">{coin.symbol.toUpperCase()}</p>
                        <p className="coin-name">{coin.name}</p>
                    </div>
                    <div className="watchlist-icon" onClick={handleWatchlist}>
                        {watching ? (
                            <StarRoundedIcon style={{color: "var(--blue)"}}/>
                        ) : (
                            <StarBorderRoundedIcon style={{color: "var(--grey)"}}/>
                        )}
                    </div>
                </div>
                {coin.price_change_percentage_24h > 0 ? (
                    <div className="chip-flex">
                        <div className="price-chip">
                            {coin.price_change_percentage_24h
                                ? coin.price_change_percentage_24h.toFixed(2)
                                : "0.00"}%
                        </div>
                        <div className="icon-chip">
                            <TrendingUpRoundedIcon/>
                        </div>
                    </div>
                ) : (
                    <div className="chip-flex">
                        <div className="price-chip chip-red">
                            {coin.price_change_percentage_24h
                                ? coin.price_change_percentage_24h.toFixed(2)
                                : "0.00"}%
                        </div>
                        <div className="icon-chip chip-red">
                            <TrendingDownRoundedIcon/>
                        </div>
                    </div>
                )}
                <div className="info-container">
                    <h3
                        className="coin-price"
                        style={{
                            color: coin.price_change_percentage_24h < 0 ? "var(--red)" : "var(--green)",
                        }}
                    >
                        ${coin.current_price.toLocaleString("en-US")}
                    </h3>
                    <p className="total_volume">
                        Total Volume: {coin.total_volume.toLocaleString("en-US")}
                    </p>
                    <p className="total_volume">
                        Market Cap: {coin.market_cap.toLocaleString("en-US")}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default Grid;