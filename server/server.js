const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

//connect mongoDB
mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB CONNECTED'))
  .catch((err) => console.log('DB CONNECTED ERROR', err));

//import routes
const authRoutes = require('./routes/auth');

//app middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
//app.use(cors());//allows all origin
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `http://localhost:3000` }));
}

//middleware
app.use('/api', authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`API is running on port ${PORT} - ${process.env.NODE_ENV}`);
});
