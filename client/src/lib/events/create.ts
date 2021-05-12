import request from "../api/request";
import { Response } from "../api/response";

interface RequestType {
  title: string;
  hostId: string;
}

interface ResponseType {
  events: any;
}

const Request = (data: RequestType): Promise<Response<ResponseType>> => request.post("events", data);

export default Request;
