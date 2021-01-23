<script lang="typescript">
	import Router from "svelte-spa-router"
	import routes from "./routes.js"
</script>

<div class="App">
	<nav>
		<a href="/#/"><button> Review </button> </a>
		<a href="/#/cards/add"> <button>Add card</button> </a>
	</nav>
	<Router {routes}/>
</div>

<style>
	:global(body) {
		margin: 0;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 5vmin;
		word-wrap: break-word;
	}
	.App {
		height: 100vh;
		width: 100vw;
		text-align: center;

		background: black;
		color:  rgb(221, 221, 221);
	}
	nav {
		font-size: 4vmin;

		height: 10%;
		display: flex;
		justify-content: center;
		align-items: center;

		background: rgb(30, 30, 30);
	}
	nav a {
		margin: 0 1vmin;
		height: 50%;
		width: 25%;
	}
	nav button {
		height: 100%;
		width: 100%;
	}
</style>