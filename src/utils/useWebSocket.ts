import { useEffect, useRef, useState } from "react";
import { BaseEvent } from "../types";

export type ConnectionState = {
  status: "connecting" | "connected" | "disconnected" | "error";
  reconnectAttempt: number;
  lastError: string | null;
};

export function useWebSocket(url: string) {
  const wsRef = useRef<WebSocket | null>(null);
  const [events, setEvents] = useState<BaseEvent[]>([]);
  const [state, setState] = useState<ConnectionState>({
    status: "disconnected",
    reconnectAttempt: 0,
    lastError: null,
  });
  const retryRef = useRef(0);
  const eventIds = useRef(new Set<string>());

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const connect = () => {
      const ws = new WebSocket(url);
      wsRef.current = ws;
      setState({
        status: "connecting",
        reconnectAttempt: retryRef.current,
        lastError: null,
      });

      ws.onopen = () => {
        setState({
          status: "connected",
          reconnectAttempt: 0,
          lastError: null,
        });
        retryRef.current = 0;
      };

      ws.onmessage = (msg) => {
        try {
          const data: BaseEvent = JSON.parse(msg.data);
          if (!eventIds.current.has(data.id)) {
            eventIds.current.add(data.id);
            setEvents((prev) => [data, ...prev]);
          }
        } catch (err) {
          console.error("Malformed message", err);
          setState((prev) => ({
            ...prev,
            status: "error",
            lastError: err instanceof Error ? err.message : "Malformed message",
          }));
        }
      };

      ws.onclose = () => {
        retryRef.current += 1;
        setState({
          status: "disconnected",
          reconnectAttempt: retryRef.current,
          lastError: null,
        });
        const timeoutMs = Math.min(1000 * 2 ** retryRef.current, 10000);
        timeout = setTimeout(connect, timeoutMs);
      };

      ws.onerror = (err) => {
        console.error("WebSocket error", err);
        setState((prev) => ({
          ...prev,
          status: "error",
          lastError: "WebSocket connection error",
        }));
        ws.close();
      };
    };

    connect();
    return () => {
      wsRef.current?.close();
      clearTimeout(timeout);
    };
  }, [url]);

  return { events, state };
}
