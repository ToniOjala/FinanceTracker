<script lang="ts">
  import { roundToDecimals } from "../../utils/round";
  
  export let ratio: number; 
</script>

{#if !isFinite(ratio) || ratio == 0}
  <div style="background-color: #eeeeee33">0%</div>
{:else if ratio > 100}
  <div style="background: linear-gradient(to right, #FF5D7399 {ratio-100}%, #eeeeee33 {ratio-100}%)">
    {roundToDecimals(ratio, 0)}%
  </div>
{:else if ratio > 0}
  <div style="background: linear-gradient(to right, #66B088bb {ratio}%, #eeeeee33 {ratio}%)">
    {roundToDecimals(ratio, 0)}%
  </div>
{/if}

<style>
div {
  text-align: center;
}
</style>