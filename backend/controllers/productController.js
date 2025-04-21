const product = require("../models/productModels")
const Category = require("../models/categoryModels")
const mongoose = require("mongoose");
const error = require("multer/lib/multer-error");
exports.createProductController = async (req, res) => {
    try {
        const {
            name,
            image,
            category,
            subcategory,
            unit,
            stock,
            price,
            discount,
            description,
        } = req.body

        const newProduct = new product({
            name,
            image,
            category,
            subcategory,
            unit,
            stock,
            price,
            discount,
            description,
        })
        const saveProduct = await newProduct.save()
        return res.status(200).json({
            message: "Product created successfully",
            success: true,
            data: saveProduct,
            error: false
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: error.message,
            success: false,
        });
    }
}

exports.getProductController = async (req, res) => {
    try {
        let {page, limit, search} = req.body;

        if (!page) {
            page = 1;
        }
        if (!limit) {
            limit = 10;
        }
        let query = search ? {
            $text: {
                $search: search
            }
        } : {}


        const skip = (page - 1) * limit

        const [productData, totalCount] = await Promise.all([
            product.find(query).sort({createdAt: -1}).skip(skip).limit(limit).populate('category', 'subcategory'),
            product.countDocuments(query),
        ])

        return res.status(200).json({
            message: "Product data",
            error: false,
            success: true,
            totalCount: totalCount,
            totalNoPage: Math.ceil(totalCount / limit),
            data: productData
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: error.message,
            success: false,
        });
    }
}

exports.getProductByCategoryController = async (req, res) => {
    try {
        const {id} = req.body;
        const productData = await product.find({
            category: {$in: id}
        }).limit(15)

        return res.status(200).json({
            message: "Product data",
            error: false,
            success: true,
            data: productData
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: error.message,
            success: false,
        });
    }
}

exports.getProductByCategoryAndSubCategoryController = async (req, res) => {
    try {
        let {categoryId, subCategoryId, page, limit} = req.body

        if (!categoryId || !subCategoryId) {
            return res.status(400).json({
                message: "Provide categoryId and subCategoryId",
                error: true,
                success: false
            })
        }

        if (!page) {
            page = 1
        }

        if (!limit) {
            limit = 10
        }

        const query = {
            category: {$in: categoryId},
            subcategory: {$in: subCategoryId}
        }

        const skip = (page - 1) * limit

        const [data, dataCount] = await Promise.all([
            product.find(query).sort({createdAt: -1}).skip(skip).limit(limit),
            product.countDocuments(query)
        ])

        return res.status(200).json({
            message: "Product list",
            data: data,
            totalCount: dataCount,
            page: page,
            limit: limit,
            success: true,
            error: false
        })

    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}

exports.getProductDetailController = async (req, res) => {
    try {
        const {productId} = req.body;
        const productData = await product.findOne({_id: productId})
        return res.status(200).json({
            message: "Get Product Detail Successfully",
            data: productData,
            error: false,
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: error.message,
            success: false,
        })
    }
}

exports.updateProductController = async (req, res) => {
    try {
        const {_id} = req.body
        const updateProduct = await product.findByIdAndUpdate({_id: _id}, {
            ...req.body
        });
        return res.status(200).json({
            message: "Product updated successfully",
            success: true,
            data: updateProduct,
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
            success: false,
            error: true,
        });
    }
}

exports.deleteProductController = async (req, res) => {
    try {
        const {_id} = req.body
        const deleteProduct = await product.findByIdAndDelete(_id);
        return res.status(200).json({
            message: "Product deleted successfully",
            success: true,
            data: deleteProduct,
        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
            success: false,
            error: true,
        });
    }
}


exports.searchProductController = async (req, res) => {
    try {
        let {search, page, limit} = req.body;
        if (!page) {
            page = 1
        }

        if (!limit) {
            limit = 10
        }

        const query = search ? {
            $text: {
                $search: search,
            }
        } : {}

        const skip = (page - 1) * limit
        const [data, dataCount] = await Promise.all([
            product.find(query).sort({createdAt: -1}).skip(skip).limit(limit).populate("category", "subcategory"),
            product.countDocuments(query)
        ])

        return res.status(200).json({
            message: "Product search successfully",
            data: data,
            totalCount: dataCount,
            totalPage: Math.ceil(dataCount / limit),
            page: page,
            limit: limit,
            success: true,
            error: false
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}
