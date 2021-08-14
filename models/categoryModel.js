import schema from '../schemas';
import mongoose from 'mongoose';

const Category = new mongoose.model('Category', schema.categorySchema);

export default Category;


