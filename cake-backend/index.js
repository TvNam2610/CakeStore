import cors from 'cors'
import express from 'express'
require('dotenv').config()
import initRoutes from './src/routes'
require('./dbConnect')

const app = express()
const corsOptions = {
    origin:[process.env.CLIENT_URL ,process.env.SERVER_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
   
};
app.use(cors(corsOptions));

console.log(process.env.CLIENT_ID);
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json()); 
.00
//crud
initRoutes(app)

const PORT = process.env.PORT || 8080

//server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})