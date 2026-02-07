import http from "http";
import { WebSocketServer } from "ws";

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on("connection", (client, req) => {
  const target = new WebSocket("ws://127.0.0.1:25565");

  client.on("message", msg => target.send(msg));
  target.on("message", msg => client.send(msg));

  client.on("close", () => target.close());
  target.on("close", () => client.close());
});

server.listen(process.env.PORT || 8080);
