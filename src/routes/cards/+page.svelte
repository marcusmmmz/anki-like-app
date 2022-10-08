<script lang="ts">
	import { cards, db } from "$lib/db";
	import type { ICard } from "$lib/types";

	let front = "",
		back = "";

	function addCard(card: Omit<ICard, "id">) {
		db.cards.add(card as ICard);
	}
	function deleteCard(id: ICard["id"]) {
		db.cards.delete(id);
	}
</script>

<form
	action=""
	on:submit|preventDefault={() =>
		addCard({ front, back, box: 1, lastReview: null, nextReview: Date.now() })}
>
	<label for=""> front </label>
	<input bind:value={front} type="text" /><br />
	<label for=""> back </label>
	<input bind:value={back} type="text" /><br />
	<input type="submit" />
</form>

<div class="card-container">
	{#each $cards as card (card.id)}
		<div class="card">
			<p>{card.front}, {card.back}</p>
			<button on:click={() => deleteCard(card.id)}>delete</button>
		</div>
	{/each}
</div>

<style>
	.card-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.card {
		display: flex;
		flex-direction: row;
		width: 80%;
		height: 10%;
		justify-content: space-between;
		align-items: center;
	}

	.card button {
		/* gambiarra, bodge */
		height: 4vh;
	}
</style>
