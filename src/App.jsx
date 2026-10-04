import { useEffect, useState } from "react";
import "./styles.css";
import { KFCPreview, KFCStats, LadyChoicePreview, LadyChoiceStats, SpritzerPreview, SpritzerStats, LifebuoyPreview, LifebuoyStats, BeetlejuicePreview, BeetlejuiceStats, BeetlejuiceTriimpactPreview, BeetlejuiceTriimpactStats, IkeaPreview, LifebuoyProductPreview, KnorrPreview, McDonaldsPreview, MAVAPreview } from "./campaigns.jsx";
import { PageBug, StarSticker } from "./playful.jsx";

const BASE = import.meta.env.BASE_URL;
const GREETINGS = ["Hello", "Hai", "你好", "こんにちは", "안녕하세요", "Bonjour"];

const FILTER_LINES = {
  all: "Where ideas turn into things people tap.",
  floating: "Can't miss them, and you might not want to.",
  inline: "Hiding between the paragraphs of your article.",
  web: "Bigger screens, bigger memes.",
  apps: "From Figma frames to an actual app.",
};



export default function App() {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [filter, setFilter] = useState("all");
  const [filterLine, setFilterLine] = useState("");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const id = window.setInterval(() => {
      setGreetingIndex((index) => (index + 1) % GREETINGS.length);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("site-nav");

    function onToggle() {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    }
    function onNavClick(event) {
      if (event.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    }
    function onKey(event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    }

    const chips = document.querySelectorAll(".chip");
    const projects = document.querySelectorAll(".project");

    function layoutProjects(filter) {
      let visibleIndex = 0;
      projects.forEach((project) => {
        const show = filter === "all" || project.dataset.category === filter;
        project.hidden = !show;
        if (show) {
          project.dataset.flip = visibleIndex % 2 === 1 ? "true" : "false";
          visibleIndex += 1;
        }
      });
    }
    function onChip(event) {
      const chip = event.currentTarget;
      chips.forEach((c) => c.setAttribute("aria-pressed", "false"));
      chip.setAttribute("aria-pressed", "true");
      const next = chip.dataset.filter;
      layoutProjects(next);
      setFilter(next);
      setFilterLine(FILTER_LINES[next] || "");
    }

    toggle.addEventListener("click", onToggle);
    nav.addEventListener("click", onNavClick);
    document.addEventListener("keydown", onKey);
    chips.forEach((chip) => chip.addEventListener("click", onChip));
    layoutProjects("all");

    return () => {
      toggle.removeEventListener("click", onToggle);
      nav.removeEventListener("click", onNavClick);
      document.removeEventListener("keydown", onKey);
      chips.forEach((chip) => chip.removeEventListener("click", onChip));
    };
  }, []);

  return (
    <>

  <a className="skip-link" href="#work">Skip to work</a>
  <header className="site-header">
    <div className="container site-header__inner">
      <a className="brand" href="#top"></a>
      <button className="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav id="site-nav" className="site-nav" aria-label="Primary">
  <a href="#about" data-emoji="👋">About</a>
  <a href="#work" data-emoji="🎮">My Playground</a>
  <a href="#experience" data-emoji="🔍">Experience(?)</a>
  <a href="#contact" data-emoji="💌">Say Hello!</a>
</nav>
    </div>
  </header>

  <PageBug />
  
  <main id="top">
    <section className="hero">
      <div className="container">
        <p className="pill-greeting">
          <span key={greetingIndex} className="pill-greeting__word">{GREETINGS[greetingIndex]}</span>
        </p>
        <h1 className="hero__name">Hey, I'm <span>Jesrene</span> </h1>
        <p className="hero__role">
          <svg className="spark" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#f29a2e" d="M24 2l2.2 12.4L38 8l-6.2 11.2L46 24l-14.2 4.8L38 40l-11.8-6.4L24 46l-2.2-12.4L10 40l6.2-11.2L2 24l14.2-4.8L10 8l11.8 6.4z"/>
          </svg>
          I work in digital ad operations
        </p>

        <div className="stage">
          <p className="quote">
            <span className="qmark" aria-hidden="true">“</span>
            Making screens a little more fun, one pixel at a time.
          </p>

          <div className="portrait">
            <div className="semicircle" aria-hidden="true"></div>
            <img src={`${BASE}media/self-image7.png`} alt="Jesrene Cheoy" />
             <span className="floatie floatie--a">Ad Ops</span>
            <span className="floatie floatie--b">UI/UX Designer</span>
            <span className="floatie floatie--c">Fuelled by good food</span>
           
          </div>
        </div>
      </div>
    </section>

    <div className="stat-bar">
      <div className="container stat-bar__row">
        <div className="stat"><strong>200+</strong><span>Local campaigns managed</span></div>
        <div className="stat"><strong>1.2M+</strong><span>USD in campaign revenue</span></div>
        <div className="stat"><strong>80%+</strong><span>KPI alignment on rich media</span></div>
        {/* <svg className="starburst" viewBox="0 0 48 48" aria-hidden="true"><path fill="#f29a2e" d="M24 2l2.2 12.4L38 8l-6.2 11.2L46 24l-14.2 4.8L38 40l-11.8-6.4L24 46l-2.2-12.4L10 40l6.2-11.2L2 24l14.2-4.8L10 8l11.8 6.4z"/></svg> */}
      </div>
    </div>

    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        <div className="marquee__group">
          <span>UI/UX Design</span><span className="dot">✦</span>
          <span>Ad Operations</span><span className="dot">✦</span>
          <span>Interactive Ads</span><span className="dot">✦</span>
          <span>Rich Media</span><span className="dot">✦</span>
          <span>Prototyping</span><span className="dot">✦</span>
          <span>Troubleshooting</span><span className="dot">✦</span>
          <span>Quality Assurance</span><span className="dot">✦</span>
          <span>Figma</span><span className="dot">✦</span>
        </div>
        <div className="marquee__group">
        <span>UI/UX Design</span><span className="dot">✦</span>
          <span>Ad Operations</span><span className="dot">✦</span>
          <span>Interactive Ads</span><span className="dot">✦</span>
          <span>Rich Media</span><span className="dot">✦</span>
          <span>Prototyping</span><span className="dot">✦</span>
          <span>Troubleshooting</span><span className="dot">✦</span>
          <span>Quality Assurance</span><span className="dot">✦</span>
          <span>Figma</span><span className="dot">✦</span>
        </div>
      </div>
    </div>

    <section id="about" className="section about">
      <div className="container about__grid">
        <div>
          <h2>About</h2>
          <p>Hi, I'm Jesrene! I make rich media ads that show up in the articles you read on your mobile devices, the ones you can tap, swipe, and (occasionally) even play.

<br /> <br /> I graduated from Sunway University with a computer science degree, and I still get way too excited about a smooth little animation. It started at uni, where I designed websites and built a stress detection app for my final year project. An app that can tell when you're stressed, which is ironic, since building it was a bit stressful too ...

<br /> <br />Since 2024, I've been in ad operations at FreakOut, launching campaigns for clients across Malaysia and Southeast Asia. <mark>I build and test ads that give people an engaging user experience</mark>, from expandable panels to playable mini-games. Every ad gets a test run on different phones and browsers before it meets the public, and I check that the tracking pixels count click-through rate, engagement rate, and video completion correctly. And when an ad breaks, whether the layout collapses or its JavaScript starts a fight with the publisher's page, I'm the one who figures out why and fixes it.

<br /> <br /> Curious what these look like? Scroll down to my playground!
</p>
        </div>
        <figure className="about__photo">
          <div className="about__blob" aria-hidden="true"></div>
          <img src={`${BASE}media/self-image5.png`} alt="Jesrene Cheoy" />
          </figure>
      </div>
    </section>

   
    <section id="work" className="section">
      <StarSticker />
      <div className="container">
        <div className="section__head">
          <h2>Welcome To My Playground</h2>
          <p>You made it to the fun part! Go ahead and interact with the ads below. Tap, swipe, play, and see what happens. Further down, you'll also find websites and apps I built at uni.
            <br /> <br /> ⚠️ Warning: addictive taps ahead.</p>
        </div>
        <div className="filters" role="group" aria-label="Filter projects">
          <button className="chip" type="button" data-filter="all" aria-pressed="true">All projects</button>
          <button className="chip" type="button" data-filter="floating" aria-pressed="false">Floating ads</button>
          <button className="chip" type="button" data-filter="inline" aria-pressed="false">Inline ads</button>
          <button className="chip" type="button" data-filter="web" aria-pressed="false">Web and desktop</button>
          <button className="chip" type="button" data-filter="apps" aria-pressed="false">Mobile apps</button>
        </div>
        {filterLine && <p key={filter} className="filter-line" data-filter={filter}>{filterLine}</p>}
        <div className="projects">

          <article className="project" data-category="floating">
            <div className="project__media">
              <div className="reels">
                <figure className="reel">
                  <SpritzerPreview />
                  <figcaption><span className="reel-caption__rest">Live demo</span><span className="reel-caption__hover" aria-hidden="true">Swipe through Malaysia's best local bites!</span></figcaption>
                </figure>
                
              </div>
            </div>
            <div className="project__body">
              <h3>Spritzer Air Cuti Cuti</h3>
              <p>An interactive ad that highlights Malaysian states and their iconic dishes, such as Penang's char kuey teow. Three swipeable cards lets users like or pass on each dish.</p>
              <ul className="tags"><li>Floating</li><li>Mobile</li><li>Rich media</li></ul>
              <SpritzerStats />
            </div>
          </article>

          <article className="project" data-category="inline">
            <div className="project__media">
              <div className="reels">
                <figure className="reel">
                  <LadyChoicePreview />
                  <figcaption><span className="reel-caption__rest">Live demo</span><span className="reel-caption__hover" aria-hidden="true">Beat my score!</span></figcaption>
                </figure>
                
              </div>
            </div>
            <div className="project__body">
            <h3>Lady's Choice SkyDash</h3>
            <p>Players tap to fly, dodge obstacles, and collect ingredients for points, then drop them off at school to finish the round. Pick up the Lady's Choice mayo for extra points!</p>
              <ul className="tags"><li>Inline</li><li>Illustrated unit</li><li>Mobile</li><li>Rich media</li></ul>
              <LadyChoiceStats />
            </div>
          </article>

          <article className="project" data-category="floating">
            <div className="project__media">
              <div className="reels">
                <figure className="reel">
                  <KFCPreview />
                  <figcaption><span className="reel-caption__rest">Live demo</span><span className="reel-caption__hover" aria-hidden="true">Pick your Quby!</span></figcaption>
                </figure>
                
              </div>
            </div>
            <div className="project__body">
            <h3>KFC x Quby OOO Message Generator</h3>
            <p>An interactive ad where users build a KFC x Quby out-of-office message. Pick your favourite Quby character, and send it to your coworkers.</p>
              <ul className="tags"><li>Floating</li><li>Illustrated unit</li><li>Mobile</li><li>Rich media</li></ul>
              <KFCStats />
            </div>
          </article>

     


          <article className="project" data-category="inline">
            <div className="project__media">
              <div className="reels">
                <figure className="reel">
                  <LifebuoyPreview />
                  <figcaption><span className="reel-caption__rest">Live demo</span><span className="reel-caption__hover" aria-hidden="true">Tap me 👆</span></figcaption>
                </figure>
                
              </div>
            </div>
            <div className="project__body">
            <h3>Lifebuoy Quiz</h3>
            <p>A two-question skin quiz that ends with the right Lifebuoy for you.</p>
              <ul className="tags"><li>Floating</li><li>Illustrated unit</li><li>Mobile</li><li>Rich media</li></ul>
              <LifebuoyStats />
            </div>
          </article>

          <article className="project" data-category="inline">
            <div className="project__media">
              <div className="reels">
                <figure className="reel">
                  <BeetlejuicePreview />
                  <figcaption><span className="reel-caption__rest">Live demo</span><span className="reel-caption__hover" aria-hidden="true">Germs hate this!</span></figcaption>
                </figure>
                
              </div>
            </div>
            <div className="project__body">
            <h3>Beetlejuice Header and Footer</h3>
            <p>Beetlejuice Header and Footer is a header and footer for the Beetlejuice brand. It includes a header and a footer.</p>
              <ul className="tags"><li>Floating</li><li>Illustrated unit</li><li>Mobile</li><li>Rich media</li></ul>
              <BeetlejuiceStats />
            </div>
          </article>

          <article className="project" data-category="inline">
            <div className="project__media">
              <div className="reels">
                <figure className="reel">
                  <BeetlejuiceTriimpactPreview />
                  <figcaption><span className="reel-caption__rest">Live demo</span><span className="reel-caption__hover" aria-hidden="true">Tap me 👆</span></figcaption>
                </figure>
                
              </div>
            </div>
            <div className="project__body">
            <h3>Beetlejuice Tri-Impact</h3>
            <p> Beetlejuice Header and Footer is a header and footer for the Beetlejuice brand. It includes a header and a footer.</p>
              <ul className="tags"><li>Floating</li><li>Illustrated unit</li><li>Mobile</li><li>Rich media</li></ul>
              <BeetlejuiceTriimpactStats />
            </div>
          </article>



          <article className="project" data-category="inline">
            <div className="project__media">
              <div className="reels">
                <figure className="reel">
                  <IkeaPreview />
                  <figcaption><span className="reel-caption__rest">Live demo</span><span className="reel-caption__hover" aria-hidden="true">No assembly needed!</span></figcaption>
                </figure>
                
              </div>
            </div>
            <div className="project__body">
              <h3>IKEA 3D Model Viewer</h3>
              <p>A 3D model viewer for IKEA. It allows users to view the 3D model of the product and rotate it.</p>
              <ul className="tags"><li>Carousel</li><li>Mobile</li><li>Rich media</li></ul>
            </div>
          </article>

          <article className="project" data-category="inline">
            <div className="project__media">
              <div className="reels">
                <figure className="reel">
                  <LifebuoyProductPreview />
                  <figcaption><span className="reel-caption__rest">Live demo</span><span className="reel-caption__hover" aria-hidden="true">Germs hate this!</span></figcaption>
                </figure>
                
              </div>
            </div>
            <div className="project__body">
              <h3>Lifebuoy product carousel</h3>
              <p>A swipeable product unit for Lifebuoy Skin Solutions. Each variant slides forward with its claim, including Sea Mineral & Salt, and a buy-now action.</p>
              <ul className="tags"><li>Carousel</li><li>Mobile</li><li>Rich media</li></ul>
            </div>
          </article>

          <article className="project" data-category="inline">
            <div className="project__media">
              <div className="reels">
                <figure className="reel">
                  <KnorrPreview />
                  <figcaption><span className="reel-caption__rest">Live demo</span><span className="reel-caption__hover" aria-hidden="true">Germs hate this!</span></figcaption>
                </figure>
                
              </div>
            </div>
            <div className="project__body">
              <h3>Knorr Professional catch</h3>
              <p>Ingredients fall toward a wok. The player catches them in order, with a running count of how many of the eight are in.</p>
              <ul className="tags"><li>Carousel</li><li>Mobile</li><li>Rich media</li></ul>
            </div>
          </article>


          <article className="project" data-category="inline">
            <div className="project__media">
              <div className="reels">
                <figure className="reel">
                  <McDonaldsPreview />
                  <figcaption><span className="reel-caption__rest">Live demo</span><span className="reel-caption__hover" aria-hidden="true">Tap me 👆</span></figcaption>
                </figure>
                
              </div>
            </div>
            <div className="project__body">
              <h3>McDonalds Fall Catch Feast</h3>
              <p>A stacking game: drop chicken into the McShare box, build a pile, and score before the round ends. The unit closes on a McDelivery offer.</p>
              <ul className="tags"><li>Carousel</li><li>Mobile</li><li>Rich media</li></ul>
            </div>
          </article>

          <article className="project" data-category="inline">
            <div className="project__media">
              <div className="reels">
                <figure className="reel">
                  <MAVAPreview />
                  <figcaption><span className="reel-caption__rest">Live demo</span><span className="reel-caption__hover" aria-hidden="true">Tap me 👆</span></figcaption>
                </figure>
                
              </div>
            </div>
            <div className="project__body">
            <h3>MAVA Titan fan</h3>
            <p>An interactive ad for the MAVA Titan ceiling fan. Users can switch between three speeds and see the fan respond in the room.</p>
              <ul className="tags"><li>Carousel</li><li>Mobile</li><li>Rich media</li></ul>
            </div>
          </article>

          <article className="project" data-category="web">
            <div className="project__media">
              <div className="laptop"><div className="laptop__screen"><img src={`${BASE}media/project1.png`} alt="Home screen of What Do You Meme?" /></div><div className="laptop__base"></div></div>
            </div>
            <div className="project__body">
              <h3>What Do You Meme?</h3>
              <p>A party game where players create funny memes by matching caption cards with photo cards. The goal is to build the funniest pairing, and the meme card with the most votes wins the round.</p>
              <ul className="tags"><li>Web and desktop</li><li>Scala</li><li>JavaFX</li><li>Canva</li></ul>
              <div className="links"><a className="link link--solid" href="https://www.youtube.com/watch?v=FTDNqQdjF0I" target="_blank" rel="noopener noreferrer">Watch demo video</a></div>
            </div>
          </article>

      

          <article className="project" data-category="web">
            <div className="project__media">
              <div className="laptop"><div className="laptop__screen"><img src={`${BASE}media/asset-16.webp`} alt="Enrolled courses dashboard of an online learning platform" /></div><div className="laptop__base"></div></div>
            </div>
            <div className="project__body">
              <h3>Multipurpose education platform</h3>
              <p>An engaging online learning platform that caters to users' needs and keeps the experience distraction-free by staying ad-free.</p>
              <ul className="tags"><li>Web and desktop</li><li>Figma</li></ul>
              <div className="links"><a className="link link--solid" href="https://www.figma.com/proto/lCKr60FHaGnHNvVxkfsNXs/Prototype-Beta-Version?type=design&node-id=132-3470&t=zw0373uUgt7svVN5-1&scaling=scale-down&page-id=0%253A1&starting-point-node-id=132%253A3470&show-proto-sidebar=1&mode=design" target="_blank" rel="noopener noreferrer">View website prototype</a></div>
            </div>
          </article>

        

          <article className="project" data-category="web">
            <div className="project__media">
              <div className="laptop"><div className="laptop__screen"><img src={`${BASE}media/asset-18.webp`} alt="Floralpedia perfume store homepage" /></div><div className="laptop__base"></div></div>
            </div>
            <div className="project__body">
              <h3>Floralpedia</h3>
              <p>A website for a perfume store, with pages for products, FAQ and contact, built in Wix.</p>
              <ul className="tags"><li>Web and desktop</li><li>Wix</li></ul>
              <div className="links"><a className="link link--solid" href="https://jescheoy.wixsite.com/floralpedia" target="_blank" rel="noopener noreferrer">Visit website</a></div>
            </div>
          </article>

          <article className="project" data-category="apps">
            <div className="project__media">
              <div className="phones"><figure className="phone-wrap"><div className="phone"><img src={`${BASE}media/asset-22.webp`} alt="Stress detection app home screen" /></div></figure></div>
            </div>
            <div className="project__body">
              <h3>Stress detection app</h3>
              <p>A mobile app that detects whether a user is stressed by analysing their heart rate. Designed in Figma and coded in Android Studio.</p>
              <ul className="tags"><li>Mobile app</li><li>Figma</li><li>Android Studio</li></ul>
              <div className="links">
                <a className="link link--solid" href="https://www.figma.com/proto/693ID80HNeW9KQIJfSEozK/Fleez-(Portfolio)?type=design&node-id=1-304&t=Lor4Kmt0wnlPgc4b-1&scaling=scale-down&page-id=0%253A1&starting-point-node-id=1%253A304&mode=design" target="_blank" rel="noopener noreferrer">View app interface</a>
                <a className="link link--outline" href="https://youtu.be/zAdErNTrpoU" target="_blank" rel="noopener noreferrer">Watch screen recording</a>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>


    <section id="experience" className="section band band--dark">
      <div className="container">
        <div className="section__head">
          <h2>Experience</h2>
        </div>
       
        <ol className="roles">
          <li className="role">
            <div className="role__when">Apr 2024 to present</div>
            <div className="role__what">
              <h3>Regional Ad Operations Support</h3>
              <p className="role__org">FreakOut Sdn. Bhd.</p>
              <p>Part of a team of specialists responsible for developing and deploying all campaigns, national and international, company-wide.</p>
              <ul>
                <li>Develop and deploy digital ad formats and campaigns across multiple platforms for national and international clients.</li>
                <li>Monitor campaign delivery, identify and troubleshoot issues, and coordinate resolutions to maintain quality and performance.</li>
                <li>Validate ad tags, tracking pixels and campaign implementations to ensure accurate, reliable performance measurement.</li>
                <li>Review campaign data and reporting to find discrepancies, maintain data accuracy and keep 80%+ KPI alignment across rich media campaigns.</li>
                <li>Manage and supervise 200+ local campaigns, working with cross-functional teams to resolve issues and deliver campaigns generating approximately USD 1.2M in revenue.</li>
              </ul>
            </div>
          </li>
          <li className="role">
            <div className="role__when">Jan 2024 to Apr 2024</div>
            <div className="role__what">
              <h3>Digital Campaign Ad Operations Intern</h3>
              <p className="role__org">FreakOut Sdn. Bhd.</p>
              <ul>
                <li>Supported campaign setup, implementation, monitoring and quality checks across digital advertising platforms.</li>
                <li>Checked campaign components and creative formats against requirements to make sure they were implemented and delivered correctly.</li>
                <li>Helped identify campaign issues and coordinated with the right teams to resolve discrepancies.</li>
                <li>Monitored campaign performance and reporting data to support accurate tracking and optimisation.</li>
              </ul>
            </div>
          </li>
        </ol>
        
      </div>
    </section>

    <section id="skills" className="section band band--mist">
      <div className="container">
        <div className="section__head">
          <h2>Skills</h2>
          <p>Tools I use across the projects and roles above.</p>
        </div>
        <div className="skills">
          <div><h3>Build</h3><ul className="tags tags--lg"><li>JavaScript</li><li>HTML</li><li>CSS</li><li>MySQL</li><li>Scala</li><li>JavaFX</li><li>Android Studio</li><li>Wix</li></ul></div>
          <div><h3>Design</h3><ul className="tags tags--lg"><li>Figma</li><li>Canva</li></ul></div>
          <div><h3>Test and measure</h3><ul className="tags tags--lg"><li>Postman</li><li>DV360</li><li>Microsoft Office</li></ul></div>
        </div>
        <div className="strengths">
          <div>
            <h3>Strengths</h3>
            <ul className="plain">
              <li>Problem solving and issue identification</li>
              <li>Analytical thinking</li>
              <li>Attention to detail</li>
              <li>Data accuracy and validation</li>
              <li>Cross-functional communication</li>
            </ul>
          </div>
          <div>
            <h3>Languages</h3>
            <ul className="plain"><li>English</li><li>Chinese</li><li>Malay</li></ul>
          </div>
        </div>
      </div>
    </section>

    {/* <section id="education" className="section">
      <div className="container education">
        <div>
          <h2>Education</h2>
          <ul className="entries">
            <li><h3>BSc (Hons) in Computer Science</h3><p>Sunway University and Lancaster University</p><p className="entries__when">2021 to 2024</p></li>
            <li><h3>Foundation in Arts</h3><p>Sunway College</p><p className="entries__when">2020 to 2021</p></li>
          </ul>
        </div>
        <div>
          <h2>Achievements</h2>
          <ul className="entries">
            <li><h3>Jeffrey Cheah Advance and Continuing Excellence (ACE) Scholarship</h3><p className="entries__when">2021 to 2023</p></li>
            <li><h3>Special 2020 Merit Award</h3><p className="entries__when">2020</p></li>
          </ul>
        </div>
      </div>
    </section> */}

    <section id="contact" className="section band band--orange">
      <div className="container contact">
        <h2>Open to software QA roles.</h2>
        <p>If you are hiring, or want to talk about a project, email is the fastest way to reach me.</p>
        <div className="contact__actions">
          <a className="btn btn--ink" href="mailto:jescheoy@gmail.com">jescheoy@gmail.com</a>
          <a className="btn btn--outline" href="https://www.linkedin.com/in/jesrenecheoy/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="btn btn--outline" href="https://github.com/jesrene" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="btn btn--outline" href={`${BASE}media/resume.pdf`} download="JesreneCheoy-Resume.pdf">Download resume</a>
        </div>
      </div>
    </section>
  </main>

  <footer className="site-footer">
    <div className="container"><p>&copy; <span id="year">2026</span> Jesrene Cheoy</p></div>
  </footer>

  

    </>
  );
}
