const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware to parse json
app.use(express.json());

           //Basic route
app.get('/', (req, res) => {
    res.send('Welcome to my RESTful API in Node.js');
});           

app.listen(PORT, () => {
    console.log('Server running on http://localhost:${PORT}');
});

//Creating crude routes
let users = [
    {id: 1, name: 'Molday'},
    {id: 2, name: 'Fidel'},
];

//Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

//Get a specific user
app.get('/users/id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user)return res.status(404).send('User not found');
    res.json(user);
});
//Create a new user
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

//update an existing user
app.put('/users/:id',(req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    user.name = req.body.name;
    res.json(user);
});

//Delete a user
app.delete('/users/:id',(req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id))
    if (userIndex === -1) return res.status(404).send('User not found');
    users.splice(userIndex, 1);
    res.status(204).send();
});