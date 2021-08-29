import mongoose from 'mongoose';
import schema from '../schemas';

const SubCategory = new mongoose.model('SubCategory', schema.subCategorySchema)

export default SubCategory;