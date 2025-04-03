import Categorie from "../model/Categorie.js";


export const getAllCategorie = async (req, res) => {
    const categorie = await Categorie.findAll();
    categorie ? res.status(201).json({ categorie }) : res.status(404).json({ message: 'Aucune catégorie' });
}

export const getCategorieById = async (req, res) => {
    const id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: 'Renseigner un INT' });
    }
    const categorie = await Categorie.findByPk(id);
    categorie ? res.status(201).json({ categorie }) : res.status(201).json({ message: 'Cette catégorie n existe pas' });
}

export const addCategorie = async (req, res) => {
    if(!isNaN(req.params.nom) && !isNaN(req.params.description)) {
        return res.status(400).json({ message: 'Renseinger un VARCHARD' });
    }
    const categorieExist = await Categorie.findOne({ where: { nom: req.params.nom } });
    if (categorieExist) {
        return res.status(400).json({ message: 'Cette categorie existe déjà' });
    }
    const categorie = await Categorie.create({
        nom: req.params.nom,
        description: req.params.description
    })
    categorie ? res.status(201).json({ categorie }) : res.status(201).json({ message: 'Aucune catégories' });
}

export const updateCategorie = async (req, res) => {
    const id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: 'Renseigner un INT' });
    }
    if(!isNaN(req.params.nom) && !isNaN(req.params.description)) {
        return res.status(400).json({ message: 'Renseinger un VARCHARD' });
    }
    const categorie = await Categorie.findByPk(id);
    if (!categorie) {
        return res.status(400).json({ message: 'Cette catégorie n existe pas' });
    }
    categorie.nom = req.params.nom
    categorie.description = req.params.description
    await categorie.save();
    categorie ? res.status(201).json({ categorie }) : res.status(404).json({ message: 'Problème ajout catégorie' });
}

export const deleteCategorie = async (req, res) => {
    const id = parseInt(req.params.id);
    if (!Number.isInteger(id)) {
        return res.status(400).json({ message: 'Renseigner un INT' });
    }
    const categorie = await Categorie.findByPk(id);
    if (!categorie) {
        return res.status(400).json({ message: 'Cette catégorie n existe pas' });
    }
    const produit = await Categorie.findAll({ where: { id: id } });
    if (produit.length >= 0) {
        return res.status(400).json({ message: 'Impossible de supprimer cette categorie car elle est utilisée dans un produit' });
    }
    await categorie.destroy();
    categorie ? res.status(201).json({ categorie, message : 'Catégorie supprimer' }) : res.status(404).json({ message: 'Problème sur la suppression' });
}