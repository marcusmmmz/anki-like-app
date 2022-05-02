<script lang="ts">
	import { db } from "$lib/db";
	import { settings } from "$lib/stores";
	import { exportDB } from "dexie-export-import";
	import download from "downloadjs";

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
		let exported = await exportDB(db);
		download(exported, "ala_data.json", "text/plain");
	}

	function onImportChange(
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) {
		let file = e.currentTarget.files?.item(0);
		if (file) {
			importData(file);
		}
	}
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
