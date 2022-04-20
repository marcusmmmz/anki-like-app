<script lang="ts">
	import { db } from "$lib/db";
	import { onMount } from "svelte";

	onMount(async () => {
		// await db.cards.add({
		// 	back: "a",
		// 	front: "b",
		// });
		// let cards = myDb.collection<{
		// 	front: string;
		// 	back: string;
		// }>("cards");
		// cards.add({
		// 	front: "front",
		// 	back: "back",
		// });
		// console.log(await Promise.all((await cards.get()).map((v) => v.get())));
		// alert(
		// 	cards.doc("0").get()
		// )
	});
</script>

<h1>Welcome to Anki-Like App!</h1>
<p>
	Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, vero minima,
	cupiditate necessitatibus praesentium sed dicta quisquam accusamus numquam
	deserunt delectus animi, atque cumque dolor temporibus harum eum amet eius!
</p>
