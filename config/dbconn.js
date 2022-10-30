const {Client} = require("pg")

const db = new Client({
    host:"localhost",
    user:'postgres',
    password:'050101',
    database:'postgres'
});


module.exports = db