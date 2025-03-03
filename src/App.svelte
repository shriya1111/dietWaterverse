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

  let activeSection = "hero";
  let headerVisible = false;
  
  function handleSettingsUpdate(event) {
    settings = event.detail;
  }

  function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      activeSection = id;
    }
  }

  function handleScroll() {
    const sections = document.querySelectorAll("section");
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    // Make header visible after first section
    headerVisible = scrollPosition > window.innerHeight / 2;
    
    // Find the current active section
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        activeSection = section.id;
      }
    });
  }
</script>

<svelte:window on:scroll={handleScroll} />

<ParticleBackground {settings} />
<ControlPanel {settings} on:update={handleSettingsUpdate} />

<!-- Fixed navigation header that appears after scrolling -->
<header class="fixed-header" class:visible={headerVisible}>
  <nav>
    <a 
      href="#hero" 
      on:click|preventDefault={() => scrollToSection("hero")}
      class:active={activeSection === "hero"}
    >
      Home
    </a>
    <a 
      href="#about" 
      on:click|preventDefault={() => scrollToSection("about")}
      class:active={activeSection === "about"}
    >
      About
    </a>
    <a 
      href="#projects" 
      on:click|preventDefault={() => scrollToSection("projects")}
      class:active={activeSection === "projects"}
    >
      Projects
    </a>
    <a 
      href="#contact" 
      on:click|preventDefault={() => scrollToSection("contact")}
      class:active={activeSection === "contact"}
    >
      Contact
    </a>
  </nav>
</header>

<main>
  <section class="hero" id="hero">
    <header>
      <h2 class="logo" style="font-family: 'Space Mono', monospace; letter-spacing: 1.25px;">Welcome, I'm Shriya</h2>
      <nav>
        <a href="#about" on:click|preventDefault={() => scrollToSection("about")}>About</a>
        <a href="#projects" on:click|preventDefault={() => scrollToSection("projects")}>Projects</a>
        <a href="#contact" on:click|preventDefault={() => scrollToSection("contact")}>Contact</a>
      </nav>
    </header>
    
    <div class="scroll-indicator">
      <p>Scroll Down</p>
      <div class="scroll-arrow"></div>
    </div>
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
            style="border-radius: 7%; opacity: 0.75;"
          />
        </div>
        <div class="tile" style="height: 364px; width: 378x;">
          <h3>I am a Full Stack Developer :)</h3>
          <p class="intro" style="font-size: 1.2rem;">
            Hi, I'm a Founding Engineer at a startup that automates processes for acccountants and I am 
            passionate about developing products and experimenting with new
            technologies to make day to day tasks easier. In my free time, I also like to 
            draw and create new characters, play badminton, and learning how to figureskate :)
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="tiles" id="projects">
    <h2>Projects</h2>
    <div class="grid">
      <div class="tile">
        <h3>Fulcrum</h3>
        <p>
          Built a backend pipeline for document data extraction, integrating Azure OCR and fine-tuning LLMs to achieve 97% accuracy.
          Developed a scalable system using Kubernetes and optimized concurrency for parallel processing, achieving 15x throughput.
        </p>
      </div>
      <div class="tile">
        <h3>Bird Dog</h3>
        <p>
          Developed a customizable React app that automates identifying distressed houses from dashcam footage.
          The application uses YOLO for object detection and GPT-4 for frame analysis to extract data.
          Applied data preprocessing techniques like image denoising and histogram equalization, along with data augmentation,
          to improve accuracy.
        </p>
      </div>
      <div class="tile">
        <h3>MatchA</h3>
        <p>
          Built a web application that helps users discover potential friends by visualizing nearby matches on an interactive map.
          Implemented real-time location matching, and chat functionality using NewsAPI, T5, and OpenAI APIs.
        </p>
      </div>
      <div class="tile">
        <h3>EvoCal</h3>
        <p>
          Implemented a Next.js and Flask-based full-stack web application, automating email parsing and event scheduling
          using Gmail, Google Calendar, OpenAI APIs, with secure token storage in Google Cloud SQL database.          
        </p>
      </div>
      <div class="tile">
        <h3>Activision Blizzard Ads</h3>
        <p>
          Developed a filter based search for in-app advertisements using Java, Spring Boot, MySQL, and Elasticsearch.
