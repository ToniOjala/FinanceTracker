<script lang="ts">
  export let choices: string[];
  export let value: string;
  let selectedIndex = 0;

  function selectChoice(index: number, choice: string) {
    selectedIndex = index;
    value = choice.toLowerCase();
  }
</script>

<div class="container">
  {#each choices as choice, index}
    <div 
      class="choice {index === selectedIndex && 'selected'}"
      on:click={() => selectChoice(index, choice)}
    >
      {choice}
    </div>
  {/each}
</div>

<style>
  .container {
    display: flex;
    justify-content: space-between;
  }
  .choice {
    border: 1px solid var(--text-secondary);
    color: var(--text-secondary);
    padding: 8px 16px;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
  .choice:hover:not(.selected) {
    padding: 6px 14px;
    border: 3px solid var(--text-secondary);
    transition: all 0.2s ease-in-out;
  }
  .selected {
    padding: 6px 14px;
    border: 3px solid var(--primary-main);
    background-color: var(--primary-main-transparent);
    color: var(--primary-main);
    transition: all 0.2s ease-in-out;
  }
</style>