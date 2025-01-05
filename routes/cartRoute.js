const express = require('express');


const { addProductToCart, getLoggedUserCart, clearCart, applyCoupon, updateCartItemQuantity, removeSpecificCartItem } = require('../services/cartServices');
const { allowTo, protect } = require('../services/authServices');

const router = express.Router();

router.use(protect, allowTo('user'));
router
    .route('/')
    .post(addProductToCart)
    .get(getLoggedUserCart)
    .delete(clearCart);

router.put('/applyCoupon', applyCoupon);

router
    .route('/:itemId')
    .put(updateCartItemQuantity)
    .delete(removeSpecificCartItem);

module.exports = router;