Built an ETL pipeline to sync external ad data, ensuring real-time updates via scheduled Cron jobs.
Managed migrations with Flyway and built Jooq models. Developed REST APIs to integrate search with frontend.
        </p>
      </div>
      <div class="tile">
        <h3>Fake News Detector</h3>
        <p>
          Chrome extension using React frontend and Go backend to detect fake news using NLP sentiment analysis techniques
          and web scraping. Utilized Python for data processing and model training, ensuring reliable predictions on the authenticity
          of news articles.
        </p>
      </div>
      <div class="tile">
        <h3>Workday</h3>
        <p>
          Developed a Workday dashboard for 50+ teams to analyze key performance indicators, track performance, and generate real-time insights for PI planning.
          Restructured raw data into actionable insights, providing teams with strengths, improvement areas, and solutions.
          Built the frontend with JavaScript and the backend with Java, Spring MVC, and MySQL, utilizing REST APIs for integration.
        </p>
      </div>
      <div class="tile">
        <h3>Jacket Connect</h3>
        <p>
          Web application that connects underclassmen to older student mentors to
help with any university related information like course registration, clubs, selecting concentration, etc. Utilized SQL,
Python, flask, and React to create the backend API and frontend interface.
        </p>
      </div>
      <div class="tile">
        <h3>Western Union</h3>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div class="tile">
        <h3>Mapable</h3>
        <p>
          Using Google Maps API, React.js, and mathematical algorithms,
           developed maps that show the best route that takes the least 
           effort to travel from a place to place instead of the fastest route
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
            <a class="contact-link" href="mailto:shriya1881@gmail.com">
              <span class="icon">✉</span>
              Email
            </a>
            <a
              href="https://github.com/shriya1111"
              target="_blank"
              class="contact-link"
            >
              <span class="icon">⌨</span>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/shriyaedukulla/"
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

  /* Hide scrollbars */
  :global(body)::-webkit-scrollbar {
    display: none;
  }

  :global(body) {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  main {
    position: relative;
    z-index: 1;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    -webkit-overflow-scrolling: touch;
  }

  main::-webkit-scrollbar {
    display: none;
  }

  main {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    scroll-snap-align: center;
    position: relative;
    overflow-y: auto;
  }

  .hero {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  /* Fixed navigation header */
  .fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    z-index: 1000;
    transform: translateY(-100%);
    transition: transform 0.3s ease;
  }

  .fixed-header.visible {
    transform: translateY(0);
  }

  .fixed-header nav {
    background: transparent;
    padding: 0.5rem 2rem;
    border-radius: 30px;
    margin: 0;
  }

  header {
    text-align: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    transition: all 0.3s ease;
    position: relative;
    padding: 0.5rem 1rem;
  }

  a:hover {
    color: white;
  }

  a.active {
    color: white;
  }

  a.active::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: white;
  }

  .about-content,
  .contact-content {
    max-width: 1000px;
    width: 100%;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 2fr 2fr;
    gap: 0rem;
    align-items: start;
  }

  .intro {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
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
    padding: 1rem;
  }

  .grid::-webkit-scrollbar {
    display: none;
  }

  .grid {
    -ms-overflow-style: none;
    scrollbar-width: none;
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

  .scroll-indicator {
    position: absolute;
    bottom: 40px;
    left: 45%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    opacity: 0.7;
    animation: bounce 2s infinite;
  }

  .scroll-arrow {
    width: 20px;
    height: 20px;
    border-right: 2px solid white;
    border-bottom: 2px solid white;
    transform: rotate(45deg);
    margin-top: 10px;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }

  .icon {
    font-size: 1.5rem;
  }

  /* Media Queries */
  @media (max-width: 768px) {
    h1 {
      font-size: 3rem;
    }

    .fixed-header nav {
      gap: 1rem;
      padding: 0.5rem 1rem;
    }

    .fixed-header a {
      font-size: 0.9rem;
      padding: 0.3rem 0.7rem;
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