<nav>
	<!-- <a href="/"><button>Home</button></a> -->
	<a href="/review"><button>Review</button></a>
	<a href="/cards"><button>Manage cards</button></a>
	<a href="/settings"><button>Settings</button></a>
</nav>
<slot />

<style>
	:global(body) {
		margin: 0;
		font-family: Arial, Helvetica, sans-serif;
		font-size: 5vmin;
		word-wrap: break-word;
		height: 100vh;
		width: 100vw;
		text-align: center;
		background: black;
		color: rgb(221, 221, 221);
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
