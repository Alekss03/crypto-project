import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import Search from "../components/Dashboard/Search";
import PaginationComponent from "../components/Dashboard/Pagination";
import Loader from "../components/Common/Loader";
import BackToTop from "../components/Common/BackToTop";

function DashboardPage() {
    const [coins, setCoins] = useState([]);
    const [paginatedCoins, setPaginatedCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex = (value - 1) * 10;
    setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10))
    };

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    var filteredCoins = coins.filter(
        (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.symbol.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        axios
            .get(
                "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
            )
            .then((response) => {
                console.log("RESPONSE>>>", response.data);
                setCoins(response.data);
                setPaginatedCoins(response.data.slice(0, 10));
                setLoading(false);
            })
            .catch((error) => {
                console.log("ERROR>>>", error.message);
            });
    }, []);

    return (
        <>
            <Header/>
            <BackToTop/>
            {loading?(
                <Loader/>
            ):(
                <div>
                    <Search search={search} onSearchChange={onSearchChange}/>
                    <TabsComponent coins={search ? filteredCoins :paginatedCoins}/>
                    {!search && (
                    <PaginationComponent 
                        page={page} 
                        handleChange={handlePageChange}
                    />
                )}
                </div>
            )}
        </>
    );
}

export default DashboardPage;