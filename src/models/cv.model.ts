import { Schema, model } from 'mongoose';

const resumeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    abilities: {
        type: String,
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
});

export default model('Resume', resumeSchema);
