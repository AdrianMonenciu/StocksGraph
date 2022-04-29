import './App.css';
import React, { useEffect, useState } from 'react';
import StocksGraph from './StocksGraph';
import SelectionMenu from './SelectionMenu';

const API_KEY = 'f3de163b32a458ec653a5918675acfce';
const STOCKS_URL_BASE = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=';

function App() {
  const [stockXValue, setStockXValue] = useState([])
  const [stockYValue, setStockYValue] = useState([])
  const [selectedStock, setSelectedStock] = useState ("FB")
  const [selectedTimeExtension, setSelectedTimeExtension] = useState (100)

  const stockOptions = ["FB", "TSLA", "AAPL", "AMD", "INTC", "AMZN", "ZM", "MSFT", "NIO", "T", "ZNGA", "CSCO", "HPQ"]
  const timeFrameOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

  useEffect(() => {
    fetch(`${STOCKS_URL_BASE}${selectedStock}&apikey=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setStockXValue([...Object.keys(data['Time Series (Daily)'])])
        let tempStockYValue = []
        for (let key in data['Time Series (Daily)']) {
          tempStockYValue.push(data['Time Series (Daily)'][key]['1. open'])
        }
        setStockYValue(tempStockYValue)
      })
  }, [selectedStock, selectedTimeExtension])

  return (
    <>
      <h1>Stock Graph</h1>
      <div className="SelectionMenu">
        <label>Select the Stock: </label>
        <SelectionMenu 
          options={stockOptions}
          selectedOption={selectedStock}
          onChangeOption={e => setSelectedStock(e.target.value)}
        />
        <label>  Select the Time Extension in days: </label>
        <SelectionMenu 
          options={timeFrameOptions}
          selectedOption={selectedTimeExtension}
          onChangeOption={e => setSelectedTimeExtension(e.target.value)}
        />
      </div>
      <div>    
        <StocksGraph 
          stockXValue={stockXValue.slice(0, selectedTimeExtension)} 
          stockYValue={stockYValue.slice(0, selectedTimeExtension)} />
      </div>
    </>
  );
}

export default App;
