<script>
    import { Settings } from "../services/stores.js";

    let reviewTime = Settings.reviewTimeFormula

    $: {
        try {
            // this is here to prevent invalid code
            // from going to the Settings
            eval(`(box)=>{return ${reviewTime}}`)
            Settings.reviewTimeFormula = reviewTime
            Settings.save()
        } catch (error) {
            console.log( error );
        }
    }

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