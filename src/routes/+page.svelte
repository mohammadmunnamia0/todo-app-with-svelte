<script lang="ts">
	import type { PageData } from './$types';
	import type { Task } from '$lib/types';

	const { data } = $props<{ data: PageData }>();

	let filter = $state<'all' | 'active' | 'completed'>('all');

	let filteredTasks = $derived(
		data.tasks.filter((task: Task) => {
			if (filter === 'active') return !task.done;
			if (filter === 'completed') return task.done;
			return true;
		})
	);

	let remainingCount = $derived(data.tasks.filter((task: Task) => !task.done).length);
</script>

<main class="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow space-y-6">
	<h1 class="text-2xl font-bold text-gray-800">Todo App</h1>

	<!-- Form using SvelteKit form action -->
	<form method="POST" action="?/addTask" class="flex gap-2">
		<input
			type="text"
			name="newTask"
			class="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
			placeholder="What needs to be done?"
			required
		/>
		<button
			type="submit"
			class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
		>
			Add Task
		</button>
	</form>

	<!-- Filter Buttons -->
	<nav class="flex gap-2">
		{#each ['all', 'active', 'completed'] as type}
			{@const typedType = type as 'all' | 'active' | 'completed'}
			<button
				class="px-4 py-1 border rounded text-sm transition"
				class:border-blue-500={filter === typedType}
				class:bg-blue-100={filter === typedType}
				onclick={() => (filter = typedType)}
			>
				{typedType[0].toUpperCase() + typedType.slice(1)}
			</button>
		{/each}
	</nav>

	<!-- Task List -->
	<ul class="space-y-2">
		{#each filteredTasks as task (task.id)}
			<li class="flex items-center justify-between bg-gray-50 p-2 rounded border">
				<label class="flex items-center gap-2">
					<input type="checkbox" checked={task.done} disabled class="accent-blue-600" />
					<span class:line-through={task.done} class:text-gray-400={task.done}>
						{task.title}
					</span>
				</label>
			</li>
		{/each}
	</ul>

	{#if data.tasks.length > 0}
		<footer class="text-right text-sm text-gray-500">
			{remainingCount} item(s) left
		</footer>
	{/if}
</main>
