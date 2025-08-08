const express = require("express")
const categoryRouter = express.Router()
const auth = require("../middleware/authToken")
const categoryController = require("../controllers/categoryController")

// categories
categoryRouter.post("/add-category", auth, categoryController.AddCategoryController);
categoryRouter.get("/get-category", categoryController.GetCategoryController);
categoryRouter.put(
  "/update-category",
  auth,
  categoryController.UpdateCategoryController
);

categoryRouter.delete(
  "/delete-category",
  auth,
  categoryController.DeleteCategoryController
);

module.exports = categoryRouter