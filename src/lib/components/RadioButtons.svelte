<script lang="ts">
  export let labels: Array<string>
  export let group: string;
  export let orientation: 'horizontal' | 'vertical' = 'horizontal';
</script>

<div style="flex-direction: {orientation == 'horizontal' ? 'row' : 'column'}">
  {#each labels as label}
    <label>{label}
      <input type="radio" bind:group={group} value={label.toLowerCase()}>
      <span></span>
    </label>
  {/each}
</div>

<style>
  div {
    display: flex;
    justify-content: space-between;
  }
  label {
    display: blocK;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    user-select: none;
    padding-top: 4px;
    margin-top: 3px;
  }
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 2px solid #888;
    background-color: #eee;
  }
  label:hover input ~ span {
    background-color: #ccc;
  }
  label:focus input ~ span:after {
    background-color: var(--primary-main);
  }
  input:checked ~ span {
    background-color: #eee !important;
    border-color: var(--primary-main);
  }
  span:after {
    content: "";
    position: absolute;
    display: none;
  }
  input:checked ~ span:after {
    display: block;
  }
  span:after {
    left: 50%;
    top: 50%;
    transform: translate(-8px, -8px);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: var(--primary-main);
  }
</style>

