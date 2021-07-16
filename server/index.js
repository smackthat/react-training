require('dotenv').config();

require('./models/address');
require('./models/user');
require('./models/cartItem');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const orderRoute = require('./routes/order');
const authMiddlware = require('./utils/authMiddleware');

const PORT = process.env.PORT || 3001;
const DATABASE = process.env.DATABASE;

const app = express();
app.set('port', PORT);

app.use(cors());
app.use(express.json());

// Setupd middlwares
app.use(authMiddlware);

// Setup routes
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/order', orderRoute);

app.listen(PORT, () => {
  mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => {
      console.log(`Started on port ${PORT}, ${res.connection.name}`);
    });

});

module.exports = app;