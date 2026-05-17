import axios from "axios";

export const getCoinPrices = async (id, days, priceType) => {
    try {
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
            {
                headers: {
                    'x-cg-demo-api-key': process.env.REACT_APP_COINGECKO_API_KEY
                }
            }
        );
        return response.data[priceType] || [];
    } catch (error) {
        console.log("ERROR>>>", error.message);
        return [];
    }
};