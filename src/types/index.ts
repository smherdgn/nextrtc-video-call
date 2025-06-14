export interface User {
  userId: string;
  email: string;
}

export interface DecodedToken extends User {
  iat: number;
  exp: number;
}

export interface SignalingMessage {
  type:
    | "offer"
    | "answer"
    | "ice-candidate"
    | "user-joined"
    | "user-left"
    | "call-ended"
    | "webrtc-state";
  payload: any;
  toUserId?: string;
  fromUserId?: string;
}

export interface OfferPayload {
  offer: RTCSessionDescriptionInit;
  fromUserId: string;
}

export interface AnswerPayload {
  answer: RTCSessionDescriptionInit;
  fromUserId: string;
}

export interface IceCandidatePayload {
  candidate: RTCIceCandidateInit | null;
  fromUserId: string;
}

export interface UserJoinedPayload {
  userId: string;
  email: string;
}

export interface UserLeftPayload {
  userId: string;
}

export interface CallEndedPayload {
  fromUserId: string;
}

export interface WebRTCStatePayload {
  peerSocketId: string; // The peer whose state changed
  iceState?: RTCIceConnectionState;
  signalingState?: RTCSignalingState;
}

// Socket.IO event payloads
export interface SocketOfferData {
  offer: RTCSessionDescriptionInit;
  toUserId: string;
}

export interface SocketAnswerData {
  answer: RTCSessionDescriptionInit;
  toUserId: string;
}

export interface SocketIceCandidateData {
  candidate: RTCIceCandidateInit | null;
  toUserId: string;
}

export interface SocketWebRTCStateData {
  peerSocketId: string;
  iceState?: RTCIceConnectionState;
  signalingState?: RTCSignalingState;
}

// Log Entry Structure
export type LogSource =
  | "CLIENT_APP"
  | "SERVER_API"
  | "SERVER_SOCKET"
  | "MIDDLEWARE";
export type LogType =
  | "SIGNALING_SERVER"
  | "SIGNALING_CLIENT"
  | "AUTH"
  | "API_CALL"
  | "WEBRTC_EVENT"
  | "ROOM_EVENT"
  | "ADMIN_ACCESS"
  | "SYSTEM_INFO"
  | "ERROR";

export interface LogEntry {
  id?: number; // Will be auto-generated by Supabase
  created_at?: string; // Will be auto-generated by Supabase
  log_type: LogType;
  user_email?: string | null;
  user_id_from_jwt?: string | null;
  socket_id?: string | null;
  room_id?: string | null;
  source: LogSource;
  message?: string | null;
  payload?: Record<string, any> | null;
  peer_socket_id?: string | null;
  webrtc_ice_state?: string | null;
  webrtc_signaling_state?: string | null;
}

export interface AdminLogFilters {
  log_type?: string;
  user_email?: string;
  room_id?: string;
  source?: string;
  date_from?: string;
  date_to?: string;
  search_term?: string;
}
