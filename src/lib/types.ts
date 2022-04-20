export interface ICard {
	id: number;
	front: string;
	back: string;
	lastReview: number | null; // in milliseconds
	nextReview: number; // in milliseconds
	box: number; // How many times the card has been successfully reviewed
}
