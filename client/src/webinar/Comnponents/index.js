import React, { useState, useEffect } from 'react';
import {useRouteMatch} from "react-router-dom";
import {setWebinarInfo} from '../../actions'
import { connect } from 'react-redux'
import io from "socket.io-client";
import '../webinar.scss'
let socket
const Webinar = ({webinar, setWebinarInfo}) => {
    let room = useRouteMatch('/webinar/:id/:userId').params.id
    let currentUser = useRouteMatch('/webinar/:id/:userId').params.userId
    const [isShowRightbar, setisShowRightbar] = useState(false)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    useEffect(() => {
        socket = io('http://localhost:3001')
        socket.emit('join', { room, currentUser }, (error) => {
            if (error) {
                alert(error);
            }
        });
    }, [])

    useEffect(() => {
        socket.on('NEW_USER', (message)=>{
            setMessages([...messages, {user: message.user, message:message.message}])
            setWebinarInfo(message.webinar)
        })
        socket.on('getMessage', (mess) => {
            console.log(mess, 'mess');
            
            setMessages([...messages, mess])
        })
        return () => {
            socket.emit('disconnect');
            socket.off();
          }
    }, [messages])
    
    const handleKeyPress =(e)=>{
        if(e.charCode==13){
            socket.emit('sendMessage', {user: socket.id, message, room})  
            setMessage('')
        } 
    }
    return (
        <div className="webinar-app">
            <main className="stream-main">
                <div className="stream-topbar">
                    <div className='stream-topbar__left'>

                    </div>
                    <div className='stream-topbar__right'>
                        <button className='stream-topbar__right__button' onClick={()=>setisShowRightbar(!isShowRightbar)}>Участники</button>
                        <div className={`rightbar ${isShowRightbar ? 'show' : 'hidden'}`}>
                            {webinar && webinar.users.map((user, idx) =>
                                <div key={idx}>{user.displayName}</div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='stream-center'>
                </div>
                <div className="stream-chat-wrapper">
                    <div className="stream-chat" >
                        {messages.length>0 &&
                            <ul>
                                {messages.map(({ user, message }, idx) =>
                                    <li className="stream-chat__message" key={idx}>
                                        {idx < 1 ? <span className="stream-chat__message__author"><b>{user}</b>:</span> :
                                          messages[idx-1].user!=messages[idx].user ? <span className="stream-chat__message__author"><b>{user}</b>:</span> : '' }
                                        <span className="stream-chat__message__text">{message}</span>
                                    </li>
                                )}
                            </ul>
                        }
                        <div className="stream-chat__textarea">
                            <textarea placeholder='Type smth' value={message} onChange={(e)=>setMessage(e.target.value)} onKeyPress={handleKeyPress}></textarea>
                        </div>
                    </div>
                </div>
            </main>
        </div>

    )
}
const mapStateToProps = state => ({
    webinar: state.webinarReducer.webinar
})
const mapDispatchToProps = (dispatch) =>({
    setWebinarInfo: (webinar) => dispatch(setWebinarInfo(webinar)),
    
})
export default connect(mapStateToProps, mapDispatchToProps)(Webinar);