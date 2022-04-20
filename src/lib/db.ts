import Dexie from "dexie";
import type { ICard } from "./types";
import { useDefaultStoreValue, useLiveQuery } from "./utils";

export class DB extends Dexie {
	cards!: Dexie.Table<ICard, number>;

	constructor() {
		super("anki-like-app");
		this.version(1).stores({
			cards: "++id, front, back, lastReview, nextReview, box",
		});
	}
}

export const db = new DB();

export const cards = useDefaultStoreValue(
	useLiveQuery(() => db.cards.toArray()),
	[]
);
