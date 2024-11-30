const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000; 
const connectDB = require('./config/mongodb');
const {userRouter} = require('./routes/userRoute');
const {imageRouter} = require('./routes/imageRoute');
const corsOptions = {
    origin: 'https://imagify-frontend-vily.onrender.com', // Replace with the actual frontend URL
    allowedHeaders: ['Content-Type', 'Authorization', 'token'], // Allow 'token' header
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow necessary HTTP methods
    credentials: true, // Enable credentials if you're sending cookies or other credentials
    preflightContinue: false,
    optionsSuccessStatus: 200, // Ensures the preflight request gets the correct status code
};

app.use(cors(corsOptions));


// app.use(cors());

dotenv.config();

app.use(express.json());

connectDB();

app.use('/api/v1/user',userRouter);
app.use('/api/v1/image',imageRouter);


app.get('/',(req,res)=>{
    res.send("API working");
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
