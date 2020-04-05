var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    category: String,
    name: String,
    image: String,
    price: Number,
    status: String,
    accessories: String,
    promotion: String,
    details: String,
    isStock: Boolean,
    isFeatured: Boolean,
    comments: Array,
    createdAt: Date,
    updatedAt: Date
});

var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;