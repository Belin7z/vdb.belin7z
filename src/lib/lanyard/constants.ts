export const LANYARD_SOCKET_URL = "wss://api.lanyard.rest/socket";

export const LANYARD_OPCODE = {
  EVENT: 0,
  HELLO: 1,
  INITIALIZE: 2,
  HEARTBEAT: 3,
} as const;
