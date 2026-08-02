const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false, // Konsolda SQL sorgu kalabalığını önler
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL Veritabanı Bağlantısı Başarılı.');
  } catch (error) {
    console.error('Veritabanına bağlanılamadı:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
