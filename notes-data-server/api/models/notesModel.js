import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    creator: {
        type: String,
        required: 'Creator is required.'
    },
    title: String,
    body: String,
    tags: [String],
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const noteModel = mongoose.model('Note', noteSchema);

export { noteModel }