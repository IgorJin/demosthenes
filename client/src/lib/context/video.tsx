import "webrtc-adapter";
import React, { FunctionComponent, Reducer, useContext, useEffect, useReducer, useState } from "react";
import _differenceWith from "lodash/differenceWith";
import { v4 as uuid } from "uuid";
import WebRtcController from "../webRTC/index";
import { Context as SocketContext } from "./socket";
import AuthContext from "./auth";

