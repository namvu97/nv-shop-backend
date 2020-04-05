let mongoose = require('mongoose');

let fileSchema = new mongoose.Schema({
    'image': { type: String, required: true }
});

let File = mongoose.model('file', fileSchema, 'files');
module.exports = File;