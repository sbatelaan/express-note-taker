const router = require('express').Router();
const path = require('path');



//When user makes GET request for either path, these will send them to requested file
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

router.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

module.exports = router;

