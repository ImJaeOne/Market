const express = require('express');
const router = express.Router();
const askController = require('../controllers/ask');

router.post('/setAsk', askController.setAsk);
router.get('/getAsk', askController.getAsk);

module.exports = router;
