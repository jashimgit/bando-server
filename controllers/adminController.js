import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendResponse } from '../helpersFunctions';
import models from '../models';

const { Auth } = models;

// handle add admin
export const handleMakeAdmin = async (req, res) => {
    // check this email is already have an admin account or not
    if (req.user.role !== 'admin') {
        return sendResponse(res, 403, {
            name: 'Forbidden',
            success: false,
            message: "Hey man what's wrong with you! you are not admin!",
        });
    }

    const adminExist = await Auth.findOne({ email: req.body.email });
    if (adminExist) {
        return sendResponse(res, 400, {
            name: 'Bad Request',
            success: false,
            message: `admin already exist is this email: ${req.body.email}`,
        });
    }

    // creating a new mongoose doc for user data
    const newAdmin = new Auth(req.body);

    try {
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);

        // set admin password to hash password
        newAdmin.password = await bcrypt.hash(newAdmin.password, salt);
        // saved admin
        const savedAdmin = await newAdmin.save();

        if (!savedAdmin) {
            return sendResponse(res, 400, {
                name: 'Faild',
                success: false,
                message: 'user created faild',
            });
        }

        // send success message
        return sendResponse(res, 201, {
            name: 'Created',
            success: true,
            message: `admin created id: ${savedAdmin._id}`,
        });
    } catch (err) {
        return sendResponse(res, 501, {
            name: 'Internal Server Error',
            success: false,
            message: err.message,
        });
    }
};

// user login handle
export const handleAdminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Auth.findOne({ email }).select('-__v');

        /// return if not found document
        if (!admin) {
            return sendResponse(res, 404, {
                name: 'Not Found',
                message: 'Admin Not found',
                success: false,
            });
        }

        // compare password
        const validPassword = await bcrypt.compare(password, admin.password);

        // return if password not match
        if (!validPassword) {
            return sendResponse(res, 400, {
                name: 'Forbidden',
                message: 'Wrong password',
                success: false,
            });
        }

        // create jwt token
        const token = jwt.sign({ _id: admin._id, email: admin.email }, process.env.ADMIN_SECRET);

        // success return
        return sendResponse(res, 200, {
            name: 'OK',
            message: 'Login successfully',
            success: true,
            token,
            admin: {
                name: admin.name,
                createdAt: admin.createdAt,
                _id: admin._id,
                email: admin.email,
            },
        });
    } catch (error) {
        return res.status(500).send({
            name: 'Internal Sever Error',
            message: error.message,
            success: false,
        });
    }
};

// get all users
export const getAllUsers = async (req, res) => {
    if (req.user.role !== 'admin') {
        return sendResponse(res, 403, {
            name: 'Forbidden',
            success: false,
            message: 'Only admin can see all users',
        });
    }

    try {
        const users = await Auth.find({}).select('-password').exec();
        if (!users) {
            return sendResponse(res, 404, {
                name: 'Not Found',
                success: false,
                message: 'User not found',
            });
        }
        return res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({
            name: 'Internal Server Error',
            success: false,
            message: err.message,
        });
    }
};

// Get all user where role
export const findByUserRole = async (req, res) => {
    if (req.user.role !== 'admin') {
        return sendResponse(res, 403, {
            name: 'Forbidden',
            success: false,
            message: 'Only admin can see all users',
        });
    }
    const { role } = req.params;
    try {
        const result = await Auth.find({ role }).select('-password').exec();
        if (!result.length) {
            return sendResponse(res, 404, {
                name: 'Not Found',
                success: false,
                message: 'User not found',
            });
        }
        return res.status(200).json({ success: true, result });
    } catch (err) {
        res.status(500).json({
            name: 'Internal Server Error',
            success: false,
            message: err.message,
        });
    }
};
