import "webrtc-adapter";
import React, { FunctionComponent, Reducer, useContext, useEffect, useReducer, useState } from "react";
import _differenceWith from "lodash/differenceWith";
import { v4 as uuid } from "uuid";
import MediaController from "../media-controller";
import { Context as SocketContext } from "./socket";

export interface ContextValue {
  init(): void;
  participants: any;
}

export interface ILocalStream {
  id: string;
  purpose: string;
  localStream: MediaStream;
  isCaller?: boolean;
}

export const Context = React.createContext<ContextValue>({} as ContextValue);

export const Provider: FunctionComponent = (props) => {
  const { children } = props;
  const { socket } = useContext(SocketContext);
  const [participants, setParticipants] = useState<any []>([]);//все потоки
  // useEffect(() => {

  //   navigator.mediaDevices
  //     .getUserMedia({ video: true, audio: true })
  //     .then((stream) => {
  //       setStream(stream);
  //       if (userVideo.current) {
  //         userVideo.current.srcObject = stream;
  //       }
  //     });

  //   socket.emit("meeting:join", { room, currentUser }, (error) => {
  //     if (error) {
  //       alert(error);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   socket.on("NEW_USER", (message) => {
  //     setMessages([
  //       ...messages,
  //       { user: message.user, message: message.message },
  //     ]);
  //     setMeetingInfo(message.meeting);
  //   });
  //   socket.on("getMessage", (mess) => {
  //     console.log(mess, "mess");

  //     setMessages([...messages, mess]);
  //   });
  //   socket.on("outgoing", (data) => {
  //     console.log("outgoing", data);
  //     setReceivingCall(true);
  //     setCaller(data.from);
  //     setCallerSignal(data.signal);
  //   });
  //   return () => {
  //     socket.emit("disconnect");
  //     socket.off();
  //   };
  // }, [messages]);

  const init = async () => {    
    const participant: any = await MediaController.generateLocalStream();
    setParticipants([...participants, participant]);
    //create local stream, get devices and tracks
    //setParticipants
  }
  return (
    <Context.Provider
      value={{
        init,
        participants,
      }}>
      {children}
    </Context.Provider>
  )
}