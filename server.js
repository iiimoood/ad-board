const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const uri = `mongodb+srv://iiimoood:${process.env.DB_PASS}@cluster0.a9a0xii.mongodb.net/AdBoardDB?retryWrites=true&w=majority`;

const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

if (NODE_ENV === 'production') dbUri = uri;
else if (NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/AdBoardDBTest';
else dbUri = 'mongodb://localhost:27017/AdBoardDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

app.use(helmet());
if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
}
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: `${process.env.SECRET_CODE}`,
    store: MongoStore.create(mongoose.connection),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV == 'production',
    },
  })
);

app.use(express.static(path.join(__dirname, '/client/build')));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000.');
});

app.use('/api', adsRoutes);
app.use('/api', authRoutes);

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

module.exports = server;
