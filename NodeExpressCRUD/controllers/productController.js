const db = require('../models')

//create main Model
const Product = db.products //import db product
const Review = db.reviews //import db reviews

//main work

//1. create product

const addProduct = async (req, res) => {

    let info = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    }

    const product = await Product.create(info)
    res.status(200).send(product)

}


//2. get all products

const getAllProducts = async (req, res) => {

    let products = await Product.findAll({
        // attribute: [
        //     'title',
        //     'price',
        // ] *kalau mau menampilkan beberapa data saja dari tabel
    })
    res.send(products)
}

//3. get single products

const getOneProducts = async (req, res) => {

    let id = req.params.id
    let product = await Product.findOne({ where: {
        id: id
    }})
    res.status(200).send(product)
} 

//4. update product

const updateProducts = async (req, res) => {

    let id = req.params.id

    const product = await Product.update(req.body, { where: { id: id }})

    res.status(200).send(product)
} 

//5. delete product by id

const deleteProducts = async (req, res) => {

    let id = req.params.id

    await Product.destroy({ where: { id: id }})

    res.status(200).send('Product is Deleted !')
}

//6. get published product

const getPublishedProducts = async (req, res) => {

    const products = await Product.findAll({ where: { published: true }})

    res.status(200).send(products)
}

module.exports = {
    addProduct,
    getAllProducts,
    getOneProducts,
    updateProducts,
    deleteProducts,
    getPublishedProducts
}