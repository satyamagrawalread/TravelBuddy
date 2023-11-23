require('dotenv').config();
const express = require('express');
const port = process.env.PORT;

const app = express();
const bodyparser = require('body-parser');
const cors = require('cors')
//
require('./db');
require('./models/User');
//
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
// app.use(cors({credentials: true, origin: true}));
app.use(cors());
app.use(bodyparser.json());
app.use(authRoutes);

app.get('/', (req, res) => {
    console.log("Request to home page");
    res.send('This is home page');
})

app.listen(port, (req, res) => {
    console.log(`Server is listening on PORT: ${port}`)
})