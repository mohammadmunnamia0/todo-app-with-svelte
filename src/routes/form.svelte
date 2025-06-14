<script lang='ts'>
    let newTask = $state('');

    function formSubmitted(e: SubmitEvent){
        e.preventDefault();
        console.log(newTask)
    }

</script>

<form onsubmit={formSubmitted}>
    <label for="">Task
        <input type="newTask" bind:value={newTask}>
    </label>
    <button>Add</button>
</form>