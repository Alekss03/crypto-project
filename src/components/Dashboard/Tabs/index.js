import { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '../Grid';
import CoinList from '../List';
import "./styles.css";

export default function TabsComponent({ coins, watchlist = [] }) {
    const [value, setValue] = useState('grid');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const style = {
        color: "var(--white)",
        width: "50vw",
        fontSize: "1.2rem",
        fontWeight: 600,
        fontFamily: "Inter",
        textTransform: "capitalize",
    };

    const theme = createTheme({
        palette: {
            primary: { main: "#3a80e9" },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <TabContext value={value}>
                <TabList onChange={handleChange} variant="fullWidth">
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
                            <CoinList coin={coin} key={i} watchlist={watchlist}/>
                        ))}
                    </table>
                </TabPanel>
            </TabContext>
        </ThemeProvider>
    );
}