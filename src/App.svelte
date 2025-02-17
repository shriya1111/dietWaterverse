<script>
  import ParticleBackground from "./components/ParticleBackground.svelte";
</script>

<main>
  <ParticleBackground>
    <div class="content">
      <h1>Diet Water</h1>
      <nav>
        <a href="#swirl">Swirl</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </ParticleBackground>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
    background: hsla(260, 40%, 5%, 1);
    color: white;
    font-family:
      system-ui,
      -apple-system,
      sans-serif;
  }

  .content {
    position: relative;
    z-index: 2;
    padding: 2rem;
  }

  h1 {
    font-size: 4rem;
    text-align: center;
    margin: 2rem 0;
  }

  nav {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
  }

  a {
    color: #8b5cf6;
    text-decoration: none;
    font-size: 1.1rem;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #3b82f6;
  }
</style>
