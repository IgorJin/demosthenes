import React, { useState, useEffect, Fragment } from 'react';
import io from "socket.io-client";
import '../webinar.scss'
let socket
const Webinar = () => {
    const [messages, setMessages] = useState([])
    useEffect(() => {
        socket = io('http://localhost:3001')
        socket.on('sendMessage', (message) => {

            setMessages([...messages, message])
        })
        socket.emit('join', { name: 'Igor' + socket.id }, (error) => {
            if (error) {
                alert(error);
            }
        });
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