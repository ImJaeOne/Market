const askDB = require('../models/askDB');

exports.setAsk = async (req, res) => {
    const { askText, askDate, productID, userID } = req.body;
    try {
        await askDB.setAsk([askText, productID, userID]);
        res.status(200).json('setAsk success!');
    } catch (error) {
        console.log('setAsk failed...', error);
        res.status(500).json('setAsk failed...');
    }
};

exports.getAsk = async (req, res) => {
    const { productID } = req.params;
    console.log('getAsk:', productID);
    await askDB
        .getAsk(productID)
        .then((result) => {
            console.log('get Ask success!');
            res.status(200).json(result);
        })
        .catch((error) => {
            console.log('get Ask failed...', error);
            res.status(500).json(error, productID);
        });
};
