<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Diphylleia&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap');

    body, textarea {
      font-family: "EB Garamond", "Diphylleia", serif;
    }

    body {
      background-color: #ebf2f5;
      color: #24292e;
    }

    textarea {
      background-color: #f6f8fa;
      color: #24292e;
    }
  </style>
  <title>Comcosifin</title>
</svelte:head>

{@render children()}
