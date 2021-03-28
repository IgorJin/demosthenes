import "webrtc-adapter";
import React, { FunctionComponent, Reducer, useContext, useEffect, useReducer, useState, useCallback } from "react";
import _differenceWith from "lodash/differenceWith";
import MediaController from "../media-controller";
import { Participant, participantWrapping } from "../media-controller/participantWrapper";
import { User } from "../users"
import { Context as SocketContext } from "./socket";

export interface ContextValue {
  init(user: User): void;
  participants: any;
  sendNewCandidate(candidate: any): void;
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
  const [participants, setParticipants] = useState<any[]>([]);//все потоки
  const [sockets, setSockets] = useState<any[]>([]);
  const [localConnection, setLocalConnection] = useState<any>(undefined);
  const [otherUser, setOtherUser] = useState("");
  let isAddTrack = false;
  console.log("Provider:FunctionComponent -> sockets", sockets)

  const handleSetSockets = useCallback(async (newSocket: any) => {
    if (!socket) {
      return;
    }

    setSockets([...sockets, newSocket]);
  }, [socket]);

  const handleICECandidateEvent = (e: any) => {
    trace("add candidate");
    if (e.candidate) {
      const payload = {
        target: otherUser,
        candidate: e.candidate,
      }
      socket?.emit("meeting:ice-candidate", payload);
    }
  }

  function trace(text: string, data?: any) {
    console.log((performance.now() / 1000).toFixed(3) + ": " + text, {
      ...data,
    });
  }

  const handleTrackEvent = async (e: any, participants: any) => {
    trace("has other peer");
    const localStream: MediaStream = e.streams[0];
    const newParticipant = participantWrapping({ id: (Math.random() * 101).toString(), localStream, socketId: socket?.id || "" })
    setParticipants([...participants, newParticipant]);

  };

  const handleNegotiationNeededEvent = (socketId: string) => {
    trace("handleNegotiationNeededEvent");

    if (!socket) {
      return;
    }
    localConnection.createOffer().then((offer: any) => (
      localConnection.setLocalDescription(offer)
    )).then(() => {
      const payload = {
        target: socketId,
        caller: socket.id,
        sdp: localConnection.localDescription
      };
      socket.emit("meeting:offer", payload);
    })
  }

  const createPeer = async (participants: any) => {
    const iceServers: any = [
      { url: "stun:stun2.1.google.com:19302" },
      { urls: "stun:stun.l.google.com:19302" },
    ];

    const peer = new RTCPeerConnection({ iceServers });

    trace("create peer");
    peer.onicecandidate = handleICECandidateEvent;
    
    peer.ontrack = (e) => handleTrackEvent(e, participants);

    return peer;
  }

  const handleRecieveCall = (incoming: any) => {
    if (!socket) {
      return;
    }
    trace("create answer");

    const desc = new RTCSessionDescription(incoming.sdp);
    localConnection.setRemoteDescription(desc).then(() => {
      // const localStream = participants.find((p) => p.socketId == socket?.id).localStream;
      // localStream.getTracks().forEach((track: any) => localConnection.addTrack(track, localStream));
    }).then(() => (localConnection.createAnswer()
    )).then((answer: any) => (localConnection.setLocalDescription(answer)
    )).then(() => {
      const payload = {
        target: incoming.caller,
        caller: socket.id,
        sdp: localConnection.localDescription
      }
      socket.emit("meeting:answer", payload);
    })
  }

  const handleAnswer = (message: any) => {
    trace("has answer", message)

    // const desc = new RTCSessionDescription(message.sdp);
    // localConnection.setRemoteDescription(desc).catch((e: any) => console.log(e));
  }

  const handleNewICECandidateMsg = (incoming: any) => {
    const candidate = new RTCIceCandidate(incoming);

    localConnection.addIceCandidate(candidate)
      .catch((e: any) => console.log(e));
  }

  const handleAddTrack = useCallback(async () => {
    console.log("in handleAddTrack");

    if (!socket || participants.length == 0 || !localConnection || isAddTrack) {
      return;
    }
    isAddTrack = true;
    const localStream = participants.find((p) => p.socketId == socket.id).localStream;
    localStream.getTracks().forEach((track: any) => localConnection.addTrack(track, localStream));

  }, [socket, participants, localConnection]);

  useEffect(() => {
    if (!socket || participants.length == 0 || !localConnection) return;
    handleSetSockets(socket.id);

    socket.on("NEW_USER", async (data: any) => {
      console.log("NEW_USER");//TODO deleted meetingUsers
      handleSetSockets(data.meetingUsers.sockets);
      const otherUser = data.meetingUsers.sockets.find((s: any) => s !== socket.id)
      setOtherUser(otherUser);
      console.log("Provider:FunctionComponent -> otherUser", otherUser)
      localConnection.onnegotiationneeded = () => handleNegotiationNeededEvent(otherUser);
      handleAddTrack();
    });

    socket.on("offer", handleRecieveCall);

    socket.on("answer", handleAnswer);

    socket.on("ice-candidate", handleNewICECandidateMsg);
  }, [socket, participants, localConnection]);

  console.log("Provider:FunctionComponent -> sockets", sockets);

  const sendNewCandidate = (candidate: any) => {
    socket?.emit("meeting:call-user", { candidate });
  }

  const init = async (user: User) => {
    if (!socket) {
      return;
    }
    const localStream: MediaStream = await MediaController.generateLocalStream();
    const participant = participantWrapping({ id: user.id, localStream, socketId: socket.id, user });
    await setParticipants([...participants, participant]);
    await setLocalConnection(await createPeer([...participants, participant]));
  }
  return (
    <Context.Provider
      value={{
        init,
        participants,
        sendNewCandidate,
      }}>
      {children}
    </Context.Provider>
  )
}