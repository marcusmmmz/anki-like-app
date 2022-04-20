<script lang="ts">
	import { settings } from "$lib/stores";

	let reviewTime = $settings.reviewTimeFormula;

	$: setReviewTimeFormula(reviewTime);

	function setReviewTimeFormula(value: string) {
		try {
			eval(`(box)=>{return ${value}}`); // Checking if it's valid
			$settings.reviewTimeFormula = value;
		} catch (error) {
			console.log(error);
		}
	}
</script>

<button on:click={settings.clear}> Reset settings </button>
<h2>advanced</h2>
<label>
	Review time: <input type="text" bind:value={reviewTime} />
</label>
