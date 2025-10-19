const express = require('express')
const app = express()
const port = 3000

const db = require("./config/config")

app.listen(port, () => {
    console.log('Running at port number : ' + port)
    console.log("Database Status: " + db)
})

app.get("/", (req, res) => {

    db.run("CREATE TABLE IF NOT EXISTS messages(id INTEGER PRIMARY KEY AUTOINCREMENT ,text VARCHAR(400), touser VARCHAR(255), fromuser VARCHAR(255), createdAt DATETIME DEFAULT CURRENT_TIMESTAMP)", (err) => {
        if (err) throw console.log("Table Creation Error : " + err.message)
        console.log("Table created successfully!")
    })

    res.send("Welcome to the Home Page!")
})

app.get("/add-user", (req, res) => {
    db.run("INSERT INTO messages(text, touser, fromuser) VALUES(?, ?, ?)", ["hello everyone!", "user1", "user2"], (err) => {
        if (err) throw console.log("Insertion Error : " + err.message)
        console.log("Data inserted successfully!")
    })
    res.send("User added!")
})

app.get("/get-messages", (req, res) => {
    db.all("SELECT * FROM messages", [], (err, rows) => {
        if (err) throw console.log("Selection Error : " + err.message)
        res.json(rows)
    })
})

app.get("/delete-messages/:id", (req, res) => {
    const user_id = req.params.id;
    db.run("DELETE FROM  messages WHERE id=?", [user_id], (err) => {
        if (err) throw console.log("Deletion Error : " + err.message)
        console.log("Message deleted successfully!")
        res.send("Message is being deleted...")
    })
})

app.get("/update-message/:id", (req, res) => {
    const user_id = req.params.id;
    db.run("UPDATE messages SET fromuser=? WHERE id=?", ["updatedUser", user_id], (err) => {
        if (err) throw console.log("Update Error : " + err.message)
        console.log("Message updated successfully!")
        res.send("Message is being updated...")
    })
})