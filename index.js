const fs = require('fs');
const express = require("express");

const app = express()
const PORT = 5050
app.use(express.json())

let USER = [
    {
        email: "zarlykovabegim@gmail.com",
        password: "7890@#784"
    },
    {
        email: "altynai@gmail.com",
        password: "free3425"
    },
    {
        email: "karina@gmail.com",
        password: "karina89$$$88"
    },
    {
        email: "myrat002@gmail.com",
        password: "lpplplpl90909009"
    },
    {
        email: "madina@gmail.com",
        password: "aindm581381846"
    }
]
let array
function register(req, res) {
    array = JSON.stringify(USER, null, 4);
    fs.writeFile('./db-users.json', array, 'utf8', (err) => {
        if (err) {
            console.log(`Error writing file: ${err}`);
        } else {
            console.log(`File is written successfully!`);
        }
    })
    const email_porop = req.body
    console.log(email_porop)
    for (let i = 0; i < USER.length; i++) {
        if (USER[i].email == email_porop.email) {
            return res.status(400).json(" такой пользователь уже же есть")
        }
    }
    res.status(201).json("Успешно создано")
}
app.post("/check-register", register)
/*2 Логин (/login). Метод запроса POST
- Эндпоинт будет получать эмейл и пароль через тело запроса
- Далее в коде надо будет проверить, если пользователь с таким эмейлом есть, то мы успешно логиним (см. п1) его и отдаем статус код (201)
- Если же пользователя с такой почтой нет, то просим его пройти регистрацию, и отдаем статус код 400
*/
function login(req, res) {
    const telo = req.body
    for (let i = 0; i < USER.length; i++) {
        if (USER[i].email == telo.email) {
            return res.status(201).json("Вы успешно авторизованы!")
        }
    }
    return res.status(400).json("Вы должны пройдти регистрация")
}
app.post("/check-login", login)
/*3 Удалить учетку (/unregister) . Метод  запроса DELETE
- Эндпоинт будет получать эмейл через тело запроса
- Если такая почта есть в db-users, то мы удаляем эту запись о пользователе
- Если ее нет, то говорим что "вы пытаетесь удалить не существующего пользователя" и отдаем статус код 400*/

function unregister(req, res) {
    const telo = req.body
    const USER_find = USER.find(
        (item) => item.email === telo.email);
    if (!USER_find) {
        return res.status(400).json("Вы пытаетесь удалить не существующего пользователя");
    }
    let Delete = USER.filter((item) => item.email !== telo.email)

    fs.readFile('./db-users.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`);
        } else {
            array = JSON.parse(data);
            array.push(Delete)
            fs.writeFile('./db-users.json', JSON.stringify(array, null, 4), (err) => {
                if (err) {
                    console.log(`Error writing file: ${err}`);
                }
            });
        }
    })
    res.status(201).json("Успешно удаленно")
}
app.delete("/check-unregister", unregister)
app.listen(PORT, () => {
    console.log("Бекнд приложение запущено на порту: ", + PORT);
});
