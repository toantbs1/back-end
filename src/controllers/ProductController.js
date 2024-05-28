const ProductService = require('../services/ProductService');

const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description } = req.body
        if (!name || !image || !type || !price || !countInStock || !rating) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is not required'
            })
        }
        response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }
}

const getDetailProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is not required'
            })
        }
        response = await ProductService.getDetailProduct(productId)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is not required'
            })
        }
        response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }
}

const deleteManyProduct = async (req, res) => {
    try {
        const Ids = req.body.Ids
        if (!Ids) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The productId is not required'
            })
        }
        response = await ProductService.deleteManyProduct(Ids)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const { limit, page, sort, filter } = req.query
        response = await ProductService.getAllProduct(Number(limit) || 8, Number(page) || 0, sort, filter)
        return res.status(200).json(response)
    } catch (err) {
        return res.status(404).json({
            message: err
        })
    }
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct
}