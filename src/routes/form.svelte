<script lang="ts">
	let newTask = $state('');

	let { addTask }: { addTask: (newTask: string) => void } = $props();

	function formSubmitted(e: SubmitEvent) {
		e.preventDefault();
		if (newTask.trim()) {
			addTask(newTask);
			newTask = '';
		}
	}
</script>

<form onsubmit={formSubmitted} class="w-full max-w-xl mx-auto flex items-center gap-3 p-4 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg">
	<input
		type="text"
		bind:value={newTask}
		placeholder="What needs to be done?"
		required
		class="flex-1 px-5 py-3 text-sm sm:text-base rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none transition-all duration-300 shadow-inner"
	/>
	<button
		type="submit"
		class="px-5 py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
	>
		Add Task
	</button>
</form>
