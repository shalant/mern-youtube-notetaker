const express = require('express');
const mongoose = require('mongoose');
const note = require('./models/note');
const app = express();

const API_PORT = process.env.PORT || 8080

app.use(express.json());

const dbPath = 'mongodb+srv://doug:blah@cluster0.mxca8.mongodb.net/mern-youtube-notetaker?retryWrites=true&w=majority';

mongoose.connect(dbPath, {
    dbName: 'you_note',
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to db');
}).catch((err) => console.log('error connecting to db'));

//route to create new note
app.post('/', (req, res) => {
    const {title, author, body} = req.body;

    let newNote = new note({
        title,
        author,
        body
    });

    newNote
        .save()
        .then((note) => {
            console.log('note saved');
            res.json(note);
        }).catch(err => {
            console.log('error saving the note')
            res.send('error');
        });
});

app.listen(API_PORT, () => console.log(`listening on Port ${API_PORT}`));