import { close, init } from "./databases/Mongo/index.js";

import binanceClient from "./services/binance/index.js";
import express from 'express';
import processData from './helpers/data-processing.js'

const app = express()
const { PORT } = process.env
const port = PORT || 3000;

// i'm not sure about the trading strategy, as it affect the implementation (pooling, websockets etc. )
// in this case i suppose the day-time range limitation could be used for the system to test-out approach
(async function () {
    // app.use("/trades") // this is how the routes should be connected to the app
    // due to the limited time, i would use "brute-force"-like approach and refactor the code if the time will left at the end
    app.get('/historical', async function (req, res, next) {
        try {
            // this could be fetched from DB in the future
            // or be configurable depending on business-logic
            const symbol = "BNBUSDT";
            const interval = "1d";

            const klinesResponse = await binanceClient.klines(symbol, interval)
            const dataRaw = klinesResponse.data
            binanceClient.logger.log(dataRaw);

            // save fetched data to DB for future analyzes / processing / caching / request optimizations

            // in case of processing in place
            const dataProcessed = processData(dataRaw);

            res.send(dataProcessed);
        } catch (error) {
            binanceClient.logger.error(error);
            next(new Error("Binance API error, can't post an order"))
        }
    });

    // opening connection to the MongoDB cluster
    await init();

    // server initialization status
    app.listen(port, () => {
        console.log(`Server is listening on: http://localhost:${port}`);
    })

    // default error handling mechanism (for all endpoints)
    app.use((err, req, res, next) => {
        console.error(err.stack)

        res.status(500).send('Sorry, the server is temporary unavailable');
    })
})()

// handler of unhandledRejection or system interruptions of sever
// TODO: potentially other logging mechanism could be used here
process.on('unhandledRejection', async (error) => {
    console.error('server unhandledRejection:', error?.message);
    console.error(error);

    // closing connection with MongoDB cluster
    await close();
}); 
