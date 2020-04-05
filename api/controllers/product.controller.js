const Product = require('../../models/product.model')
const Category = require('../../models/category.model')
const Order = require('../../models/order.model')
const File = require('../../models/file.model')
const User = require('../../models/admin/user.model')
module.exports.getNewProduct = async (req, res) => {
    try {
        let products = await Product.find().exec();
        res.json(products);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.getFetureProduct = async (req, res) => {
    try {
        let products = await Product.find({isFeatured: true}).exec();
        res.json(products);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports.getDetailProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id).exec();
        res.json(product);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.getAllCategory = async (req, res) => {
    try {
        let categories = await Category.find().exec();
        res.json(categories);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.getCategory = async (req, res) => {
    try {
        let category = await Product.find({category: req.params.id}).exec();
        res.json(category);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.searchProduct = async (req, res) => {
    try {
        let product = await Product.find({name: new RegExp(`.*${req.query.q}.*`, 'i')}).exec();
        res.json(product);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.orderProduct = async (req, res) => {
    try {
        console.log(req.body.phone !== '' && req.body.address !== '' && req.body.name !== '' && req.body.order !== null)
        if(req.body.phone.trim() !== '' && req.body.address.trim() !== '' && req.body.name.trim() !== '' && req.body.email.trim() !== '' && req.body.order !== null){
            req.body.status = "oke";
            let order = new Order(req.body);
            console.log(req.body)
            let result = await order.save();
            console.log(result)
            res.json(result);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

// module.exports.uploadImage = upload.single('file'), async (req, res, next) => {
//     console.log(req.file);
//     if(!req.file) {
//         res.status(500);
//         return next(err);
//     }
//     res.json({ fileUrl: 'http://127.0.0.1:7000/images/' + req.file.filename });
// }

module.exports.uploadImage = async (req, res, next) => {
    try {
        let file = new File({
            image: 'http://127.0.0.1:7000/' + req.file.filename
        });
        // if (!fileModel) { return res.status(403).send('not found file') }
        let data = await file.save();

        res.json(data);
    }

    catch (err) {
        res.send(err.message);
    }
}

module.exports.signinUser = async (req, res) => {
    let params = req.body;
    if(params.password.trim().length === 0 || params.username.trim().length === 0){
        res.json({message: "Please enter your information!"});
    }else {
        let data = await User.findOne({username: params.username}).exec();
        if(data){
            console.log(data.password)
            if(data.password === params.password){
                res.json({status: "oke"})
            }else{
                res.json({message: "Password is not matched!"});
            }
        }else {
            res.json({message: "Username is not exist!"});
        }
    }
}

module.exports.createUser = async (req, res) => {
    try {
        let user = new User(req.body);
        let result = await user.save();
        res.json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}