require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Koneksi database berhasil');

        await sequelize.sync();
        console.log('tabel tersingkron');

        app.listen(PORT, () => {
            console.log(`server berjalan di http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log('gagal koneksi databse: ', error.message);
    }
}

startServer();