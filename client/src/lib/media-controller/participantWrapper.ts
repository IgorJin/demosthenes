import { User } from "../users";

export interface Participant {
  id: string;
  localStream: MediaStream;
  socketId: string;
  user?: User;
}

interface Props {
  
}

export function participantWrapping(props: Participant): Participant {
  return {
    ...props
  }
}