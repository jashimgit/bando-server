import schema from '../schemas';
import mongoose from 'mongoose';


const User = mongoose.model('User', schema.userSchema);

export default User;