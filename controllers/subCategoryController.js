/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
/**
 * @author: Jashim Uddin
 * */

import models from "../models";
// import Category from '../models/categoryModel';

const { SubCategory } = models;
const { Category } = models;

export const getAllSubCategory = async (req, res) => {
  await SubCategory.find({})
    .populate('category')
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
  const { category } = req.body;
  try {

    const newSubcategory = new SubCategory(req.body);
    const subCategory = await newSubcategory.save();
    // update category document
    const { id } = subCategory._id;
  await Category.updateOne({_id: category}, {$push: { subCategory: id}})

  res.status(200).json({message: 'sub category added successfully'})
  // await User.updateOne({ _id: req.userId }, { $push: { todos: todo._id } });

  } catch (err) {
    res.status(500).json({ error: "server side error" });
  }
};
