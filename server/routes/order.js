const router = require('express').Router();
const orderController = require('../controllers/orderController');

router.get('/:userId', orderController.getOrders);
router.post('/:userId', orderController.createOrder);

module.exports = router;
