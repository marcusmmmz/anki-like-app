<script>
	import { Card, boxes } from "../services/cards";

	let front = ""
	let back = ""

	function addCard() {
		$boxes[0] = [
			...$boxes[0],
			new Card(front, back)
		]
	}
</script>

<h1>Add a card</h1>
<input bind:value={front} type="text" placeholder="front"> <br>
<input bind:value={back} type="text" placeholder="back"> <br>
<button on:click={addCard}> Add card </button>