const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => res.send('My Student ID is 21780367. Welcome to Express'));

app.listen(port);
console.log(`App running on http://localhost:${port}`);
