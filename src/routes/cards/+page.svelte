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

<div class="container">
	<form
		action=""
		on:submit|preventDefault={() =>
			addCard({
				front,
				back,
				box: 1,
				lastReview: null,
				nextReview: Date.now(),
			})}
	>
		<label>
			front
			<input bind:value={front} type="text" />
		</label>
		<label>
			back
			<textarea bind:value={back} rows="4" cols="40" type="text" />
		</label>
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
</div>

<style>
	.container {
		margin-top: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 16px;

		width: 50%;
	}

	label {
		display: flex;
		justify-content: space-between;
		width: 100%;
		font-size: 24px;
	}

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
