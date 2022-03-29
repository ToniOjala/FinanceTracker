<script lang="ts">
  export let columnTitles = ["First", "Second", "Third"];
  export let padding;
  export let backgroundColor;
</script>

<table
  style="
    padding: {padding}
    backgroundColor: {backgroundColor}
  "
>
  <tr>
    {#each columnTitles as title}
      <th>{title}</th>
    {/each}
  </tr>
  <slot></slot>
</table>

<style>
tr {
  text-align: left;
  color: var(--text-secondary);
}
</style>