export enum Feed {
  ALL = "ALL",
  NEWS = "NEWS",
  MARKET = "MARKET",
  PRICE = "PRICE",
}

export type BaseEvent = {
  id: string;
  feed: Feed;
  ts: number;
  title: string;
  body?: string;
};
