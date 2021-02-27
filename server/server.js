const express = require('express');
const mongoose = require('mongoose');
const note = require('./models/note');
const app = express();
const auth = require('./middleware/auth');

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

app.all('/api/*', auth);

app.use('api/notes', require('./routes/notes'));
app.use('api/auth', require('./routes/auth'));


app.listen(API_PORT, () => console.log(`listening on Port ${API_PORT}`));