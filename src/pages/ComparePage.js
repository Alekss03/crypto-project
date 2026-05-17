import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import SelectCoins from "../components/Compare/SelectCoins";
import Loader from "../components/Common/Loader";
import { get100Coins } from "../functions/get100coins";
import { getCoinPrices } from "../functions/getCoinPrices";
import LineChart from "../components/Coin/LineChart";
import { convertDate } from "../functions/convertDate";
import { getCoinData } from "../functions/getCoinData";
import { coinObject } from "../functions/convertObject";
import List from "../components/Dashboard/List";

function ComparePage() {
    const [allCoins, setAllCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [crypto1, setCrypto1] = useState("bitcoin");
    const [crypto2, setCrypto2] = useState("ethereum");
    const [coin1Data, setCoin1Data] = useState({});
    const [coin2Data, setCoin2Data] = useState({});
    const [days, setDays] = useState(30);
    const [chartData, setChartData] = useState();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const coins = await get100Coins();
        if (coins) {
            setAllCoins(coins);
            const data1 = await getCoinData("bitcoin");
            const data2 = await getCoinData("ethereum");
            coinObject(setCoin1Data, data1);
            coinObject(setCoin2Data, data2);
            await getChartData("bitcoin", "ethereum", days);
            setLoading(false);
        }
    };

    const getChartData = async (c1, c2, d) => {
        const prices1 = await getCoinPrices(c1, d, "prices");
        const prices2 = await getCoinPrices(c2, d, "prices");
        if (prices1.length > 0 && prices2.length > 0) {
            setChartData({
                labels: prices1.map((price) => convertDate(price[0], d)),
                datasets: [
                    {
                        label: c1,
                        data: prices1.map((price) => price[1]),
                        borderColor: "#3a80e9",
                        borderWidth: 2,
                        fill: false,
                        tension: 0.25,
                        pointRadius: 0,
                        yAxisID: "crypto1",
                    },
                    {
                        label: c2,
                        data: prices2.map((price) => price[1]),
                        borderColor: "#61c96f",
                        borderWidth: 2,
                        fill: false,
                        tension: 0.25,
                        pointRadius: 0,
                        yAxisID: "crypto2",
                    },
                ],
            });
        }
    };

    const onCoinChange = async (e, isCrypto2) => {
        if (isCrypto2) {
            setCrypto2(e.target.value);
            const data2 = await getCoinData(e.target.value);
            coinObject(setCoin2Data, data2);
            await getChartData(crypto1, e.target.value, days);
        } else {
            setCrypto1(e.target.value);
            const data1 = await getCoinData(e.target.value);
            coinObject(setCoin1Data, data1);
            await getChartData(e.target.value, crypto2, days);
        }
    };

    const handleDaysChange = async (e) => {
        setDays(e.target.value);
        await getChartData(crypto1, crypto2, e.target.value);
    };

    return (
        <div>
            <Header/>
            {loading ? (
                <Loader/>
            ) : (
                <>
                    <SelectCoins
                        allCoins={allCoins}
                        crypto1={crypto1}
                        crypto2={crypto2}
                        onCoinChange={onCoinChange}
                        days={days}
                        handleDaysChange={handleDaysChange}
                    />
                    {coin1Data?.id && (
                        <div className="grey-wrapper">
                            <List coin={coin1Data}/>
                        </div>
                    )}
                    {coin2Data?.id && (
                        <div className="grey-wrapper">
                            <List coin={coin2Data}/>
                        </div>
                    )}
                    {chartData && (
                        <div className="grey-wrapper">
                            <LineChart chartData={chartData} multiAxis={true} priceType="prices"/>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default ComparePage;