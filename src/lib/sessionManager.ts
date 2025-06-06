export type SessionStatus = 'connected' | 'signaling' | 'in-call' | 'left';

export interface Session {
  userId: string;
  socketId: string;
  roomId?: string;
  status: SessionStatus;
}

const sessions = new Map<string, Session>();

export function addSession(userId: string, socketId: string): Session {
  const session: Session = { userId, socketId, status: 'connected' };
  sessions.set(socketId, session);
  return session;
}

export function updateSession(
  socketId: string,
  updates: Partial<Omit<Session, 'socketId' | 'userId'>>
): Session | undefined {
  const session = sessions.get(socketId);
  if (!session) return undefined;
  Object.assign(session, updates);
  return session;
}

export function removeSession(socketId: string): void {
  sessions.delete(socketId);
}

export function getSession(socketId: string): Session | undefined {
  return sessions.get(socketId);
}

export function getAllSessions(): Session[] {
  return Array.from(sessions.values());
}
