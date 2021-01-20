import { Writable, writable } from "svelte/store";

export class Card {
	constructor(
		public front = "front",
		public back = "back"
	) {}
}

export let boxes : Writable<Card[][]> = writable([[
	new Card("あ", "a"),
	new Card("え", "e"),
],[],[],[]])