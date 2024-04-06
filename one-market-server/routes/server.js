const express = require('express');
const cors = require('cors');
const userRoutes = require('./userRoutes');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const morgan = require('morgan');

const app = express();
const port = 3006;

app.use(morgan('dev'));

app.get('/favicon.ico', (req, res) => res.status(204));

app.use(
    session({
        secret: 'av*Sve#sd%%fdsa',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({ path: './sessions' }),
    })
);
app.use(
    cors({
        origin: 'http://localhost:3005',
        credentials: true,
    })
);

app.use(express.json());

app.use('/api', userRoutes);

app.listen(port, () => {
    console.log('one-market-server on!');
});
