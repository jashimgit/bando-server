/**
 * @author: Jashim Uddin
 * */

import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema({
    name: String,
    shortDesc: {
        type: String,
        max: 160,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
});

export default subCategorySchema;
