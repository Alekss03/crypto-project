import { convertDate } from "./convertDate";

export const settingChartData = (setChartData, prices1, days, prices2 = null) => {
    setChartData({
        labels: prices1.map((price) => convertDate(price[0], days)),
        datasets: prices2 ? [
            {
                label: "Crypto 1",
                data: prices1.map((price) => price[1]),
                borderColor: "#3a80e9",
                borderWidth: 2,
                fill: false,
                tension: 0.25,
                pointRadius: 0,
            },
            {
                label: "Crypto 2",
                data: prices2.map((price) => price[1]),
                borderColor: "#e93a3a",
                borderWidth: 2,
                fill: false,
                tension: 0.25,
                pointRadius: 0,
                yAxisID: "crypto1",
            },
        ] : [
            {
                data: prices1.map((price) => price[1]),
                borderColor: "#3a80e9",
                borderWidth: 2,
                fill: true,
                backgroundColor: "rgba(58, 128, 233,0.1)",
                tension: 0.25,
                pointRadius: 0,
                yAxisID: "crypto2",
            },
        ],
    });
};