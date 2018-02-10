import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    userID: String,
    userName: String,
    schoolID: String,
    schoolName: String,
    graduationDate: Date
});

export default mongoose.model('user', userSchema);