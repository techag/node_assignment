import mongoose from 'mongoose';
import 'dotenv/config';

export const dbConnection = mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (error) {
        throw error;
    } else {
        console.log("DB connection successfull");
    }
});