import mongoose  from 'mongoose';

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CNN || '');

        console.log('DATABASE ONLINE');
    } catch (error) {
        console.log(error);
        throw new Error('DATABASE OFFLINE');
    }
};

