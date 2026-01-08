import { Feed } from "../types";

type Props = {
  current: Feed;
  onChange: (feed: Feed) => void;
};

export default function FeedTabs({ current, onChange }: Props) {
  const tabs = [Feed.ALL, Feed.NEWS, Feed.MARKET, Feed.PRICE];

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 ${
            current === tab
              ? "bg-blue-500 text-white shadow-md shadow-blue-500/30 dark:bg-blue-600"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
