const askDB = require('../models/askDB');

exports.setAsk = async (req, res) => {
    const { askText, productID, userID } = req.body;
    try {
        await askDB.setAsk([askText, productID, userID]);
        res.status(200).json('setAsk success!');
    } catch (error) {
        res.status(500).json('setAsk failed...');
    }
};

exports.getAsk = async (req, res) => {
    const { productID } = req.params;
    await askDB
        .getAsk(productID)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};

exports.deleteAsk = async (req, res) => {
    const { askID } = req.body;
    await askDB.deleteAllAnswer(askID);
    await askDB
        .deleteAsk(askID)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};
