import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import io from 'socket.io-client';
import Chat from './components/chat';
import User from './components/user';

var socket;
var clientsConnect=null;

function App() {
    const ENDPOINT = 'localhost:5000';
    var [name,setName] = useState('');
    var [room,setRoom] = useState('');
    var [message,setMessage] = useState('');
    var [search,setSearch] = useState('');

    var [mess, setMess] = useState([]);
    var [newName,setnewName] = useState([]);

    var [isToggle,setisToggle] = useState(false);
    var [isSend,setisSend] = useState(false);
    var [isName,setisName] = useState(true);

    var [alluserconnection,setalluserconnection] = useState([]);

    useEffect(() => {
        socket = io(ENDPOINT,{transports: ['websocket']});


        socket.on("newusermessage",(data) => {
            setMess(value => [...value,data.mes]);
            setnewName(value => [...value,data.username]);
        })

        socket.on("setUserError",(data) => {
            setisName(!isName);
        }) 

        socket.on("setallUserconnect",(data) => {
            setalluserconnection(data.arrayUser);
        })

        socket.on("finallysetUser",(data) => {
            socket.emit("saveDatabase",data);
        })

        socket.on("alluserconnection",(data) => {
            clientsConnect = data.clientsConnection - 1;
        })

        return () => {
            socket.disconnect();
            socket.off();
        }
    }, []);

    function changeText(e) {
      e.preventDefault();
      setName(e.target.value);
    }

    function changeRoom(e) {
        e.preventDefault();
        setRoom(e.target.value);
    }

    function handleSubmit() {
        if(name !== '' && name.length <= 14) {
            setisToggle(!isToggle); 
            socket.emit("setUser",{ username: name, myroom: room});
        }
    }

    /*---------User--------*/
    function handleMessage(e) {
      setMessage(e.target.value);
      e.preventDefault();
    }

    function sendMessage() {
        if(message !== null) {
            socket.emit("usermessage",{ username: name, myroom: room, mes: message });
            setisSend(!isSend);
            setMessage('');
        } 
    }

    function handleSearch(event) {
        setSearch(event.target.value);
        event.preventDefault();
    }

    function sendSearch() {
        setSearch('');
    }

    const allUser = alluserconnection.map((value,idx) => (
        <div className="App__User__Connecting__humans__all">
            <li className="App__User__Connecting__humans__all__list" key={idx}>
                {value.username}
            </li>
        </div>
    ))

    const USER = mess.map((value,idx) => (
        <li className="App__User__Chat__List" key={idx}>
            <div className="App__User__Chat__List__user">
                    <div className="App__User__Chat__List__user__username__Block">
                        <a className="App__User__Chat__List__user__username">{newName[idx]} </a>
                    </div>
                    <div className="App__User__Chat__List__user__value__Block">
                        <a className="App__User__Chat__List__user__value">{value}</a>
                    </div>
            </div>
        </li>
    ))

    return (
       <div className="App">
          { !isToggle /* && !isName */ ? 
          <Chat name={name} setName={setName} room={room} setRoom={setRoom} 
          changeText={changeText} changeRoom={changeRoom} handleSubmit={handleSubmit} />
          :
          <User clientsConnect={clientsConnect} search={search} sendSearch={sendSearch} handleSearch={handleSearch} allUser={allUser} sendMessage={sendMessage} handleMessage={handleMessage} message={message} USER={USER} />
          }
       </div>
    )
}


export default App;
