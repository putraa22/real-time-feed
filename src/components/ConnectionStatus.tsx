import { ConnectionState } from "../utils/useWebSocket";

type ConnectionStatusProps = {
  state: ConnectionState;
};

function Circle({ className, pulse }: { className?: string; pulse?: boolean }) {
  return (
    <div className="relative">
      <svg
        className={className}
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="currentColor"
      >
        <circle cx="5" cy="5" r="5" />
      </svg>
      {pulse && (
        <div
          className={`absolute inset-0 ${className} rounded-full animate-pulse-slow`}
          style={{ transform: "scale(1.5)" }}
        />
      )}
    </div>
  );
}

export function ConnectionStatus({ state }: ConnectionStatusProps) {
  const statusConfig = {
    connecting: {
      color: "text-yellow-500",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      borderColor: "border-yellow-200 dark:border-yellow-800",
      label: "Connecting...",
      pulse: true,
    },
    connected: {
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      label: "Connected",
      pulse: false,
    },
    disconnected: {
      color: "text-gray-500",
      bgColor: "bg-gray-50 dark:bg-gray-800/50",
      borderColor: "border-gray-200 dark:border-gray-700",
      label: "Disconnected",
      pulse: false,
    },
    error: {
      color: "text-red-500",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800",
      label: "Error",
      pulse: false,
    },
  };

  const config = statusConfig[state.status];

  return (
    <div
      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border ${config.bgColor} ${config.borderColor} mb-4 transition-all duration-300 ease-in-out shadow-sm`}
    >
      <Circle
        className={`w-2.5 h-2.5 ${config.color} fill-current`}
        pulse={config.pulse}
      />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {config.label}
      </span>
      {state.reconnectAttempt > 0 && (
        <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">
          (Attempt {state.reconnectAttempt})
        </span>
      )}
      {state.lastError && (
        <span
          className="text-xs text-red-600 dark:text-red-400 font-normal truncate max-w-[200px]"
          title={state.lastError}
        >
          - {state.lastError}
        </span>
      )}
    </div>
  );
}
