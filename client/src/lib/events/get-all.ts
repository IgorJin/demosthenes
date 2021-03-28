import request from "../api/request";
import {Response} from "../api/response"

interface ResponseType {
  events: any; //TODO
}

const Request = () : Promise<Response<ResponseType>> => request.get("events");

export default Request;
