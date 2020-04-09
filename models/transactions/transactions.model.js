import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
   date: {
       type: Date,
       default: () => { return new Date()},
       required: true
   },
   product_id: {
       type: String,
       required: true
   },
   user_id: {
       type: mongoose.Types.ObjectId,
       required: true
   },
   quantity: {
       type: Number,
       required: true
   },
   total_price: {
       type: Number,
       required: true   
   },
   created: {
       type: Date,
       default: () => { return new Date() } 
   }
});

export const Transaction = mongoose.model('Transaction', transactionSchema);