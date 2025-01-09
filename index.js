require('dotenv').config();
const express = require('express');
const { connectDB, sequelize } = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

connectDB();

sequelize.sync({ alter: true }).then(() => {
    console.log('Database tables synced');
});

app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
