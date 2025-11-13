<script>
  import { onMount } from "svelte";

  export let candidate;
  export let header;
</script>

<span>
  {#each header as col, index}
    {#if candidate[index]}
      {col}: <strong>{candidate[index]}</strong>&nbsp;
    {/if}
  {/each}
</span>
