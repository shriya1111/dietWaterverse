<script>
  import ParticleBackground from "./components/ParticleBackground.svelte";
  import ControlPanel from "./components/ControlPanel.svelte";
  import aboutMeImage from "./assets/about_me.jpg";

  let settings = {
    particleSpeed: 2,
    repulsionForce: 6,
    repulsionRadius: 109,
    returnSpeed: 0.02,
    baseHue: 220,
    rangeHue: 193,
    particleCount: 700,
    glowIntensity: 200,
  };

  function handleSettingsUpdate(event) {
    settings = event.detail;
  }
</script>

<ParticleBackground {settings} />
<ControlPanel {settings} on:update={handleSettingsUpdate} />

<main>
  <section class="hero">
    <header>
      <h1 class="logo" style="font-family: 'Press Start 2P';">SHRIYA</h1>
      <nav>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  </section>

  <section class="about" id="about">
    <div class="about-content">
      <h2>About Me</h2>
      <div class="about-grid">
        <div class="about-left">
          <img
            src={aboutMeImage}
            alt="Shriya Edukulla"
            class="about-image"
            width="318"
            height="424"
            style="border-radius: 7%;"
          />
        </div>
        <div class="about-right">
          <p class="intro">
            Hi, I'm a Software Engineer based in San Francisco, California,
            passionate about creating apps to make tasks easier.
          </p>
          <p>
            I specialize in full-stack development with a focus on modern web
            technologies and interactive user interfaces. Computer Vision etc...
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="tiles" id="projects">
    <h2>Projects</h2>
    <div class="grid">
      <div class="tile">
        <h3>Project 1</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div class="tile">
        <h3>Project 2</h3>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <div class="tile">
        <h3>Project 3</h3>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </p>
      </div>
      <div class="tile">
        <h3>Project 4</h3>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  </section>

  <section class="contact" id="contact">
    <div class="contact-content">
      <h2>Get In Touch</h2>
      <div class="contact-grid">
        <div class="contact-info">
          <p>I'm always open to new opportunities and interesting projects.</p>
          <div class="contact-links">
            <a href="mailto:your.email@example.com" class="contact-link">
              <span class="icon">✉</span>
              Email
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              class="contact-link"
            >
              <span class="icon">⌨</span>
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              class="contact-link"
            >
              <span class="icon">💼</span>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: hsla(260, 40%, 5%, 1);
    color: white;
    font-family:
      system-ui,
      -apple-system,
      sans-serif;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  main {
    position: relative;
    z-index: 1;
  }

  section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
  }

  .hero {
    padding: 0;
  }

  header {
    text-align: center;
  }

  h1 {
    font-size: 5rem;
    margin: 0;
    background: linear-gradient(135deg, #ffffff 0%, #dedede 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 800;
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
  }

  h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
    color: #ffffffc8;
    text-align: center;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #ffffffc8;
  }

  nav {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
  }

  a {
    color: #ffffffc8;
    text-decoration: none;
    font-size: 1.1rem;
    transition: color 0.3s ease;
  }

  a:hover {
    color: white;
  }

  .about-content,
  .contact-content {
    max-width: 1000px;
    width: 100%;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 0rem;
    align-items: start;
  }

  .intro {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .tag {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-size: 0.9rem;
  }

  .tiles {
    width: 100%;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
  }

  .tile {
    position: relative;
    padding: 2rem;
    border-radius: 1rem;
    cursor: pointer;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    overflow: hidden;
  }

  .tile::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: -1;
  }

  .tile:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
  }

  p {
    position: relative;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin: 0;
  }

  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.2rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
    transition: all 0.3s ease;
  }

  .contact-link:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(10px);
  }

  .icon {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 3rem;
    }

    .about-grid {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
