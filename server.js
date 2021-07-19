const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

//let notes  = require('./db/db.json');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(express.static('public'))

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id != id);
    return result;
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('/api/notes', (req, res) => {

    fs.readFile('./db/db.json', 'utf8', function (err, result) {
        console.log('RESULT!!! from read file!!', result)

        res.json(JSON.parse(result))
    });
});

app.post('/api/notes', (req, res) => {


    fs.readFile('./db/db.json', 'utf8', function (err, result) {
        console.log('RESULT!!! from read file!!', result)
        var notes = JSON.parse(result)
        req.body.id = notes.length + 1
        notes.push(req.body)

        var strNotes = JSON.stringify(notes)
        fs.writeFile('./db/db.json', strNotes, function (err, result) {
            res.json(notes)
        })
    })


});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})