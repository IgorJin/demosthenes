// import CameraDevices from "./camera-devices";
// import CameraSettings from "./camera-settings";

class WebRtcConnection {
  constructor(data) {
    // this.connectionId = data.connectionId;
    // this.publishCallId = data.publishCallId;
    // this.user = data.user;
    // this.type = data.type;
    // this.purpose = data.purpose;
    // this.iceServers = data.iceServers;
    // this.onGotOffer = data.onGotOffer;
    // this.onGotCandidate = data.onGotCandidate;
    // this.onGotRemoteStream = data.onGotRemoteStream;
    // this.onGotLocalStream = data.onGotLocalStream;
    // this.onErrorGettingMedia = data.onErrorGettingMedia;
    // this.sdpAnswerSet = false;
    // this.onIceConnectionStateDisconnected = data.onIceConnectionStateDisconnected;
    // this.connectionSettings = data.connectionSettings;
    // this.devicePermissions = data.devicePermissions;
  }

  // async generateLocalStream(devices) {
  //   try {
  //     const constraints = { audio: true, video: !this.user.isCaller };
  //     if (devices && constraints.video) constraints.video = devices.videoDeviceId || true;
  //     this.localStream = await CameraDevices.getUserMedia(CameraSettings.settings, constraints);
  //     CameraDevices.applyDeviceSettings(this.localStream, this.devicePermissions);
  //     if (this.onGotLocalStream) this.onGotLocalStream(this.localStream.getNativeStream());
  //   } catch (e) {
  //     if (this.onErrorGettingMedia) {
  //       this.onErrorGettingMedia(e);
  //     }
  //     throw e;
  //   }
  // }

  async createPeerConnection() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: this.iceServers,
    });
    this.peerConnection.onnegotiationneeded = () => {
      console.log("onnegotiationneeded");
    };
    console.log("CREATE PEER CONNECTION");
    this.peerConnection.oniceconnectionstatechange = () => {
      const iceConnectionState = this.peerConnection.iceConnectionState;
      console.log(`Ice changed: ${iceConnectionState}`);
      if (
        this.onIceConnectionStateDisconnected &&
        iceConnectionState === "disconnected"
      ) {
        this.onIceConnectionStateDisconnected();
      }
    };
    this.peerConnection.onicecandidate = (e) =>
      e.candidate && this.onGotCandidate(this.connectionId, e.candidate);
  }
}

class MediaController {

  async generateLocalStream() {  //Get video from your webcam
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    console.log(stream, stream.getTracks());
    return stream;
  }

  //

  // async createPublishConnection(data) {
  //   const { isFrontCameraDefault } = data;
  //   const connection = new WebRtcConnection({ ...data, type: "publish" });
  //   if (!isFrontCameraDefault) {
  //     CameraDevices.applyNewDevices(this.devicePermissions, { isFrontCamera: false });
  //   }
  //   this.connections[connection.connectionId] = connection;
  //   await connection.generateLocalStream(null, { isFrontCamera: isFrontCameraDefault });
  //   await connection.createPeerConnection();
  //   await connection.createOffer(true);
  // }

  // async createViewConnection(data) {
  //   const connection = new WebRtcConnection({ ...data, type: "view" });
  //   //need to get user media before view. safari specific
  //   // if (browser.name === "safari" && !this.localStream) {
  //   //     await connection.getUserMedia();
  //   // }
  //   await connection.createPeerConnection();
  //   await connection.createOffer();

  //   this.connections[connection.connectionId] = connection;
  // }

  // async stopViewConnection(userId, purpose) {
  //   const connection = this.getConnection(userId, "view", purpose);
  //   if (!connection) {
  //     return;
  //   }
  //   await this.clearConnection(connection);
  //   return connection.connectionId;
  // }

  // async stopPublishConnection(userId, purpose) {
  //   const connection = this.getConnection(userId, "publish", purpose);
  //   if (!connection) {
  //     return;
  //   }
  //   await this.clearConnection(connection);
  //   return connection.connectionId;
  // }

  // async clearConnection(connection) {
  //   await connection.release();
  //   delete this.connections[connection.connectionId];
  // }

  // async addIceCandidate({ candidate, connectionId }) {
  //   const connection = this.connections[connectionId];
  //   if (connection && connection.sdpAnswerSet) {
  //     return await connection.addIceCandidate(candidate);
  //   }
  //   this.candidateQueue[connectionId] = this.candidateQueue[connectionId] || [];
  //   this.candidateQueue[connectionId].push(candidate);
  // }

  // async addAnswer({ answer, connectionId }) {
  //   const connection = this.connections[connectionId];
  //   await connection.addAnswer(answer);
  //   const candidateQueue = this.candidateQueue[connectionId];
  //   if (candidateQueue) {
  //     for (let i = 0; i < candidateQueue.length; i++) {
  //       await connection.addIceCandidate(candidateQueue[i]);
  //     }
  //     delete this.candidateQueue[connectionId];
  //   }
  // }

  // getConnection(id, type, purpose) {
  //   const predicate = (c) => c.user.id === id && c.type === type && (!purpose || c.purpose === purpose);
  //   return Object.values(this.connections).find(predicate);
  // }

  // getConnections(id, type, purpose) {
  //   const predicate = (c) => c.user.id === id && c.type === type && (!purpose || c.purpose === purpose);
  //   return Object.values(this.connections).filter(predicate);
  // }

  // getAllConnections() {
  //   return Object.values(this.connections).reduce((acc, v) => [...acc, v], []);
  // }

  // updateDevicePermissions(userId, devicePermissions) {
  //   const connection = this.getConnection(userId, "publish", "call");
  //   if (connection) {
  //     connection.updateDevicePermissions(devicePermissions);
  //   }
  // }

  // async changeCamera(userId, { isFrontCamera }) {
  //   const connection = this.getConnection(userId, "publish", "call");
  //   if (connection) {
  //     await connection.changeCamera({ isFrontCamera });
  //   }
  // }

  // async refreshCameraDevices(userId) {
  //   const connection = this.getConnection(userId, "publish", "call");
  //   if (connection) {
  //     const actualDevices = connection.localStream.getStreamDevices();
  //     await connection.updateDeviceSettings(actualDevices);
  //   }
  // }

  // async clear() {
  //   for (let connectionId in this.connections) {
  //     await this.clearConnection(this.connections[connectionId]);
  //   }
  // }
}

export default new MediaController();
