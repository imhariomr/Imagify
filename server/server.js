const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000; 
const connectDB = require('./config/mongodb');
const {userRouter} = require('./routes/userRoute');
const {imageRouter} = require('./routes/imageRoute');
const allowedOrigins = ['https://imagify-frontend-vily.onrender.com'];


dotenv.config();
// app.use(cors({ origin: '*' }));
app.use(cors({
    origin: allowedOrigins,  // Allows only requests from this domain
    methods: 'GET, POST, PUT, DELETE',  // Allows these HTTP methods
    allowedHeaders: 'Content-Type, Authorization',  // Allows these headers
  }));
  app.options('*', cors());  // Handles preflight requests

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
