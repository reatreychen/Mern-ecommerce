const CategoryModel = require("../models/categoryModels");
const subCategory = require("../models/subCategoryModels");
const product = require("../models/productModels");
exports.AddCategoryController = async (req, res) => {
  try {
    const { name, image } = req.body;

    const category = new CategoryModel({
      name,
      image,
    });
    const saveCategory = await category.save();
    if (!saveCategory) {
      return res.status(400).json({
        message: "Category not saved",
        error: true,
      });
    }
    return res.status(200).json({
      message: "Category added successfully",
      category: saveCategory,
    });
  } catch {
    res.status(500).json({
      message: error.message,
      error: error.message,
    });
  }
};

exports.GetCategoryController = async (req, res) => {
  try {
    const data = await CategoryModel.find();

    return res.status(200).json({
      message: "Category fetched successfully",
      data: data,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: error.message,
    });
  }
};

exports.UpdateCategoryController = async (req, res) => {
  try {
    const { _id, name, image } = req.body;
    const update = await CategoryModel.updateOne(
      {
        _id: _id,
      },
      { name, image }
    );

    return res.status(200).json({
      message: "Category updated successfully",
      success: true,
      error: false,
      data: update,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: error.message,
    });
  }
};


exports.DeleteCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;
    const checkSubCategory = await subCategory.find({
      category: {
       "$in": [_id],
      },
    }).countDocuments();

    const checkProduct = await product.find({
      category: {
        "$in": [_id],
      },
    }).countDocuments();
    if (checkSubCategory > 0 || checkProduct > 0) {
      return res.status(400).json({
        message: "Category cannot be deleted as it has subcategories or products",
        success: false,
        error: true,
      });
    }
    const deleteCategory = await CategoryModel.deleteOne({
      _id: _id,
    });
    return res.status(200).json({
      message: "Category deleted successfully",
      success: true,
      error: false,
      data: deleteCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: error.message,
    });
  }
};
