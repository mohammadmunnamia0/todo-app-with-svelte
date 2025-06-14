<script lang="ts">
import '@picocss/pico/css/pico.min.css' 
import Form from './form.svelte';

 type Task = {
    id:string,
    title:string,
    done:boolean,
 }

 let message = "ToDo App";
 let tasks = $state<Task[]>([]);

 function addTask ( newTask:string ){

tasks.push({
    id: crypto.randomUUID(),
    title:newTask,
    done:false,
})
 }

</script>

<main>
<h1>{message}</h1>
 <Form {addTask}/>
 {#each tasks as task}
    <div>
        <h1>{task.title}</h1>
    </div>
 {/each}
</main>

<style>
main{
    margin : 1rem auto;
    max-width: 800px;
}
</style>