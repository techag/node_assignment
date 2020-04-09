import express from "express";
import {dbConnection} from './network/connection';
import bodyParser from 'body-parser';
import {getAllUser, addUser} from './controllers/users.controller';
import {getAllProducts, addProduct} from './controllers/products.controller';
import { getAllTransactions, addTransaction } from "./controllers/transactions.controller";

//Initialize app
const app = express();

//MIDDLEWARES
app.use(bodyParser.json());

//ROUTERS

//Users
app.use('/users', getAllUser);
app.use('/users/add', addUser);

//Product
app.use('/products', getAllProducts);
app.use('/products/add', addProduct);

//Transactions
app.use('/transactions', getAllTransactions);
app.use('/transactions/add', addTransaction);

//Creat API listern
app.listen('3001', () => {
    console.log('Server Started');
    
});