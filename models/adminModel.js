import mongoose from 'mongoose';
import adminSchema from '../schemas/adminSchema';

const Admin = new mongoose.model('Admin', adminSchema);

export default Admin;