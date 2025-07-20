import type { Actions, PageServerLoad } from './$types';
import type { Task } from '$lib/types';

const tasks: Task[] = [];

export const load: PageServerLoad = () => {
	return { tasks };
};

export const actions: Actions = {
	addTask: async ({ request }) => {
		const data = await request.formData();
		const title = data.get('newTask')?.toString().trim();

		if (title) {
			tasks.push({
				id: crypto.randomUUID(),
				title,
				done: false
			});
		}

		return { success: true };
	},

	toggleDone: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id')?.toString();

		if (id) {
			const task = tasks.find(t => t.id === id);
			if (task) {
				task.done = !task.done;
			}
		}

		return { success: true };
	}
};

