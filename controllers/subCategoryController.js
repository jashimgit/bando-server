/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
/**
 * @author: Jashim Uddin
 * */

import models from "../models";
// import Category from '../models/categoryModel';

const { Subcategory } = models;
const { Category } = models;

export const getAllSubCategory = async () => {
  try {
    const subCategory = await SubCategory.find({});
    res.status(200).json({
      subcategory,
    })
  } catch(err) {
    res.status(500).json({
      message: 'server side error'
    })
  }
};

export const addSubCategory = async (req, res) => {
  // console.log(req.body);
  const { category } = req.body;
  try {

    const newSubcategory = new Subcategory(req.body);
    const subcategory = await newSubcategory.save();
    await Category.updateOne({_id: category}, {$push: { subcategory: subcategory._id}})

  res.status(200).json({message: 'sub category added successfully'})
  // await User.updateOne({ _id: req.userId }, { $push: { todos: todo._id } });

  } catch (err) {
    res.status(500).json({ error: "server side error" });
  }
};
