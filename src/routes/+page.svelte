<script lang="ts">
	import type { Task } from '$lib/types';
	import { page } from '$app/stores';
	import { writable, derived } from 'svelte/store';
	import { get } from 'svelte/store';

	const filter = writable<'all' | 'active' | 'completed'>('all');

	$: tasks = get(page).data.tasks as Task[];

	const filteredTasks = derived([filter, page], ([$filter, $page]) => {
		const tasks = $page.data.tasks as Task[];
		return tasks.filter(task => {
			if ($filter === 'active') return !task.done;
			if ($filter === 'completed') return task.done;
			return true;
		});
	});

	const remainingCount = derived(filteredTasks, $filteredTasks =>
		$filteredTasks.filter(task => !task.done).length
	);
</script>

<main class="min-h-screen bg-gray-100 py-10 px-4">
	<section class="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md space-y-8">
		<h1 class="text-3xl font-bold text-center text-gray-800">📝 Todo App</h1>

		<!-- Add Task Form -->
		<form
			method="POST"
			action="?/addTask"
			class="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition"
		>
			<input
				type="text"
				name="newTask"
				class="flex-grow bg-transparent placeholder-gray-500 text-gray-900 focus:outline-none text-sm px-2"
				placeholder="Add a new task..."
				required
			/>
			<button
				type="submit"
				class="shrink-0 bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 active:scale-95 transition-transform"
			>
				Add
			</button>
		</form>

		<!-- Filters -->
		<nav class="flex justify-center gap-3">
			{#each ['all', 'active', 'completed'] as type}
				{@const typedType = type as 'all' | 'active' | 'completed'}
				<button
					class="px-4 py-1 border rounded-full text-sm transition font-medium"
					class:border-blue-500={$filter === typedType}
					class:bg-blue-100={$filter === typedType}
					on:click={() => filter.set(typedType)}
				>
					{typedType[0].toUpperCase() + typedType.slice(1)}
				</button>
			{/each}
		</nav>

		<!-- Task List -->
		{#if $filteredTasks.length > 0}
			<ul class="space-y-3">
				{#each $filteredTasks as task (task.id)}
					<li class="flex items-center gap-3 bg-gray-50 p-3 rounded-lg border hover:shadow-sm transition">
						<form method="POST" action="?/toggleDone" class="flex items-center gap-3 w-full">
							<input type="hidden" name="id" value={task.id} />
							<input
								type="checkbox"
								checked={task.done}
								on:change={e => e.currentTarget.form?.requestSubmit()}
								class="accent-blue-600 w-5 h-5"
							/>
							<span class={`flex-grow text-sm ${task.done ? 'line-through text-gray-400' : 'text-gray-800'}`}>
								{task.title}
							</span>
						</form>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-center text-gray-400 text-sm">No tasks found for this filter.</p>
		{/if}

		<!-- Footer -->
		{#if tasks.length > 0}
			<footer class="text-right text-sm text-gray-500">
				{$remainingCount} item(s) left
			</footer>
		{/if}
	</section>
</main>
