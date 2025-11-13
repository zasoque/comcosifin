<script lang="ts">
  import Word from "$lib/components/Word.svelte";
  import { onMount } from "svelte";

  export let data: any;

  let { dictionary, header } = data;

  let content = "";
  let candidates: string[] = [];

  function levenshteinDistance(s, t) {
    if (!s.length) return t.length;
    if (!t.length) return s.length;
    const arr = [];
    for (let i = 0; i <= t.length; i++) {
      arr[i] = [i];
      for (let j = 1; j <= s.length; j++) {
        arr[i][j] =
          i === 0
          ? j
          : Math.min(
            arr[i - 1][j] + 1,
            arr[i][j - 1] + 1,
            arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
          );
      }
    }
    return arr[t.length][s.length];
  }

  function normalise(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");
  }

  const titleIndex = header.indexOf("표제어");
  function onTextareaChange(event: Event) {
    // get textarea content
    const target = event.target as HTMLTextAreaElement;
    content = target.value;

    // get last word
    const lastWord = normalise(content.split(/\s+/).pop());

    // press number to select candidate
    const numberMatch = lastWord?.match(/(\d)$/);
    if (numberMatch) {
      let index = parseInt(numberMatch[1], 10) - 1;
      if (index === -1) {
        index = 9;
      }
      if (index >= 0 && index < candidates.length) {
        const selectedWord = candidates[index][titleIndex];
        content = content.slice(0, content.length - lastWord!.length) + selectedWord;
        target.value = content;
        return;
      }

      return;
    }

    // find candidates
    candidates = [];
    const distances = [];
    if (lastWord && lastWord.length > 0) {
      for (const row of dictionary) {
        const word = row[titleIndex];
        let distance = Infinity;
        for (const cell in row) {
          const cellValue = normalise(row[cell]);
          if (cellValue.indexOf(lastWord) === -1)
            continue;

          const d = (() => {
            const parts = cellValue.split(/(, |; )/g);

            let minD = Infinity;
            for (const part of parts) {
              const dist = levenshteinDistance(lastWord, part);
              minD = Math.min(minD, dist);
            }
            return minD;
          })();
          distance = Math.min(distance, d);
        }

        if (distance === Infinity)
          continue;

        distances.push({ word, distance, row });
      }
      distances.sort((a, b) => a.distance - b.distance);
      candidates = distances.slice(0, 10).map((item) => item.row);
    }
  }

  onMount(() => {
    const textarea = document.getElementById("input-textarea") as HTMLTextAreaElement;
    textarea.focus();
  });
</script>

<div class="container">
  <div class="title">Comcosifin</div>
  <textarea
    oninput={onTextareaChange}
    placeholder="Comcos lo naputome..."
    id="input-textarea"
  ></textarea>
  <div class="candidates">
    <ol>
      {#each candidates as candidate}
      <li><Word {candidate} {header} /></li>
      {/each}
    </ol>
  </div>
</div>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
}

textarea {
  width: 100%;
  height: 400px;
  margin-top: 20px;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

.title {
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}
</style>
