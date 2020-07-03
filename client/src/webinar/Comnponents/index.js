import React, { useState, useEffect, Fragment } from 'react';
import {useRouteMatch} from "react-router-dom";
import io from "socket.io-client";
import '../webinar.scss'
let socket
const Webinar = () => {
    let room = useRouteMatch('/webinar/:id').params.id
    const [messages, setMessages] = useState([])
    useEffect(() => {
        socket = io('http://localhost:3001')
        socket.on('sendMessage', (message) => {
            
            setMessages([...messages, message])
        })
        console.log(room);
        
        socket.emit('join', { room }, (error) => {
            if (error) {
                alert(error);
            }
        });
        socket.on('NEW_USER', (message)=>console.log(message))
    }, [])

    useEffect(() => {
        socket.on('sendMessage', (message) => {
            console.log('sendMessage')
            setMessages([...messages, message])
        })
    }, [messages])

    return (
        <div className="webinar-app">
            <main className="stream-main">
                <div className="stream-topbar">

                </div>
                <div className='stream-center'>
                </div>
                <div className="stream-chat-wrapper">
                    <div className="stream-chat" >
                        {messages.map(({ user, message }, idx) =>
                            <div key={idx}><b>{user}:</b> {message}</div>
                        )}
                    </div>
                </div>
            </main>
        </div>

    )
}
export default Webinar;