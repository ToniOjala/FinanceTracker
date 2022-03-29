<script lang="ts">
  import AmountField from "$lib/components/AmountField.svelte";
  import Button from "$lib/components/Button.svelte";
  import TextField from "$lib/components/TextField.svelte";

  export let handleModifyBalance: (amount: number, label: string) => void;
  let amount = 0;
  let label = "";
  let errors = { amount: '' };

  function handleSubmit() {
    if (isNaN(Number(amount))) errors.amount = 'Amount should be a numeric value';
    else errors.amount = '';

    if (!errors.amount) handleModifyBalance(amount, label);
  }
  
</script>

<form on:submit|preventDefault={handleSubmit}>
  <AmountField
    label="Amount"
    bind:value={amount}
    helperText={errors?.amount}
    autoFocus
  />
  <TextField
    label="Label"
    bind:value={label}
  />
  <Button margin="40px 0 0 0" type="submit">MODIFY</Button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    width: 280px;
    overflow: visible;
  }
</style>