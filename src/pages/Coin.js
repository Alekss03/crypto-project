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


function CoinPage() {
    const {id} = useParams();
    const [loading,setLoading] = useState(true);
    const [coinData,setCoinData] = useState();
    const [days,setDays] = useState(30);
    const [chartData,setChartData] = useState();

    useEffect(() => {
    if (id) {
            getData();
        }
    }, [id]);


    async function  getData() {

        const data = await getCoinData(id)

        if (data) {
            coinObject(setCoinData,data);
            const prices = await getCoinPrices(id,days);
            if (prices.length > 0){
                console.log("WOO");

                setChartData({
                    labels: prices.map((price)=> convertDate(price[0])),
                    datasets: [
                        {
                            data: prices.map((price)=> price[1]),
                            borderColor: "#3a80e9",
                            borderWidth: 2,
                            fill: true,
                            backgroundColor: "rgba(58, 128, 233,0.1)",
                            tension: 0.25,
                            borderColor: "#3a80e9",
                            pointRadius: 0,
                        },
                    ],
                });
                setLoading(false);
            }
        }
    }

    return (
        <div>      
                <Header/>
                {loading ? (
                <Loader/>
                ):(
                <>
                <div className="grey-wrapper" style={{padding:"0rem 1rem"}}>
                    <List coin = {coinData}/>
                </div>
                <div className="grey-wrapper">
                    <SelectDays/>
                    <LineChart chartData={chartData}/>
                </div>
                <CoinInfo heading = {coinData.name} desc = {coinData.desc}/>
                </>
            )}
        </div>
    );
}

export default CoinPage;