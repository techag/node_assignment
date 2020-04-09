import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    sku: {
        type: String,
        default: Math.ceil(Math.random() * 10000)
    },
    name: {
        type: String,
        requierd: true
    },
    unit_price: {
        type: Number,
        requierd: true
    },
    description: {
        type: String
    },
    created: {
        type: Date,
        default: new Date()
    }
});

export const Product = mongoose.model('Product', productSchema);
