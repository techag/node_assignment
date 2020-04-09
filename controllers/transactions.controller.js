import express from 'express';
import {Transaction} from '../models/transactions/transactions.model';
import { transValidation } from '../utils/validations';
import { User } from '../models/users/users.model';

const transRouter = express.Router();

/**
 * Get all transactions
 * Methid: GET
 * Model: Transactions
 */
export const getAllTransactions = transRouter.get('/', async(req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        res.send('Unable to find transactions at this moment, please try again.');
        throw error;
    }

});

/**
 * Add a new transaction
 * Method: POST,
 * Model: Transactions
 */
export const addTransaction = transRouter.post('/add', async(req, res) => {

    //Validate payload
    const {error} = transValidation.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const transaction = new Transaction({
        product_id: req.body.product_id,
        user_id: req.body.user_id,
        quantity: req.body.quantity,
        total_price: req.body.total_price,
    });

    try {
        transaction.save()
        /**This can be a alternate solution to aggregation pipeline */
        // .then((result) => {
        //     User.findOne({'_id': transaction.user_id}, (err, user) => {
        //         user.transactions.push(transaction)
        //         user.save()
        //     })
        // })
        .then(() => {
            res.send('Transaction has been saved')
        })
        
    } catch(error) {
        res.send('Unable to perform transaction. Please try again.');
        throw error;
    }
});



