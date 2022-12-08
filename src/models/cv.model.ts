import { Schema, model } from 'mongoose';

const resumeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    abilities: {
        type: [String],
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    experiences: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

export default model('Resume', resumeSchema);
