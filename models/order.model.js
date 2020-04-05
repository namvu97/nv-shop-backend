var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    email: String,
    phone: String,
    address: String,
    name: String,
    orders: Array,
    status: String
});

var Order = mongoose.model('Order', orderSchema, 'orders');

module.exports = Order;