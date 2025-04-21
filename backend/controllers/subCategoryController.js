const subCategory = require("../models/subCategoryModels");
exports.AddSubCategoryController = async (req, res) => {
  try {
    const { name, image, category } = req.body;
    if (!name && !image && !category) {
      return res.status(400).json({
        message: "Please provide name image and category to add sub categories",
        success: false,
        error: true,
      });
    }

    const payload = {
      name,
      image,
      category,
    };
    const createSubCategory = new subCategory(payload);
    const saveSubcategory = await createSubCategory.save();

    return res.status(201).json({
      message: "Subcategory added successfully",
      success: true,
      data: saveSubcategory,
      error: false,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
      success: false,
      error: true,
    });
  }
};

exports.GetSubCategoryController = async (req, res) => {
  try {
    const getSubCategory = await subCategory.find();
    return res.status(200).json({
      message: "Subcategories fetched successfully",
      success: true,
      data: getSubCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: e.message,
      success: false,
      error: true,
    });
  }
};

exports.UpdateSubCategoryController = async (req, res) => {
  try {
    const { _id, name, image, category } = req.body;
    const checkSub = await subCategory.findById(_id);
    if (!checkSub) {
      return res.status(400).json({
        message: "Subcategory not found",
        success: false,
        error: true,
      });
    }

    const update = await subCategory.findByIdAndUpdate({_id: _id}, {
      name,
      image,
      category,
    });
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

exports.DeleteSubCategoryController = async (req, res) => {
  try {
    const { _id } = req.body;
    const deleteSubCategory = await subCategory.findOneAndDelete({_id: _id});
    return res.status(200).json({
      message: "Category deleted successfully",
      success: true,
      error: false,
      data: deleteSubCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: error.message,
    });
  }
};
