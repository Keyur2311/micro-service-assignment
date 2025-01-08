const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express()
const connectDB = require('./config/db')

connectDB()


sequelize.sync({ alter: true }).then(() => {
    console.log('Database tables synced');
});


app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));