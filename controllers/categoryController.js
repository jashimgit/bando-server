import { isAdmin, sendResponse } from "../helpersFunctions";
import models from "../models";

const { Category } = models;
const { Subcategory } = models;

export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find({}).populate('subcategory', 'category name shortDesc -_id');
    res.status(200).json({
      message: 'success',
      categories,
    })
  } catch (err) {
    res.status(404).json({
      error: "No category found",
    });
  }
};

export const getSingleCategoryById = async (req, res) => {
  await models.Category.find({ _id: req.params.id }, (err, docs) => {
    if (err) {
      res.status(404).json({
        name: "NotFound",
        message: "document not found by id: " + req.params.id,
      });
    } else {
      res.status(200).json({
        name: "Ok",
        docs,
        message: "Document found",
      });
    }
  }).populate('subcategory', 'name, shortDesc');
};

export const postCategory = async (req, res) => {
  if (!isAdmin(req)) {
    return sendResponse(res, 403, { success: false, message: "forbidden" });
  }

  const newCategory = new Category({...req.body,});
  await newCategory.save((err) => {
    if (err) {
      res.status(500).json({ error: "server side error" });
    } else {
      res.status(200).json({ message: "category added successfully" });
    }
  });
};

export const updateCategoryById = async (req, res) => {
  const { name, shortDesc } = req.body;
  await models.Category.updateOne(
    { _id: req.params.id },
    { $set: { name: name, shortDesc: shortDesc } },
    (err) => {
      if (err) {
        res.status(500).json({ error: "server side error" });
      } else {
        res.status(200).json({ message: "category updated successfully" });
      }
    }
  );
};
