<script lang="ts">
	// State for the new task input
	let newTask = $state('');

	// Props for component communication
	let { addTask }: { addTask: (newTask: string) => void } = $props();

	// Handle form submission
	function formSubmitted(e: SubmitEvent) {
		e.preventDefault();
		if (newTask.trim()) {
			addTask(newTask);
			newTask = ''; // Reset the form after adding the task
		}
	}
</script>

<!-- Task input form -->
<form on:submit={formSubmitted}>
	<div class="grid">
		<input type="text" bind:value={newTask} placeholder="What needs to be done?" required />
		<button type="submit">Add Task</button>
	</div>
</form>

<style>
	/* Grid layout for form elements */
	.grid {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1rem;
		align-items: center;
	}
</style>
