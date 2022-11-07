const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const taskRoutes = require('./routes/task.route');
const connectDB = require('./db/connect.db')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.set('trust proxy', 1);
app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 100}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use('/api/v1/tasks', taskRoutes);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();