import express from 'express';
import {User} from '../models/users/users.model';
import { usersValidation } from '../utils/validations';
import mongoose from 'mongoose'
import { Transaction } from '../models/transactions/transactions.model';

const userRouter = express.Router();

/**
 * Get all User
 * Method: GET
 * Mode: User
 */
export const getAllUser = userRouter.get('/', async(req, res) => {

    //Aggregate all users with latest transactions
    User.aggregate([
        //Lookup transactions using user_id
        {
            $lookup : {
                from: "transactions",
                localField: '_id',
                foreignField: 'user_id',
                as: 'latest_transaction_detail',
            }
        },
        //Map fields 
        {
            $project: {
                "name": 1,
                "phone": 1,
                "address": 1,
                "latest_transaction_detail.product_id": 1,
                "latest_transaction_detail.quantity": 1,
                "latest_transaction_detail.total_price": 1,
                "latest_transaction_detail.date": 1,
                "total_transactions": { "$size": "$latest_transaction_detail" }
            }
        },
        //Slice the transactions to get latest
        { $addFields: {
            "latest_transaction_detail": { "$slice": ["$latest_transaction_detail", -1] }
        }}
    ])
    .exec((err, result) => {
            if(err) {
                res.send("unable to get users");
                throw err;
            } else {
                res.json(result)
            }
        });
});

/**
 * Create / Update user
 * Method: POST
 * Model: User
 */
export const addUser = userRouter.post('/add', async(req, res) => {
    //Validate Payload
    const {error} = usersValidation.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    //Extract Phone number if contains string charecters
    let phoneNum = req.body.phone.replace(/\D/g, '');

    //If User data exist then just update else insert it.
    //Assuming the phone number a unique, find the user by given phone number
    const userExist = await User.findOne({phone: phoneNum});
    
        try {
            if (userExist) {
                //Updatet the existing record if user exists
                const updateUser = await User.updateOne({'_id': userExist._id}, {$set: req.body});
                res.json({message: 'User have been updated successfully.', data: req.body});
            } else { 
                //Else create new user
                const user = new User({
                    name: req.body.name,
                    phone: phoneNum,
                    address: req.body.address
                });
                const saveUser = await user.save();
                res.json({message: 'New user has been created successfully', data: saveUser});
            }
        } catch (error) {
            res.send('Unable to register user.');
            throw error;
        }
});
