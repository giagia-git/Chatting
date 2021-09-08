
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const mongoose = require("mongoose")
const io = require("socket.io")(http, {
    CORS: {
        origin: '*',
    }
});
const bodyParser = require("body-parser");
//const AccountModel = require("./model/Account");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const PORT = process.env.PORT || 5000;

var checkName = [];
var clients = 0;
var doc;

    run();
    async function run() {
        await mongoose.connect("mongodb+srv://giap92446:123456@cluster0.3cwko.mongodb.net/Database?retryWrites=true&w=majority",function() {
            console.log("Connect database success!");
        });
        
                
        const mongoose = require("mongoose");

        const Schema = mongoose.Schema;

        const schema = new Schema({
            username: String
        })
        const AccountModel = mongoose.model("myUsers",schema);
        
        await doc = AccountModel.find();
        await socket.emit("setallUserconnect", { arrayUser: doc });

    }   



io.on("connection", (socket) => {
    clients++;
    
    
    socket.emit("alluserconnection",{clientsConnection: clients});

    socket.on("saveDatabase", (data) => {
        if(checkName.indexOf(data.username) <= -1) {
            checkName.push(data.username);
            const AccountUser = new AccountModel({ username: data.username });
            AccountUser.save(function(err) {
                if(err) {
                    throw new Error(err);
                }else{
                    console.log("Save to Database success!");
                }
            })
        }
    })

    socket.on("setUser", (data) => {;
        socket.emit("finallysetUser",data);
    })
            
    socket.on("usermessage",(data) => {
        io.sockets.emit("newusermessage", data);
    })
            

    socket.on("disconnect", (data) => {
        clients--;
        socket.emit("alluserconnection",{clientsConnection: clients});
    });
})

app.use(express.static("client/public"));
app.get("*", (req, res) => {
    res.sendFile("index.html"); 
})

http.listen(PORT, () => {
    console.log(`Listening PORT ${PORT}`);
})


