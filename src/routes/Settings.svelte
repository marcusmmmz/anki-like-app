<script>
    import { Settings } from "../services/stores.js";

    let reviewTime = Settings.reviewTimeFormula

    $: Settings.reviewTimeFormula = reviewTime

    function clear() {
        localStorage.clear()
        location.reload()
    }
</script>

<button on:click={clear}> Clear data </button>
<h2>advanced</h2>
<label>
    Review time: <input type="text" bind:value={reviewTime}>
</label>
<h1>  </h1>