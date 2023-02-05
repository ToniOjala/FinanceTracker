<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Select from "$lib/components/Select.svelte";
  import { onMount } from "svelte";

  export let submit: (year: string) => void;

  let year = new Date().getFullYear().toString();
  const years: string[] = [];
  
  const handleSubmit = () => submit(year);

  onMount(() => {
    for (let i = 2020; i <= 2040; i++) years.push(i.toString());
  });
</script>

<form on:submit|preventDefault={handleSubmit}>
  <Select
    label="Select year from which forwards to remove category"
    bind:value={year}
    options={years}
    top={140}
  />
  <Button margin="40px 0 0 0" type="submit">REMOVE</Button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
  }
</style>