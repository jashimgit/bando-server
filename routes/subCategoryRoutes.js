/**
 * @author   jashim uddin
 */
import express from 'express';
import {
    addSubCategory,
    getAllSubCategory
} from '../controllers/subCategoryController';
const router = express.Router();



/**
 * @example  /subcategory
 * @returns []
 * @method GET
 */
router.get('/', getAllSubCategory);

/**
 * @example  /subcategory
 * @method POST
 */
router.post('/add', addSubCategory)


export default router;