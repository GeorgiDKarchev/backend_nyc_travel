import './localEnv.js';
import {conn} from './db/conn.js';conn();
import express from 'express';
import morgan from 'morgan';
import cors from 'cors' //for connection to the frontend

import membersRoutes from './routes/members.js';



const app = express();
const PORT = process.env.PORT ||4000;

app.use(morgan('dev'));
app.use(cors());//when conecting to frontend
app.use(express.json());

app.use('/api/members', membersRoutes);

//main route
app.get('/', (req, res)=>{
    res.send('The API is working!')
})






app.listen(PORT, ()=> {
    console.log(`Server is running on port:${PORT}`);
});