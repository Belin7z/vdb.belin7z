import { LANYARD_OPCODE, LANYARD_SOCKET_URL } from "./constants";
import type { LanyardData, LanyardSocketMessage } from "./types";

interface LanyardSocketHandlers {
  onUpdate: (data: LanyardData) => void;
}

const RECONNECT_DELAY_MS = 3000;

export function connectLanyardSocket(
  discordId: string,
  { onUpdate }: LanyardSocketHandlers
): () => void {
  let socket: WebSocket | null = null;
  let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let closedByClient = false;

  function connect() {
    socket = new WebSocket(LANYARD_SOCKET_URL);

    socket.onmessage = (event) => {
      const message: LanyardSocketMessage = JSON.parse(event.data);

      if (message.op === LANYARD_OPCODE.HELLO) {
        heartbeatTimer = setInterval(() => {
          socket?.send(JSON.stringify({ op: LANYARD_OPCODE.HEARTBEAT }));
        }, message.d.heartbeat_interval);

        socket?.send(
          JSON.stringify({
            op: LANYARD_OPCODE.INITIALIZE,
            d: { subscribe_to_id: discordId },
          })
        );
        return;
      }

      if (message.op === LANYARD_OPCODE.EVENT) {
        onUpdate(message.d);
      }
    };

    socket.onclose = () => {
      if (heartbeatTimer) clearInterval(heartbeatTimer);
      if (!closedByClient) {
        reconnectTimer = setTimeout(connect, RECONNECT_DELAY_MS);
      }
    };
  }

  connect();

  return function disconnect() {
    closedByClient = true;
    if (heartbeatTimer) clearInterval(heartbeatTimer);
    if (reconnectTimer) clearTimeout(reconnectTimer);
    socket?.close();
  };
}
