require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const publisherRoutes = require('./routes/publisherRoutes');
const bookRoutes = require('./routes/bookRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/publishers', publisherRoutes);
app.use('/api/books', bookRoutes);

app.use(cors());
app.use(express.json());

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