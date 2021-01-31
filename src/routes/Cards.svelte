<script>
	import {  deck } from "../services/stores.js"

	function removeCard(box : number, index : number) {
		$deck.boxes[box].cards = $deck.boxes[box].cards.filter(
			(card, i) => i != index
		)
	}
</script>

<a href="/#/cards/add">
	<button> Add a card </button>
</a>

<br>
{#each $deck.boxes as box, i}
	{#each box.cards as card, j}
	<div>
		{card.front} {card.back}
		<button on:click={()=>removeCard(i, j)}> Delete </button>
		<br>
	</div>
	{/each}
{/each}