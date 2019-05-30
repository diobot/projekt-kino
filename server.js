// var fs = require('fs');
var bodyParser = require('body-parser');
// var register = fs.readFileSync('register.json');
// var users = JSON.parse(register);

// console.log(users);

console.log('server is starting...');

var express = require('express');
var app = express();

function listening() {
    console.log('listening...');
}

app.use(express.static('Kino-projekt'));
app.use(bodyParser.json());

// app.post('/login', (req, res) => {
//     console.log(req.body);
//     console.log(users);
//     // porownuje users z podeslanym body i decyduje, czy uzytkownik jest zalogowany
//     const { login, password } = req.body;
//     res.json({ isLoggedIn: users[login] === password });
// });

var server = app.listen(4000, listening);

