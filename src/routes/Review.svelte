<script>
	import { deck, Box } from "../services/stores.js";

	let reviewing = false
	let showBack = false

	let boxIndex = 0

	$: currentBox = $deck.boxes[boxIndex]
	$: currentCard = currentBox.cards[0]

	$: {
		if (!reviewing) {
			setTimeout(()=>{
				boxIndex = $deck.getNextBoxToReview()
				reviewing = true
			}, $deck.getNextBoxReviewTime() )
		}
	}

	let nextReviewTime = 0
	function updateNextReviewTime() {
		nextReviewTime = Math.round($deck.getNextBoxReviewTime() / 1000)
	}
	
	setInterval(updateNextReviewTime, 1000)

	function answer(right : boolean) {
		currentBox.cards.shift()

		let boxToPut = (right ? boxIndex+1 : 0)

		if (!$deck.boxes[boxToPut]) $deck.boxes[boxToPut] = new Box()

		$deck.boxes[boxToPut].cards = [
			...$deck.boxes[boxToPut].cards,
			currentCard
		]
		
		if (currentBox.cards.length == 0) {
			currentBox.review()

			if ($deck.getNextBoxReviewTime() < 0) {
				boxIndex = $deck.getNextBoxToReview()
			} else {
				updateNextReviewTime()
				reviewing = false
			}

			$deck.save()
		}

		showBack = false
	}

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
