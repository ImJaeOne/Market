const answerDB = require('../models/answerDB');

exports.setAnswer = async (req, res) => {
    const { answerText, productID, userID, askID } = req.body;
    console.log(answerText, productID, userID, askID);
    try {
        await answerDB.setAnswer([answerText, productID, userID, askID]);
        res.status(200).json('답글 등록 성공');
    } catch (error) {
        res.status(500).json('답글 등록 실패', error);
    }
};

exports.getAnswer = async (req, res) => {
    const { productID } = req.params;
    await answerDB
        .getAnswer(productID)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json('답글 불러오기 실패', error);
        });
};

exports.deleteAnswer = async (req, res) => {
    const { answerID } = req.body;
    console.log(answerID);
    await answerDB
        .deleteAnswer(answerID)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
};
