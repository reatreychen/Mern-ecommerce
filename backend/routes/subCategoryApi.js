const express = require("express")
const subCategoryRouter = express.Router()
const auth = require("../middleware/authToken")
const subCategoryController = require("../controllers/subCategoryController")


// sub categories
subCategoryRouter.post(
    "/create-sub-category",
    auth,
    subCategoryController.AddSubCategoryController
  );
  subCategoryRouter.get(
    "/get-sub-category",
    auth,
    subCategoryController.GetSubCategoryController
  );
  subCategoryRouter.put(
    "/update-sub-category",
    auth,
    subCategoryController.UpdateSubCategoryController
  );
  subCategoryRouter.delete(
    "/delete-sub-category",
    auth,
    subCategoryController.DeleteSubCategoryController
  );

module.exports = subCategoryRouter