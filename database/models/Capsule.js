import mongoose, { Schema } from 'mongoose';

const capsuleSchema = new Schema({
    receiverID: String,
    receiverName: String,
    senderID: String,
    senderName: String,
    content: String,
    tag: String,
    createdDate: { type: Date, default: Date.now }
});

export default mongoose.model('capsule', capsuleSchema);