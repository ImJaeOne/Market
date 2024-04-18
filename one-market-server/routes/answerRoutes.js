const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answer');

router.post('/setAnswer', answerController.setAnswer);
router.get('/getAnswer/:productID', answerController.getAnswer);
router.delete('/delete', answerController.deleteAnswer);

module.exports = router;
