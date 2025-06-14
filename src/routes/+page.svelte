<script>
import '@picocss/pico/css/pico.min.css' 
import Form from './form.svelte';
 let message = "ToDo App";
</script>

<main>
<h1>{message}</h1>
 <Form/>
</main>

<style>
main{
    margin : 1rem auto;
    max-width: 800px;
}
</style>