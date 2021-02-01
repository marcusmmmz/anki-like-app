<script>
	import { Card, deck } from "../services/stores";

	let front = ""
	let back = ""

	function addCard() {
		$deck.boxes[0].cards = [
			...$deck.boxes[0].cards,
			Card(front, back)
		]
		
		$deck.save()
	}
</script>

<h1>Add a card</h1>
<input bind:value={front} type="text" placeholder="front"> <br>
<input bind:value={back} type="text" placeholder="back"> <br>
<button on:click={addCard}> Add card </button>