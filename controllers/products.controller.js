import express from 'express';
import {Product} from '../models/products/products.model';
import { productValidation } from '../utils/validations';

const productRouter = express.Router();

export const getAllProducts = productRouter.get('/', async(req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.send('Unable to get products at this moment, please try again');
        throw error;
    }
});

export const addProduct = productRouter.post('/add', async(req, res) => {

    //Validate payload
    const {error} = productValidation.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    //Check if product exists
    const productExist = await Product.findOne({sku: req.body.sku});
    
    try {
        if (productExist) {
            //Update product if exists
            const updateProduct = await Product.updateOne({'_id': productExist._id}, {$set: req.body})
            res.json({message: `Product ${req.body.name} has been updated successfully.`, date: req.body});
        } else {
            //Else Create Product
            const product = new Product({
                name: req.body.name,
                unit_price: req.body.unit_price,
                description: req.body.description
            });
            const saveProduct = await product.save();
            res.json(saveProduct);
        }
       
    } catch(error) {
        res.send('Unable to add product at this moment. Please try again.');
        throw error;
    }
});
