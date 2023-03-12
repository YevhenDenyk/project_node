const express = require('express');
const {fileServices} = require('./services');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(5000, () => {
    console.log('Server listen 5000')
})


app.get('/', (req, res) => {
    console.log("welcome")
})

app.get('/users', async (req, res) => {

    const users = await fileServices.reader()

    res.json(users)
});

app.post('/users', async (req, res) => {
    const user = req.body;

    if (user.age < 0 || user.age > 120 || typeof user.age !== "number") {
        return res.status(400).json('Bad request, age incorrect')
    }
    if (user.name.length < 2 || typeof user.name !== "string" ) {
        return res.status(400).json('Bad request, name incorrect')
    }

    const users = await fileServices.reader()

    //шукаю максимальне ІД в масиві
    let maxID = users[0].id
    for (const findID of users) {
        if (findID.id > maxID) {
            maxID = findID.id
        }
    }

    //записуємо нового юзера до масиву
    const newUser = {id: maxID + 1, name: user.name, age: user.age}
    users.push(newUser)

    await fileServices.writer(users)

    res.status(201).json(newUser);
});

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params

    const users = await fileServices.reader();

    const user = users.find(u => u.id === +userId);

    if (!user) {
        return res.status(404).json('User not found')
    }

    res.json(user)
});


app.put('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const updateUser = req.body;

    if (updateUser.age < 0 || updateUser.age > 120 || typeof updateUser.age !== "number") {
        return res.status(400).json('Bad request, age incorrect')
    }
    if (updateUser.name.length < 2 || typeof updateUser.name !== "string" ) {
        return res.status(400).json('Bad request, name incorrect')
    }


    const users = await fileServices.reader();

    const index = users.findIndex(user => user.id === +userId);

    if (index === -1) {
        return res.status(404).json('User not found')
    }
    users[index] = {...users[index], ...updateUser};
    // users[index] = {
    //     id: users[index].id,
    //     name: updateUser.name,
    //     age: updateUser.age
    // };

    await fileServices.writer(users);

    res.status(201).json(users[index]);

});

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    const users = await fileServices.reader()

    const index = users.findIndex(user => user.id === +userId);

    if (index === -1) {
        return res.status(404).json('User not found')
    }

    users.splice(index, 1)
    await fileServices.writer(users)

    res.sendStatus(204)
});
