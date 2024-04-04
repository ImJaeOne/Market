const express = require('express');
const cors = require('cors');
const userRoutes = require('./userRoutes');

const app = express();
const port = 3006;

app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3005',
        credentials: true,
    })
);

app.use('/api', userRoutes);

app.listen(port, () => {
    console.log('one-market-server on!');
});
