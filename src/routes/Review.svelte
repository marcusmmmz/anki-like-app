<script>
	import { onDestroy, onMount } from "svelte";

	import { deck, Box } from "../services/stores.js";

	let reviewing = false
	let showBack = false

	let boxIndex = $deck.getNextBoxToReview()

	$: currentBox = $deck.boxes[boxIndex]
	$: currentCard = currentBox.cards[0]

	let nextReviewTime = 0
	function updateNextReviewTime() {
		nextReviewTime = Math.round($deck.getNextBoxReviewTime() / 1000)

		if (nextReviewTime < 0 && currentCard) {
			reviewing = true
		}
	}

	function answer(right : boolean) {
		currentBox.cards.shift()

		let boxToPut = (right ? boxIndex+1 : 0)

		if (!$deck.boxes[boxToPut]) $deck.boxes[boxToPut] = Box()

		$deck.boxes[boxToPut].cards = [
			...$deck.boxes[boxToPut].cards,
			currentCard
		]
		
		if (currentBox.cards.length == 0) {
			currentBox.lastReview = Date.now()

			if ($deck.getNextBoxReviewTime() < 0) {
				boxIndex = $deck.getNextBoxToReview()
			} else {
				updateNextReviewTime()
				reviewing = false
				boxIndex = $deck.getNextBoxToReview()
			}

			$deck.save()
		}

		showBack = false
	}

	let nextReviewIntervalID : NodeJS.Timeout
	onMount(()=>{
		updateNextReviewTime()
		nextReviewIntervalID = setInterval(updateNextReviewTime, 1000)
	})

	onDestroy(()=>{
		clearInterval( nextReviewIntervalID )
	})

</script>

{#if reviewing}
	<p>{currentCard.front}</p>
	{#if showBack}
		<p>{currentCard.back}</p>
	{/if}
	
	{#if showBack}
		<button on:click={()=>answer(true)}>
			Right
		</button>
		<button on:click={()=>answer(false)}>
			Wrong
		</button>
	{:else}
		<button on:click={()=>showBack = true}> Show </button>
	{/if}
	
{:else}
	<h1> No cards to review </h1>
	<p> {nextReviewTime} </p>
{/if}
