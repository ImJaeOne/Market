const express = require('express');
const cors = require('cors');
const app = express();
const port = 3006;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('ㅋㅋ');
});

app.listen(port, () => {
    console.log('one-market-server on!');
});
