<script lang="ts">

	import '@picocss/pico/css/pico.min.css';
	import Form from './form.svelte';

	// Define the Task with their types
	type Task = {
		id: string;
		title: string;
		done: boolean;
	};


	let tasks = $state<Task[]>([]);
	let filter = $state<'all' | 'active' | 'completed'>('all');

	// Task management functions to add the new function
	function addTask(newTask: string) {
		tasks.push({
			id: crypto.randomUUID(),
			title: newTask,
			done: false
		});
	}

	function toggleTask(id: string) {
		const task = tasks.find((t) => t.id === id);
		if (task) task.done = !task.done;
	}

	function deleteTask(id: string) {
		tasks = tasks.filter((task) => task.id !== id);
	}

	// Derived state Checking is it completedor not
	let filteredTasks = $derived(
		tasks.filter((task) => {
			if (filter === 'active') return !task.done;
			if (filter === 'completed') return task.done;
			return true;
		})
	);

	let remainingCount = $derived(tasks.filter((task) => !task.done).length);
</script>

<main class="container">
	<article>
	
		<header>
			<h1>Todo App</h1>
		</header>

		<!-- Task form -->
		<Form {addTask} />

	
		<nav>
			<ul>
				<li>
					<button class="outline" class:active={filter === 'all'} on:click={() => (filter = 'all')}>
						All
					</button>
				</li>
				<li>
					<button
						class="outline"
						class:active={filter === 'active'}
						on:click={() => (filter = 'active')}
					>
						Active
					</button>
				</li>
				<li>
					<button
						class="outline"
						class:active={filter === 'completed'}
						on:click={() => (filter = 'completed')}
					>
						Completed
					</button>
				</li>
			</ul>
		</nav>

		
		<ul>
			{#each filteredTasks as task (task.id)}
				<li>
					<div class="grid">
						<label>
							<input type="checkbox" checked={task.done} on:change={() => toggleTask(task.id)} />
							<span class:completed={task.done}>{task.title}</span>
						</label>
						<button class="outline secondary" on:click={() => deleteTask(task.id)}> Delete </button>
					</div>
				</li>
			{/each}
		</ul>

		
		{#if tasks.length > 0}
			<footer>
				<small>{remainingCount} items left</small>
			</footer>
		{/if}
	</article>
</main>

<style>
	/* Layout */
	.container {
		max-width: 800px;
		margin: 2rem auto;
		padding: 0 1rem;
	}

	/* Card  */
	article {
		background: var(--card-background-color);
		padding: 2rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	/* Navigation */
	nav ul {
		display: flex;
		gap: 1rem;
		padding: 0;
		margin: 1rem 0;
	}

	nav button {
		margin: 0;
	}

	nav button.active {
		background: var(--primary);
		color: var(--primary-inverse);
	}

	/* List */
	ul {
		list-style: none;
		padding: 0;
	}

	li {
		margin: 0.5rem 0;
		padding: 0.5rem;
		border-radius: 4px;
		background: var(--card-sectionning-background-color);
	}

	/* Task completion */
	.completed {
		text-decoration: line-through;
		opacity: 0.6;
	}

	/* Footer */
	footer {
		margin-top: 1rem;
		text-align: right;
	}

	/* Grid  */
	.grid {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 1rem;
		align-items: center;
	}
</style>
