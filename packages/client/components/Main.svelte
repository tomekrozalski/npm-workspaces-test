<script lang="ts">
  const { children } = $props();
</script>

<main>
  {@render children()}
</main>

<style>
  main {
    padding: 40px;
  }
</style>
