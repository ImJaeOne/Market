const askDB = require('../models/askDB');

exports.setAsk = async (req, res) => {
    const { askText, productID, userID } = req.body;
    try {
        await askDB.setAsk([askText, productID, userID]);
        res.status(200).json('댓글 등록 성공');
    } catch (error) {
        res.status(500).json('댓글 등록 실패');
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
            res.status(500).json('댓글을 불러올 수 없음', error);
        });
};

exports.deleteAsk = async (req, res) => {
    const { askID } = req.body;
    await askDB.deleteAllAnswer(askID);
    await askDB
        .deleteAsk(askID)
        .then((result) => {
            res.status(200).json('댓글 삭제 성공');
        })
        .catch((error) => {
            res.status(500).json('댓글 삭제 실패', error);
        });
};
