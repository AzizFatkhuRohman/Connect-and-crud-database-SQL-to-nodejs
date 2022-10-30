const express = require("express")
const session = require("express-session")
const db = require("./config/dbconn")
const app = express()
app.use(express.json())
app.set("view engine", "ejs")
app.listen(5000, ()=> console.log("connected server"));

db.connect((err)=>{
    if(!!err){
        console.log(err)
    }else{
        console.log("Connected Database")
    }
})

app.get("/", (req, res)=>{
    res.render("home")
})
app.get("/home", (req, res) =>{
    db.query(`SELECT * FROM blog`, (err, result)=>{
        if(err){
            res.send(err.message)
        }else{
            res.render("home", (result.rows))
        }
    })
})
app.post("/home", (req, res) =>{
    let {title, content} = req.body
    db.query(`INSERT INTO blog(title,content) VALUES('${title}', '${content}')`), (err, result)=>{
        if(err){
            res.send(err.message)
        }else{
            res.redirect('/home', (result.rows))
        }
    }
    
})
app.put("/home/:id", (req,res)=>{
    let {title, content} = req.body
    db.query(`UPDATE blog SET title = '${title}, content = '${content}'`), (err, result) => {
        if(err){
            res.send(err.message)
        }else{
            res.redirect("/home", (result.rows))
        }
    }
})
app.delete("/home/:id", (req, res) =>{
    db.query(`DELETE FROM blog WHERE id`)
})
app.get("/addBlog", (req, res)=>{
    res.render("addBlog")
})