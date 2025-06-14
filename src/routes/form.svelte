<script lang="ts">
	let newTask = $state('');

	let {
		addTask
	}: {
		addTask: (newTask: string) => void;
	} = $props(); //create the add task variable to show it on the home

	function formSubmitted(e: SubmitEvent) {
		e.preventDefault();
		console.log(newTask);
		addTask(newTask);
		newTask = ''; //reset the form after add the task
	}
</script>

<form onsubmit={formSubmitted}>
	<label for=""
		>Task
		<input type="newTask" bind:value={newTask} />
	</label>
	<button>Add</button>
</form>
