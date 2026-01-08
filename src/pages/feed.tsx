"use client";

import { useState, useMemo } from "react";
import { Feed } from "../types";
import { useWebSocket } from "../utils/useWebSocket";
import FeedTabs from "../components/FeedTabs";
import FeedCard from "../components/FeedCard";
import { ConnectionStatus } from "../components/ConnectionStatus";

export default function FeedPage() {
  const { events, state } = useWebSocket("ws://localhost:4000");
  const [filter, setFilter] = useState<Feed>(Feed.ALL);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchFeed = filter === Feed.ALL || e.feed === filter;
      const matchSearch =
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        (e.body && e.body.toLowerCase().includes(search.toLowerCase()));
      return matchFeed && matchSearch;
    });
  }, [events, filter, search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Real-Time Feed
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stay updated with the latest events
          </p>
        </div>

        <ConnectionStatus state={state} />

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <FeedTabs current={filter} onChange={setFilter} />

          <div className="relative mb-4">
            <input
              className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="h-[600px] overflow-y-auto pr-2 scroll-smooth">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <svg
                  className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                  {search
                    ? "No events found matching your search"
                    : "No events yet"}
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                  {search
                    ? "Try adjusting your search terms"
                    : "Events will appear here when they arrive"}
                </p>
              </div>
            ) : (
              <div className="space-y-0">
                {filtered.map((ev, index) => (
                  <div
                    key={ev.id}
                    style={{
                      animationDelay: `${Math.min(index * 50, 500)}ms`,
                    }}
                    className="animate-fade-in"
                  >
                    <FeedCard event={ev} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {filtered.length > 0 && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Showing {filtered.length} of {events.length} event
            {events.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
}
