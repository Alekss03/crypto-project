import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import List from "../components/Dashboard/List";

import axios from "axios";
import { coinObject } from "../functions/convertObject";
import CoinInfo from "../components/Coin/CoinInfo";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import LineChart from "../components/Coin/LineChart";
import { convertDate } from "../functions/convertDate";
import SelectDays from "../components/Coin/SelectDays";
import { settingChartData } from "../functions/settingChartData";
import TogglePriceType from "../components/Coin/PriceType";


function CoinPage() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [coinData, setCoinData] = useState();
    const [days, setDays] = useState(30);
    const [chartData, setChartData] = useState();
    const [priceType, setPriceType] = useState('prices');

    useEffect(() => {
        if (id) {
            getData();
        }
    }, [id]);

    async function getData() {
        const data = await getCoinData(id);
        if (data) {
            coinObject(setCoinData, data);
            const prices = await getCoinPrices(id, days, priceType);
            if (prices.length > 0) {
                setLoading(false);
                settingChartData(setChartData, prices, days);
            }
        }
    }

    const handleDaysChange = async (event) => {
        setLoading(true);
        setDays(event.target.value);
        const prices = await getCoinPrices(id, event.target.value, priceType);
        if (prices.length > 0) {
            settingChartData(setChartData, prices, event.target.value);
            setLoading(false);
        }
    };

    const handlePriceTypeChange = async (event, newType) => {
        setLoading(true);
        setPriceType(newType);
        const prices = await getCoinPrices(id, days, newType);
        if (prices.length > 0) {
            settingChartData(setChartData, prices, days);
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
                    <div className="grey-wrapper" style={{padding: "0rem 1rem"}}>
                        <List coin={coinData}/>
                    </div>
                    <div className="grey-wrapper">
                        <SelectDays days={days} handleDaysChange={handleDaysChange}/>
                        <TogglePriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/>
                        <LineChart chartData={chartData} priceType={priceType}/>
                    </div>
                    <CoinInfo heading={coinData.name} desc={coinData.desc}/>
                </>
            )}
        </div>
    );
}

export default CoinPage;