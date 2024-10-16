import { Spot } from '@binance/connector';

const { BINANCE_API_KEY: apiKey,
    BINANCE_API_SECRET: apiSecret,
    // BINANCE_API_TESTNET_URL: baseUrl
    BINANCE_API_BASE_URL: baseUrl
} = process.env;

// TODO: to setup a custom generated keys to enhance security (Key Pair Based Authentication)
// TODO: to setup and connect proxy
const client = new Spot(apiKey, apiSecret, { baseUrl });

export default client;
