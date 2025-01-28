require('dotenv').config();

module.exports = {
  development: {
    host: process.env.DEV_DATABASE_HOST,
    username: process.env.DEV_DATABASE_USER,
    password: process.env.DEV_DATABASE_PASSWORD,
    database: process.env.DEV_DATABASE_NAME,
    dialect: 'mysql',
  }
}