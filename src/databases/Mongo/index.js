import { MongoClient, ServerApiVersion } from 'mongodb';

const {
    MONGO_DB_USER,
    MONGO_DB_PASSWORD,
    MONGO_DB_CLUSTER_NAME,
    MONGO_DB_APP_NAME,
    ENVIRONMENT
} = process.env

// TODO: rewrite this file into the class-approach (OOP)
const uri = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_CLUSTER_NAME}/?retryWrites=true&w=majority&appName=${MONGO_DB_APP_NAME}`;
if (ENVIRONMENT === 'DEV') {
    console.log(uri);
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function init() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch {
        // Ensures that the client will close when you finish/error
        await close();
    }
}

async function close() {
    try {
        await client.close();
    } catch (error) {
        console.error("could not close MongoDB connection");
    }
}

export { init, close };
export default client;
