<script lang="ts">
  export let text = "";
  export let style: 'red' | 'green' | 'blue' = 'red';
</script>

<div>
  {#if text !== ""}
    <span
      class:red={style === 'red'}
      class:green={style === 'green'}
      class:blue={style === 'blue'}
    >
      {text}
    </span>
  {/if}
  <slot></slot>
</div>

<style>
  div {
    position: relative;
  }
  span {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    font-weight: bold;
    font-size: .9rem;
    position: absolute;
    top: -8px;
    right: -8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .red {
    background-color: #b41f1f;
  }
  .green {
    background-color: green;
  }
  .blue {
    background-color: blue;
  }
</style>