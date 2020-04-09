import mongoose, {Schema} from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
        // transactions:[
        //     {
        //         type: Schema.Types.ObjectId, 
        //         ref: 'Transaction'
        //     }
        // ],
    created: {
        type: Date,
        default: new Date()
    }
});

export const User = mongoose.model('User', userSchema);