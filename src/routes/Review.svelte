<script>
	import { boxes } from "../services/cards"
	export let reviewing = false

	let boxIndex = 0
	let showBack = false

	$: currentBox = $boxes[boxIndex]
	$: currentCard = currentBox[0]
	$: reviewing = (currentBox.length == 0)

	function answer(right = true) {
		currentBox.shift()

		let boxToPut = (right ? boxIndex+1 : 0)
		$boxes[boxToPut] = [
			...$boxes[boxToPut],
			currentCard
		]

		showBack = false
	}

	function show() {
		showBack = true
	}

</script>

{#if !reviewing}
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
		<button on:click={show}> Show </button>
	{/if}
	
{:else}
<h1> No cards to review</h1>
<p> Review box: </p>
{#each $boxes as box, i}
	<button on:click={()=>boxIndex = i}> {i} </button>
{/each}
{/if}