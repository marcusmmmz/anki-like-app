import { Writable, writable } from "svelte/store";

interface ISerializable {
	serialize : () => string
	deserialize : (serialized_data : string) => void
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

export class Deck implements ISerializable {
	boxes : Box[] = []

	serialize() {
		let data : Card[][] = []
		for (const i in this.boxes) {
			let box = this.boxes[i]
			data.push( [] )

			for (const card of box.cards) {
				data[i].push(card)
			}
		}
		return JSON.stringify(data)
	}

	deserialize(serialized_data : string) {
		const data = JSON.parse( serialized_data )
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
		return (2 * (box+3) ) * 1000
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

export let deck : Writable<Deck> = writable( new Deck() )

