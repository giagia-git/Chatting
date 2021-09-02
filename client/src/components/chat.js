import React from 'react'
import './css/chat.css';

function Chat({name,setName,room,setRoom,handleSubmit,changeText,changeRoom}) {
    return (
        <div className="App__Chat">
            <div className="App__myForm">
              <h1 className="App__myForm__author">Gia</h1>
              <form onSubmit={() => handleSubmit()}>
                  <input
                    type="text"
                    value={name}
                    onChange={event => changeText(event)}
                    placeholder="Enter your name..."
                    className="App__myForm__text"
                  />
                  <input
                    type="text"
                    value={room}
                    onChange={event => changeRoom(event)}
                    placeholder="Room 1"
                    className="App__myForm__room"
                  />
                  <br></br>
                  <button className="App__myForm__submit" type="submit">Start</button>
              </form>
            </div>
        </div>
    )
}

export default Chat;
