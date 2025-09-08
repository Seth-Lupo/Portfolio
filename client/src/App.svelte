<script>
  import Home from './routes/Home.svelte';
  import Blog from './routes/Blog.svelte';
  
  let currentPath = window.location.pathname;
</script>

{#if currentPath === '/blog'}
  <Blog />
{:else}
  <Home />
{/if}