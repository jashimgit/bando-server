import schema from '../schemas';
import mongoose from 'mongoose';

const Product = new mongoose.model('Product', schema.productSchema);

export default Product;

