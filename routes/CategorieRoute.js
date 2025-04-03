import { Router } from "express";
import { addCategorie, deleteCategorie, getAllCategorie, getCategorieById, updateCategorie } from "../controller/CategorieController.js";

const route = Router();

route.get("/categorie", getAllCategorie);
route.get("/categorie/:id", getCategorieById);

route.post("/categorie/add/:nom/:description", addCategorie);

route.put("/categorie/update/:id/:nom/:description", updateCategorie);

route.delete("/categorie/delete/:id", deleteCategorie);

export default route;