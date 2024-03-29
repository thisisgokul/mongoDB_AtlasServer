const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieparser=require('cookie-parser');
const mongooseConnect=require("./config/config")
const userRoutes = require('./routes/routes');



const app = express();

// Middleware

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieparser())



// Connect to MongoDB
mongooseConnect();
// Routes
app.use('/', userRoutes);

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
