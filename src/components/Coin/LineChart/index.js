import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { convertNumber } from "../../../functions/convertNumbers";

function LineChart({ chartData, priceType, multiAxis }) {
    const options = {
        plugins: {
            legend: {
                display: multiAxis === true,
            },
        },
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false,
        },
        scales: multiAxis === true ? {
            crypto1: {
                position: "left",
                ticks: {
                    callback: function (value) {
                        if (priceType === "prices") return "$" + value.toLocaleString("en-US");
                        else return "$" + convertNumber(value);
                    },
                },
            },
            crypto2: {
                position: "right",
                grid: {
                    drawOnChartArea: false,
                },
                ticks: {
                    callback: function (value) {
                        return "$" + value.toLocaleString("en-US");
                    },
                },
            },
        } : {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
                },
                ticks: {
                    callback: function (value) {
                        return "$" + value.toLocaleString("en-US");
                    },
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
}

export default LineChart;