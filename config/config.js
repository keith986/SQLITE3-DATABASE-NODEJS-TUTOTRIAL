const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database("./database/database.db", (err) => {
    if (err) throw console.log("Database Error : " + err.message)
    console.log("Connected to Database successfully!");
})

module.exports = db
