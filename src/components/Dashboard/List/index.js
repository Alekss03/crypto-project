import "./styles.css"
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from "@mui/material";
import { convertNumber } from "../../../functions/convertNumbers";
import { Link } from "react-router-dom";
import { useState } from "react";
import { addToWatchlist, removeFromWatchlist } from "../../../functions/watchlist";
import { toast } from "react-toastify";
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';

function List({ coin, watchlist = [] }) {
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
            <tr className="list-row">
                <Tooltip title="Coin Logo">
                    <td className="td-image">
                        <img src={coin.image} className="coin-logo" alt={coin.name}/>
                    </td>
                </Tooltip>
                <Tooltip title="Coin Info" placement="bottom-start">
                    <td>
                        <div className="name-col">
                            <p className="coin-symbol">{coin.symbol}</p>
                            <p className="coin-name">{coin.name}</p>
                        </div>
                    </td>
                </Tooltip>
                <Tooltip title="Price Change In 24Hrs" placement="bottom-start">
                    {coin.price_change_percentage_24h > 0 ? (
                        <td className="chip-flex">
                            <div className="price-chip">
                                {coin.price_change_percentage_24h
                                    ? coin.price_change_percentage_24h.toFixed(2)
                                    : "0.00"}%
                            </div>
                            <div className="icon-chip td-icon">
                                <TrendingUpRoundedIcon/>
                            </div>
                        </td>
                    ) : (
                        <td className="chip-flex">
                            <div className="price-chip chip-red">
                                {coin.price_change_percentage_24h
                                    ? coin.price_change_percentage_24h.toFixed(2)
                                    : "0.00"}%
                            </div>
                            <div className="icon-chip chip-red td-icon">
                                <TrendingDownRoundedIcon/>
                            </div>
                        </td>
                    )}
                </Tooltip>
                <Tooltip title="Current Price">
                    <td>
                        <h3
                            className="coin-price td-center-align"
                            style={{
                                color: coin.price_change_percentage_24h < 0 ? "var(--red)" : "var(--green)",
                            }}
                        >
                            ${coin.current_price.toLocaleString("en-US")}
                        </h3>
                    </td>
                </Tooltip>
                <Tooltip title="Total Volume" placement="bottom-end">
                    <td>
                        <p className="total_volume td-right-align td-total-volume">
                            {coin.total_volume.toLocaleString("en-US")}
                        </p>
                    </td>
                </Tooltip>
                <Tooltip title="Market Cap" placement="bottom-end">
                    <td className="desktop-td-mkt">
                        <p className="total_volume td-right-align">
                            ${coin.market_cap.toLocaleString("en-US")}
                        </p>
                    </td>
                </Tooltip>
                <Tooltip title="Market Cap" placement="bottom-end">
                    <td className="mobile-td-mkt">
                        <p className="total_volume td-right-align">
                            ${convertNumber(coin.market_cap)}
                        </p>
                    </td>
                </Tooltip>
                <Tooltip title="Add to Watchlist" placement="bottom-end">
                    <td onClick={handleWatchlist}>
                        {watching ? (
                            <StarRoundedIcon style={{color: "var(--blue)"}}/>
                        ) : (
                            <StarBorderRoundedIcon style={{color: "var(--grey)"}}/>
                        )}
                    </td>
                </Tooltip>
            </tr>
        </Link>
    );
}

export default List;