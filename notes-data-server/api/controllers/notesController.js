import mongoose from 'mongoose';

const Notes = mongoose.model('Note');

function allNotes(req, res) {
    const user = req.body.user;
    if (!user || !user.username) return res.sendStatus(401);

    Notes.find({creator: user.username}, (err, results) => {
        if (err) return res.sendStatus(400);
        console.log(results);
        return res.json(results);
    })
}

function createNote(req, res) {
    const user = req.body.user;
    const note = req.body.note;

    if (!user || !user.username || !note) return res.sendStatus(401);

    note.creator = user.username;

    //some sanitation
    delete note._id;
    delete note.created_at;
    delete note.__v;

    Notes.create(note, (err, result) => {
        console.log(result);
        if (err) return res.sendStatus(401);
        return res.sendStatus(201);
    });
}

function deleteNote(req, res) {
    const user = req.body.user;
    const noteID = req.body.noteID;

    Notes.findOneAndDelete({_id: noteID, creator: user.username}, (err, result) => {
        if (err || !result) return res.sendStatus(400);
        return res.sendStatus(200)
    });
}

function updateNote(req, res) {
    const user = req.body.user;
    const note = req.body.note;

    const noteID = note._id;
    
    // some sanitation of update
    delete note._id;
    delete note.creator;
    delete note.created_at;
    delete note.__v;

    Notes.findOneAndUpdate({_id: noteID, creator: user.username}, note, (err, doc, result) => {
        if (err) return res.sendStatus(401);
        return res.sendStatus(200);
    });
}

export { allNotes, createNote, deleteNote, updateNote }