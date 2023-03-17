//Importing necessary dependents

const router = require('express').Router();
const db = require('../db/db.json');
const fs = require('fs');
const util = require('util');
const uniqid = require('uniqid')

//Get request for api/notes
//reads contents of db.json and sends it back to user
router.get('/api/notes', (req, res) => {
       fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        console.log(JSON.parse(data));
        res.send(data);
       })
});
//post request for api/notes
//server reads db.json and parses the request to extract the note with 'text' and 'title'
//Generates a unique ID and adds note to db.json
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


//Defines our delete path
//Server reads db.json and removes the note associated with that ID
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