const router = require('express').Router();
const db = require('../db/db.json');
const fs = require('fs');
const util = require('util');
const uniqid = require('uniqid')

router.get('/api/notes', (req, res) => {
       fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        console.log(JSON.parse(data));
        res.send(data);
       })
});

router.post('/api/notes', (req, res) => {
    let addNote = {
        id: uniqid(),
        title: req.body.title,
        text: req.body.text
    }
    fs.readFile('./db/db.json', (err,data) => {
        if (err) throw err;
        let newData = JSON.parse(data);

        newData.push(addNote);
        console.log(newData);
        fs.writeFile('./db/db.json', JSON.stringify(newData), (err) => {
            res.send('Note added')
        })
    })
})

router.delete('/api/notes/:id', (req, res) => {
    let db = JSON.parse(fs.readFileSync('./db/db.json'));

    let deleteNotes = db.filter(item => item.id !== req.params.id);
    console.log(deleteNotes)
    fs.writeFileSync('./db/db.json', JSON.stringify(deleteNotes));
    res.json(deleteNotes)
    console.log(db)
    console.log(deleteNotes)
})


module.exports = router;