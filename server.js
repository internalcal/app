const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// Load files from JSON
app.get('/files', (req, res) => {
    fs.readFile('files.json', (err, data) => {
        if (err) return res.json([]);
        res.json(JSON.parse(data));
    });
});

// Save files to JSON
app.post('/files', (req, res) => {
    const newFile = req.body;
    fs.readFile('files.json', (err, data) => {
        const fileList = err ? [] : JSON.parse(data);
        fileList.push(newFile);
        fs.writeFile('files.json', JSON.stringify(fileList), () => {
            res.status(201).send('File added successfully!');
        });
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
