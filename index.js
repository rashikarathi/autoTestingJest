const express = require("express");
const app = express();
const https = require("https");
const port = 3000;

function allTodos() {
    return [{
        id: 1,
        name: "Finish writing a blogpost"
    }, {
        id: 2,
        name: "Make chickpea curry for dinner"
    }, {
        id: 3,
        name: "Wake up at 5:30am"
    }, ];
}
app.get("/", (req, res) => {
    res.send({
        date: new Date(),
        msg: "Hello Node"
    });
});

app.get("/todo", (req, res) => {
    res.send(allTodos());
});

app.get("/todo/:id", (req, res) => {
    const todoId = Math.abs(req.params.id);
    let todos = allTodos();
    let todo = todos.find(t => t.id === todoId);
    res.send(todo);
});

app.get("/joke", (req, res) => {
    const url = "https://api.chucknorris.io/jokes/random";
    https.get(url, (response) => {
        let data = ''; /* keep appending data to chunks as we receive it */
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            res.send(data);
        });
    })
});

app.listen(port, () => {
    console.log(`Listening on port => ${port}`);
});

module.exports = app;