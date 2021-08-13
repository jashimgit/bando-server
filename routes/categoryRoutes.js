// const express = require("express");
const router = require('express').Router()
const Category = require("../model/categoryModel");

// Get all Category route
router.get("/", async (req, res) => {
  
});

// Add new category
router.post("/", async (req, res) => {
  const newCategory = new Category(req.body);
  await newCategory.save((err) => {
    if (err) {
      res.status(500).json({
        error: "There was an error",
      });
    } else {
      res.status(500).json({
        message: "Category added successfully",
      });
    }
  });
});


module.exports = router;