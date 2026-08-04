const express = require('express');
const dotenv = require('dotenv');
const { sequelize, connectDB } = require('./config/db');
require('./models');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { errorHandler } = require('./middleware/errorMiddleware'); // <--- Eklendi

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Rotaları
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Sağlık Kontrolü
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'Task Manager API çalışıyor.' });
});

// Global Error Handler (Rotalardan sonra en sonda olmalı)
app.use(errorHandler); // <--- Eklendi

connectDB().then(() => {
  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(`Sunucu http://localhost:${PORT} adresinde aktif.`);
    });
  });
});
