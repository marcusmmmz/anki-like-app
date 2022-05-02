<script lang="ts">
	import { db } from "$lib/db";
	import { settings } from "$lib/stores";

	import { useLiveQuery } from "$lib/utils";

	import { onDestroy, onMount } from "svelte";

	let currentCard = useLiveQuery(() =>
		db.cards.where("nextReview").belowOrEqual(Date.now()).first()
	);

	let showBack = false;

	function deleteCurrentCard() {
		if (!$currentCard) return;

		db.cards.delete($currentCard.id);
	}

	function answer(isCorrect: boolean) {
		if (!$currentCard) throw new Error("currentCard shouldn't be undefined");

		let box = isCorrect ? $currentCard.box + 1 : 1;

		db.cards.update($currentCard.id, {
			lastReview: Date.now(),
			nextReview: Date.now() + settings.reviewTimeFunc(box),
			box,
		});

		showBack = false;
	}

	let nextCard = useLiveQuery(() => db.cards.orderBy("nextReview").first());

	let displayedNextReviewTime = 0;
	function updateNextReviewTime() {
		if ($currentCard) return;
		if (!$nextCard) return;

		displayedNextReviewTime = Math.round(
			($nextCard.nextReview - Date.now()) / 1000
		);

		if (displayedNextReviewTime <= 1) {
			currentCard = currentCard; // For reactivity
		}
	}

	$: if (!$currentCard) {
		$nextCard;
		updateNextReviewTime();
	}

	let nextReviewIntervalID: NodeJS.Timeout;
	onMount(() => {
		nextReviewIntervalID = setInterval(updateNextReviewTime, 1000);
	});

	onDestroy(() => {
		clearInterval(nextReviewIntervalID);
	});
</script>

{#if $currentCard}
	<p>{$currentCard.front}</p>
	{#if showBack}
		<p>{$currentCard.back}</p>
	{/if}

	{#if showBack}
		<button on:click={() => answer(true)}> Right </button>
		<button on:click={() => answer(false)}> Wrong </button>
		<button on:click={deleteCurrentCard}>Delete</button>
	{:else}
		<button on:click={() => (showBack = true)}> Show </button>
	{/if}
{:else if $nextCard}
	<h1>Next review in {displayedNextReviewTime} seconds</h1>
{:else}
	<h1>No cards to review</h1>
{/if}
