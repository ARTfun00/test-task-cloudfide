// data processing algorithm
function processData(dataArray, dateRange) {
    dataArray.forEach(dataByTimePeriod => {
        // dataByTimePeriod looks like:
        // [
        //     1499040000000,      // Kline open time
        //     "0.01634790",       // Open price
        //     "0.80000000",       // High price
        //     "0.01575800",       // Low price
        //     "0.01577100",       // Close price
        //     "148976.11427815",  // Volume
        //     1499644799999,      // Kline Close time
        //     "2434.19055334",    // Quote asset volume
        //     308,                // Number of trades
        //     "1756.87402397",    // Taker buy base asset volume
        //     "28.46694368",      // Taker buy quote asset volume
        //     "0"                 // Unused field, ignore.
        // ]  
        const [
            openTime,
            openPrice,
            highPrice,
            lowPrice,
            closePrice,
            volume,
            klineCloseTime,
            quoteAssetVolume,
            numberOfTrades,
            takerBuyBaseAssetVolume,
            takerBuyQuoteAssetVolume
        ] = dataByTimePeriod

        // analyzes / algorithm here
    });
}

export default processData