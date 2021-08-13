// const express = require("express");
const router = require("express").Router();
const mongoose = require('mongoose');
const categorySchema = require('../schema/categorySchema');
const Category = new mongoose.model('Category', categorySchema);

// Get all Category route
router.get("/", async (req, res) => {
  const categories = await Category.find({}, (err, docs) => {
    if (err) {
      res.status(500).json({
        error: "There was an error",
      });
    } else {
      res.status(500).json({
        categoris: docs,
      });
    }
  });
});

// Add new category
router.post("/", async (req, res) => {
  const newCategory = new Category(req.body)
  await newCategory.save((err) => {
    if(err){
      res.status(500).json({error: 'server side error'})
    } else{
      res.status(200).json({message: 'category added successfully'})
    }
  })
})

// update category

router.put("/:id", async (req, res) => {
  const {name, shortDesc } = req.body;
  await Category.updateOne({_id: req.params.id}, {$set: {name: name, shortDesc: shortDesc}}, (err) => {
    if(err){
      res.status(500).json({error: 'server side error'})
    } else{
      res.status(200).json({message: 'category added successfully'})
    }
  })
});

module.exports = router;
