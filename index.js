const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require('./public/js/queries');
const PORT = 3700;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users/:id', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

app.set('views', path.join(__dirname,'/'));
app.set('view engine','html');
app.use(express.static('public'));

app.listen(PORT, ()=>{
    console.log(`✅ Server running on http://localhost:${PORT}`);
})