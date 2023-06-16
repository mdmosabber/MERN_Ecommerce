const { readdirSync } = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const multer = require('multer');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');


require('dotenv').config();
const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	max: 100, 
	standardHeaders: true, 
	legacyHeaders: false,
})


//Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(limiter)

app.use(cors({
  origin: ["https://mern-ecommerce-frontend-six.vercel.app/"],
  methods: ["POST", "GET"],
  credentials: true
}));


//Router middleware
readdirSync('./src/routes').map((routeFile) =>  app.use('/api/v1', require(`./src/routes/${routeFile}`)));


//404 error handle
app.use((req,res, next)=> {
    res.status(404).json({message: '4💕4 Not Found'})
})


//error handle
// app.use(errorHandling);

const port = process.env.PORT || 8000;
const database = process.env.DATABASE;


mongoose.connect(database)
.then(()=> {
	app.listen(port, ()=> {
		console.log(`Server Run Successfully at http://localhost:${port}`);
	})
}).catch(error => {
    console.log(error.message)
})
