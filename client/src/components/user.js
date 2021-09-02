import React, { useState, useEffect, useRef } from 'react';
import './css/user.css';
import {  UserOutlined, SearchOutlined }from '@ant-design/icons';
import { TimePicker, Input, Button } from 'antd';
import moment from 'moment';

function User({clientsConnect, search, handleSearch, sendSearch, message, handleMessage, sendMessage, USER, allUser}) {

    useEffect(() => {
        var x = document.querySelector(".App__User__Chat");
        if(x.scrollTop < x.scrollHeight - x.clientHeight) {
            x.scrollTop = x.scrollHeight;     
        }
    });
    
    
    return (
        <div className="App__User">
                <div className="App__User__Connecting">
                    <div className="App__User__Connecting__humans">
                        {allUser}
                    </div>
                    <div className="App__User__Connecting__search">
                        <Input value={search} onChange={event => handleSearch(event)} className="App__User__Connecting__search__user" size="large" placeholder="Search user.." prefix={<UserOutlined />} />
                        <Button onClick={() => sendSearch()} className="App__User__Connecting__search__find" type="dashed" icon={<SearchOutlined />} size="large">
                            Search
                        </Button>
                    </div>
                </div>
            
                <div className="App__User__Container">

                    <div className="App__User__Chat">
                            {USER}
                    </div>
                    <div className="App__User__Table">
                        <input 
                            type="text" 
                            value={message} 
                            onChange={event => handleMessage(event)}
                            placeholder="Aa"
                            className="App__User__Message"
                        >
                        </input>
                        <button className="App__User__Send" onClick={() => sendMessage()}>Send</button>
                    </div>
                </div>

                <div className="App__User__markerting">
                    <div className="App__User__markerting__custom">
                        <div className="App__User__markerting__custom__clients">
                            <div className="App__User__markerting__custom__clients__content">
                                Hiện đang có {clientsConnect} người truy cập
                            </div>
                        </div>
                        <div className="App__User__markerting__custom__clock">
                            <TimePicker defaultValue={moment(new Date(), 'HH:mm:ss')} disabled />
                        </div>
                    </div>
                </div>
        </div>
    )
} 




export default User;