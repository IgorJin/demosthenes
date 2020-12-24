import React, { useState, useEffect, useRef, useContext } from "react";
import { useRouteMatch } from "react-router-dom";
import { Context as VideoContext } from "../../lib/context/video"
import { Context as SocketContext } from "../../lib/context/socket"

import { setMeetingInfo } from "../../actions";
import { connect } from "react-redux";
import "./meeting.scss";

const Meeting = ({ meeting, setMeetingInfo }) => {
  let room = useRouteMatch("/meeting/:id/:userId").params.id;
  let currentUser = useRouteMatch("/meeting/:id/:userId").params.userId;
  const [isShowRightbar, setisShowRightbar] = useState(false);
  const [message, setMessage] = useState("");
  const [stream, setStream] = useState();
  const [messages, setMessages] = useState([]);


  const { init } = useContext(VideoContext);
  const { socket } = useContext(SocketContext);

  const userVideo = useRef();
  const recipientVideo = useRef();

  const handleKeyPress = (e) => {
    if (e.charCode == 13) {
      socket.emit("sendMessage", { user: socket.id, message, room });
      setMessage("");
    }
  };

  useEffect(() => {
    const initWrapper = async () => init();
    initWrapper();
  }, [socket])

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
              {meeting &&
                meeting.users.map((user, idx) => (
                  <div key={idx} onClick={() => { }}>
                    {user.displayName}({user.socket})
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="stream-center">
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
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  meeting: state.meetingReducer.meeting,
});
const mapDispatchToProps = (dispatch) => ({
  setMeetingInfo: (meeting) => dispatch(setMeetingInfo(meeting)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Meeting);
