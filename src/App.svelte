<script>
	// import { Router, Link, Route } from "svelte-routing";
	import Review from "./routes/Review.svelte";
	import AddCard from "./routes/AddCard.svelte";

	let reviewing = false
</script>

<div class="App">
	<Review bind:reviewing/>
	{#if reviewing}
	<AddCard /> <br>
	{/if}
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: Arial, Helvetica, sans-serif;
		word-wrap: break-word;
		font-size: 5vmin;

		background: black;
		color:  #ddd;
	}
	.App {
		text-align: center;
	}
</style>