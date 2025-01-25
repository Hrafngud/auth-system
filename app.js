const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const sequelize = require('./config/db');

dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));

app.use('/', authRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running on http://localhost:3000'));
});
