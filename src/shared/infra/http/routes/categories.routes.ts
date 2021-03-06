import { Router } from "express";
import multer from "multer";

import CreateCategoryController from "@modules/cars/useCases/createCategory/CreateCategoryController";
import ImportCategoryController from "@modules/cars/useCases/importCategory/ImportCategoryController";
import ListCategoriesController from "@modules/cars/useCases/listCategories/ListCategoriesController";

import upload from "../../../../config/upload";
import ensureAdmin from "../middlewares/ensureAdmin";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const categoriesRoutes = Router();
const uploadCategoriesFiles = multer(upload);

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.use(ensureAuthenticated);

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);
categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  ensureAuthenticated,
  ensureAdmin,
  uploadCategoriesFiles.single("file"),
  importCategoryController.handle
);

export default categoriesRoutes;
