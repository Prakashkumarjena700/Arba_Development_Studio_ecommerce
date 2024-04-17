const express = require('express')
const { authenticate } = require('../middleware/auth.middleware')
const { productModel } = require('../model/product.modal')

const productRoute = express.Router()

productRoute.use(authenticate)

productRoute.post("/create", async (req, res) => {
    try {
        const { title, description, price, category, image } = req.body
        let userId = req.userID

        const product = new productModel({ title, description, price, category, image, owner: userId })
        await product.save()
        res.send({ "msg": "Product has been created successfully", "success": true })

    } catch (err) {
        console.log(err);
        res.send({ "msg": "Product has not been created", "success": false, err })
    }
})


module.exports = {
    productRoute
}