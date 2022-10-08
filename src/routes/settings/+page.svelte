<script lang="ts">
	import { db } from "$lib/db";
	import { settings } from "$lib/stores";
	import download from "downloadjs";
	import { onMount } from "svelte";

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

	async function importData(file: File) {
		await db.import(file);
	}
	async function exportData() {
		let data = await db.export();

		download(data, "ala_data.json", "text/plain");
	}

	function onImportChange(
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		let file = e.currentTarget.files?.item(0);

		if (!file) return;

		importData(file);
	}

	onMount(async () => {
		await import("dexie-export-import");
	});
</script>

<button on:click={settings.clear}> Reset settings </button>
<br />
<label>
	import
	<input on:change={onImportChange} type="file" />
</label>
<br />
<button on:click={exportData}> export data </button>
<h2>advanced</h2>
<label>
	Review time: <input type="text" bind:value={reviewTime} />
</label>
