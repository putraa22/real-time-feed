import WebSocket, { WebSocketServer } from "ws";
import { Feed, BaseEvent } from "../types";

const wss = new WebSocketServer({ port: 4000 });

function randomEvent(): BaseEvent {
  const feeds = [Feed.NEWS, Feed.MARKET, Feed.PRICE];
  return {
    id: Math.random().toString(36).substring(2, 10),
    feed: feeds[Math.floor(Math.random() * feeds.length)],
    ts: Date.now(),
    title: "Event " + Math.floor(Math.random() * 100),
    body: "This is a mock event",
  };
}

wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected");

  const interval = setInterval(() => {
    ws.send(JSON.stringify(randomEvent()));
  }, 1500);

  ws.on("close", () => clearInterval(interval));
});

console.log("✅ Mock WebSocket server running on ws://localhost:4000");
