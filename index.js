import './loadEnv.js';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// import moviesRouter from './routes/movies.js';
// import userRouter from './routes/users.js';


const app = express()
const PORT = process.env.PORT || 4000;



app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});