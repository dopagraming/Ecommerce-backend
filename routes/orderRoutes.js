const express = require('express');
const {
    filterOrderForLoggedUser
    , createCashOrder
    , findSpecificOrder
    , findAllOrders
    , updateOrderToPaid
    , updateOrderToDelivered } = require('../services/orderServices');
const { allowTo, protect } = require('../services/authServices');

const router = express.Router();

router.use(protect);

router.get(
    '/checkout-session/:cartId',
    allowTo('user'),
    checkoutSession
);

router.route('/:cartId').post(allowTo("user"), createCashOrder);
router.get(
    '/',
    allowTo('user', 'admin', 'manager'),
    filterOrderForLoggedUser,
    findAllOrders
);
router.get('/:id', findSpecificOrder);

router.put(
    '/:id/pay',
    allowTo('admin', 'manager'),
    updateOrderToPaid
);
router.put(
    '/:id/deliver',
    allowTo('admin', 'manager'),
    updateOrderToDelivered
);

module.exports = router;