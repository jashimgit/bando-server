import express from "express";
import mongoose from "mongoose";
import models from "../models";

const router = express.Router();

// Get all Category route
router.get("/", async (req, res) => {
  try {
    const categories = await models.Category.find({});
    if (categories.length <= 0) {
      res.status(404).json({
        name: "NotFound",
        categories,
        message: "Total document: " + categories.length,
      });
    } else {
      res.status(200).json({
        name: "All Categories",
        categories,
        message: "Total document: " + categories.length,
      });
    }
  } catch (err) {
    res.status(404).json({
      name: "NotFound",
      categories,
      message: "Total document: " + categories.length,
    });
  }
});

// get single category

router.get("/:id", async (req, res) => {
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
  });
});

// Add new category
router.post("/", async (req, res) => {
  const newCategory = new models.Category(req.body);
  await newCategory.save((err) => {
    if (err) {
      res.status(500).json({ error: "server side error" });
    } else {
      res.status(200).json({ message: "category added successfully" });
    }
  });
});

// update category

router.put("/:id", async (req, res) => {
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
});

export default router;
