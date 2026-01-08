import { BaseEvent, Feed } from "../types";

const feedColors: Record<Feed, string> = {
  [Feed.ALL]: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
  [Feed.NEWS]:
    "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  [Feed.MARKET]:
    "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  [Feed.PRICE]:
    "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
};

export default function FeedCard({ event }: { event: BaseEvent }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-xl mb-3 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out animate-fade-in hover:border-gray-300 dark:hover:border-gray-600">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 font-medium">
            {new Date(event.ts).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <div className="font-semibold text-gray-900 dark:text-gray-100 text-base mb-1.5">
            {event.title}
          </div>
          {event.body && (
            <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              {event.body}
            </div>
          )}
        </div>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
            feedColors[event.feed]
          }`}
        >
          {event.feed}
        </span>
      </div>
    </div>
  );
}
