import mongoose from 'mongoose';
import schema from '../schemas';

const Subcategory = new mongoose.model('Subcategory', schema.subCategorySchema)

export default Subcategory;