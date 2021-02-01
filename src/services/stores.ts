import { writable } from "svelte/store";

export class Settings {

	static reviewTimeFunc : (box : number) => number = (box) => {
		return (2 * (box+3) ) * 1000
	}

	private static _reviewTimeFormula : string = "(2 * (box+3) ) * 1000"
	
	static set reviewTimeFormula(value : string) {
		try {
			this.reviewTimeFunc = eval(`(box)=>{return ${value}}`)
			this._reviewTimeFormula = value
			this.save()
		} catch (error) {
			console.log( error );
		}

	}

	static get reviewTimeFormula() {
		return this._reviewTimeFormula
	}

	static save() {
		localStorage.settings = JSON.stringify({
			reviewTimeFormula: this.reviewTimeFormula
		})
	}

	static load() {
		const data = JSON.parse(localStorage.settings)

		this.reviewTimeFormula = data.reviewTimeFormula
	}
}

export type Card = {
	front : string,
	back : string,
}
export function Card(front : string, back : string) : Card {
	return {front, back}
}

export type Box = {
	cards : Card[]
	lastReview : number
}
export function Box(): Box {
	return {
		cards: [],
		lastReview: Date.now()
	}
}

export class Deck {
	boxes : Box[] = []

	save() {
		localStorage.deck = JSON.stringify( this.boxes )
	}

	load() {
		this.boxes = JSON.parse(localStorage.deck)
	}

	get cards() {
		let cards = []
		for (const box of this.boxes) {
			for (const card of box.cards) {
				cards.push( card )
			}
		}
		return cards
	}

	getBoxReviewTime(box : number) {
		return Settings.reviewTimeFunc(box)
	}

	getNextBoxToReview() {
		let closestTimeBox = -1
		for (const i in this.boxes) {
			const box = this.boxes[i]
			if (box.cards.length != 0) {
				closestTimeBox = parseInt(i)
				break
			}
		}

		for (const i in this.boxes) {
			const box = this.boxes[i]

			if (box.cards.length == 0) continue

			if (box.lastReview < this.boxes[closestTimeBox].lastReview) {
				closestTimeBox = parseInt(i)
			}
		}

		return closestTimeBox
	}

	getNextBoxReviewTime() {
		const box = this.getNextBoxToReview()

		if (box == -1) return -1
		
		const time = (
			this.boxes[box].lastReview
			+ this.getBoxReviewTime(box)
			- Date.now()
		)
		return time
	}

	constructor() {
		for (let i = 0; i < 2; i++) {
			this.boxes.push( Box() )
		}
	}
}

export let deck = writable( new Deck() )

