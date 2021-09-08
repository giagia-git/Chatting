
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const PORT = process.env.PORT || 5000;

var checkName = [];
var clients = 0;
var doc;




io.on("connection", (socket) => {
    clients++;
    
    
    socket.emit("alluserconnection",{clientsConnection: clients});

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


