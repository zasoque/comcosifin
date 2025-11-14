<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap');

    @font-face {
      font-family: 'JoseonGulim';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@1.0/ChosunGu.woff') format('woff');
      font-weight: normal;
      font-display: swap;
    }

    body, textarea {
      font-family: "Dosis", 'Kosugi Maru', 'JoseonGulim', sans-serif;
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
