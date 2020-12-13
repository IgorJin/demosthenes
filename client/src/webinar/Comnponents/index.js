import React, { useState, useEffect, useRef } from "react";
import { useRouteMatch } from "react-router-dom";
import { setWebinarInfo } from "../../actions";
import { connect } from "react-redux";
import io from "socket.io-client";
import Peer from "simple-peer";
import "../webinar.scss";

let socket;
const Webinar = ({ webinar, setWebinarInfo }) => {
  let room = useRouteMatch("/webinar/:id/:userId").params.id;
  let currentUser = useRouteMatch("/webinar/:id/:userId").params.userId;
  const [isShowRightbar, setisShowRightbar] = useState(false);
  const [message, setMessage] = useState("");
  const [stream, setStream] = useState();
  const [messages, setMessages] = useState([]);
  const [callAccepted, setCallAccepted] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [receivingCall, setReceivingCall] = useState(false);

  const userVideo = useRef();
  const recipientVideo = useRef();

  useEffect(() => {
    socket = io("http://localhost:3001");

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });

    socket.emit("join", { room, currentUser }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, []);

  useEffect(() => {
    socket.on("NEW_USER", (message) => {
      setMessages([
        ...messages,
        { user: message.user, message: message.message },
      ]);
      setWebinarInfo(message.webinar);
    });
    socket.on("getMessage", (mess) => {
      console.log(mess, "mess");

      setMessages([...messages, mess]);
    });
    socket.on("outgoing", (data) => {
      console.log("outgoing", data);
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.charCode == 13) {
      socket.emit("sendMessage", { user: socket.id, message, room });
      setMessage("");
    }
  };

  function callPeer(id) {
    console.log(id);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      // config: {
      //     iceServers: [
      //         {
      //             urls: "stun:numb.viagenie.ca",
      //             username: "sultan1640@gmail.com",
      //             credential: "98376683"
      //         },
      //         {
      //             urls: "turn:numb.viagenie.ca",
      //             username: "sultan1640@gmail.com",
      //             credential: "98376683"
      //         }
      //     ]
      // },
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", { to: id, signalData: data, from: socket.id });
    });

    peer.on("stream", (stream) => {
      if (recipientVideo.current) {
        recipientVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", (signal) => {
      peer.signal(signal);
    });
  }
  function acceptCall() {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      console.log(data, "to", socket.id);
      socket.emit("acceptCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      console.log("stream", stream);
      recipientVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    );
  }
  return (
    <div className="webinar-app">
      <main className="stream-main">
        <div className="stream-topbar">
          <div className="stream-topbar__left"></div>
          <div className="stream-topbar__right">
            <button
              className="stream-topbar__right__button"
              onClick={() => setisShowRightbar(!isShowRightbar)}
            >
              Участники
            </button>
            <div className={`rightbar ${isShowRightbar ? "show" : "hidden"}`}>
              {webinar &&
                webinar.users.map((user, idx) => (
                  <div key={idx} onClick={() => callPeer(user.socket)}>
                    {user.displayName}({user.socket})
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="stream-center">
          {incomingCall}
          <div className="stream-center__video">
            <video playsInline ref={userVideo} autoPlay />
            <video playsInline ref={recipientVideo} autoPlay />
          </div>
        </div>
        <div className="stream-chat-wrapper">
          <div className="stream-chat">
            {messages.length > 0 && (
              <ul>
                {messages.map(({ user, message }, idx) => (
                  <li className="stream-chat__message" key={idx}>
                    {idx < 1 ? (
                      <span className="stream-chat__message__author">
                        <b>{user}</b>:
                      </span>
                    ) : messages[idx - 1].user != messages[idx].user ? (
                      <span className="stream-chat__message__author">
                        <b>{user}</b>:
                      </span>
                    ) : (
                      ""
                    )}
                    <span className="stream-chat__message__text">
                      {message}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="stream-chat__textarea">
              <textarea
                placeholder="Type smth"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              ></textarea>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
const mapStateToProps = (state) => ({
  webinar: state.webinarReducer.webinar,
});
const mapDispatchToProps = (dispatch) => ({
  setWebinarInfo: (webinar) => dispatch(setWebinarInfo(webinar)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Webinar);
