require('dotenv').config();
const express = require('express');
const port = process.env.PORT;

const app = express();
const bodyparser = require('body-parser');
const cors = require('cors')
//
require('./db');
require('./models/User');
require('./models/Profile');
require('./models/UserImages');
require('./models/Post');
//
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const imageRoutes = require('./routes/imageRoutes');
const postRoutes = require('./routes/postRoutes');

app.use(express.json());
// app.use(cors({credentials: true, origin: true}));
app.use(cors());
app.use(bodyparser.json());
app.use(authRoutes);
app.use(profileRoutes);
app.use(imageRoutes);
app.use(postRoutes);

app.get('/', (req, res) => {
    console.log("Request to home page");
    res.send('This is home page');
})

app.listen(port, (req, res) => {
    console.log(`Server is listening on PORT: ${port}`)
})