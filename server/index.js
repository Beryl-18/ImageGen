import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.json({limit: '5000000000'}))


app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.send('Hello from Dall-E');
})

const startServer = async () => {

    try {
        connectDb(process.env.MONGODB_URL);
        app.listen(8080, ()=> console.log('server started at http://localhost:8080. Server Listening' ));

    }
    catch (err) {
        console.log("error: ".err);
    }
    
}

startServer()
