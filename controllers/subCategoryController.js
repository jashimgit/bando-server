/**
 * @author: Jashim Uddin
 * */

import models from "../models";
// import Category from '../models/categoryModel';

const { SubCategory } = models;
const { Category } = models;

export const getAllSubCategory = async (req, res) => {
  await SubCategory.find({})
    .populate('Category')
    .exec((err, doc) => {
      if(err){
        res.status(500).json({
          error: err
        })
      } else {
        res.status(200).json({
          message: 'sub category',
          result: doc
        })
      }
    })
};

export const addSubCategory = async (req, res) => {
  // console.log(req.body);
  try {
    // console.log(req.body)
    const newSubcategory = new SubCategory(req.body);
    await newSubcategory.save((err) => {
      if (err) {
        res.status(500).json({ error: "server side error" });
      } else {
        res.status(200).json({ message: "sub category added successfully" });
      }
    });
  } catch (err) {
    res.status(500).json({ error: "server side error" });
  }
};
