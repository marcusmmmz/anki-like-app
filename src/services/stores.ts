import { writable } from "svelte/store";

export class Settings {

	static reviewTimeFunc : (box : number) => number = (box) => {
		return (2 * (box+3) ) * 1000
	}

	private static _reviewTimeFormula : string = "(2 * (box+3) ) * 1000"
	
	static set reviewTimeFormula(value : string) {
		this._reviewTimeFormula = value
		this.reviewTimeFunc = eval(`(box)=>{return ${this.reviewTimeFormula}}`)
	}

	static get reviewTimeFormula() {
		return this._reviewTimeFormula
	}

	// static get reviewTimeFunc() : (box : number) => number {
	// 	return eval(`(box)=>{return ${this.reviewTimeFormula}}`)
	// }

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
export function Card(front : string, back : string) {
	return {front, back}
}

export class Box {
	cards : Card[] = []

	review() {
		this.lastReview = Date.now()
	}

	constructor(
		public lastReview = Date.now()
	) {}
}

export class Deck {
	boxes : Box[] = []

	save() {
		let data : Card[][] = []
		for (const i in this.boxes) {
			let box = this.boxes[i]
			data.push( [] )

			for (const card of box.cards) {
				data[i].push(card)
			}
		}
		localStorage.deck = JSON.stringify(data)
	}

	load() {
		const data : Card[][] = JSON.parse(localStorage.deck)
		
		for (const i in data) {
			while (this.boxes.length < data.length) {
				this.boxes.push( new Box() )
			}

			const box = data[i]
			for (const card of box) {
				this.boxes[parseInt(i)].cards.push(card)
			}
		}
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
	
	reviewBox(box : number) {
		this.boxes[box].review()
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
			this.boxes.push( new Box() )
		}
	}
}

export let deck = writable( new Deck() )

