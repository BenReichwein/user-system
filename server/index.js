const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors')
const fs = require('fs')
const db = require('./config/db')
const PORT = process.env.PORT || 8080
// All the setup for our api
const app = express();
// Initializes the database
db();
const corsOptions = {
  origin: [
    "http://localhost:3000"
  ],
  credentials: true,
  exposedHeaders: ["token"]
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const routes = require('./routes/routes.js')(app, fs)

app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`)
})