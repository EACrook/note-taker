const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

const { notes } = require('./db/db.json');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(express.static('public'))

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id)[0];
    return result;
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

app.get('/api/notes', (req, res) => {
    let results = notes;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// app.get('/api/notes/:id', (req, res) => {
//     const result = findById(req.params.id, notes);
//         if (result) {
//             res.json(result);
//         }else {
//             res.send(404);
//         }
// });

app.listen(3001, () => {
    console.log(`API server now on port ${PORT}!`)
})