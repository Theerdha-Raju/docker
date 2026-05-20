(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`docker-implementation`,title:`Topic-Based Tech Tool Implementation: Docker`,date:`May 4, 2018`,author:`Admin`,readTime:`6 min read`,excerpt:`Learn how to use Docker to build, package, and deploy a Node.js web application. We'll explore the setup process, Dockerfiles, and how containerization solves production environment consistency.`,category:`WordPress`,tags:[`Docker`,`Containerization`,`NodeJS`,`DevOps`],content:`
<h2>1. Introduction to the Technology</h2>
<p><strong>Docker</strong> is an open-source platform that enables developers to build, deploy, run, update, and manage containers—highly executable components that combine application source code with the operating system libraries and dependencies required to run that code in any environment. In modern software engineering, Docker solves the classic <em>"it works on my machine"</em> problem by ensuring consistency across development, testing, and production environments.</p>

<h2>2. Setup and Implementation Process</h2>
<p>To implement Docker, you first need to install Docker Desktop on your operating system (Windows, macOS, or Linux). Once installed, the general workflow involves:</p>
<ul>
  <li>Creating an application (e.g., a simple Node.js web app).</li>
  <li>Writing a <code>Dockerfile</code> that contains the instructions to build the image.</li>
  <li>Building the Docker image using the <code>docker build</code> command.</li>
  <li>Running the container using the <code>docker run</code> command.</li>
</ul>

<h2>3. Sample Code Snippets</h2>
<p>Here is a basic structure for containerizing an Express-based Node.js application:</p>

<div class="code-block-header"><span>app.js</span><button class="copy-code-btn" data-code-id="js-code"><i class="fa-regular fa-copy"></i> Copy</button></div>
<pre><code id="js-code" class="language-javascript"><span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
<span class="hljs-keyword">const</span> app = express();
<span class="hljs-keyword">const</span> PORT = <span class="hljs-number">3000</span>;

app.get(<span class="hljs-string">'/'</span>, <span class="hljs-keyword">(req, res) =></span> {
  res.send(<span class="hljs-string">'Hello, Docker World! This is containerized.'</span>);
});

app.listen(PORT, <span class="hljs-keyword">() =></span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'App running on port ' + PORT</span>);
});</code></pre>

<div class="code-block-header"><span>Dockerfile</span><button class="copy-code-btn" data-code-id="docker-code"><i class="fa-regular fa-copy"></i> Copy</button></div>
<pre><code id="docker-code" class="language-dockerfile"><span class="hljs-comment"># Use official Node.js runtime as a parent image</span>
<span class="hljs-keyword">FROM</span> node:18-alpine

<span class="hljs-comment"># Set the working directory in the container</span>
<span class="hljs-keyword">WORKDIR</span> /usr/src/app

<span class="hljs-comment"># Copy package.json and install dependencies</span>
<span class="hljs-keyword">COPY</span> package*.json ./
<span class="hljs-keyword">RUN</span> npm install

<span class="hljs-comment"># Copy the rest of the application code</span>
<span class="hljs-keyword">COPY</span> . .

<span class="hljs-comment"># Expose port 3000</span>
<span class="hljs-keyword">EXPOSE</span> 3000

<span class="hljs-comment"># Command to run the application</span>
<span class="hljs-keyword">CMD</span> [ "node", "app.js" ]</code></pre>

<h2>4. Applications and Benefits</h2>
<ul>
  <li><strong>Portability:</strong> Write locally, run anywhere. Containers package the app with its environment.</li>
  <li><strong>Scalability:</strong> Docker makes it easy to scale applications horizontally by spinning up multiple instances.</li>
  <li><strong>Microservices:</strong> It's the standard for building microservices architectures, allowing teams to deploy isolated services independently.</li>
  <li><strong>Resource Efficiency:</strong> Containers share the host OS kernel, making them much more lightweight than traditional virtual machines.</li>
</ul>

<h2>5. Challenges Faced</h2>
<ul>
  <li><strong>Learning Curve:</strong> Understanding networking, volume mounts, and multi-stage image optimization takes time.</li>
  <li><strong>Security:</strong> Managing credentials/secrets inside containers and ensuring host security requires strict guardrails.</li>
  <li><strong>Storage Management:</strong> Unused images and stopped containers can quickly consume massive disk space if not pruned regularly (e.g., using <code>docker system prune</code>).</li>
</ul>

<h2>6. References & Resources</h2>
<ul>
  <li><a href="https://docs.docker.com/" target="_blank">Official Docker Documentation</a> - The absolute source of truth.</li>
  <li><a href="https://hub.docker.com/" target="_blank">Docker Hub</a> - Public registry for pre-built container images.</li>
</ul>

<h2>7. Technology Awareness & Future Scope</h2>
<p>Docker has revolutionized cloud computing, paving the way for orchestration tools like Kubernetes. The current trend focuses heavily on <strong>DevSecOps</strong>—integrating security scanning directly into the Docker build pipeline. Looking forward, the ecosystem is shifting towards lightweight container runtimes (like containerd) and WebAssembly (Wasm) integration, promising even faster startup times and cross-platform execution without traditional OS overhead.</p>
    `},{id:`port-scanner-analysis`,title:`Code Break Analysis: Python Network Port Scanner`,date:`April 28, 2018`,author:`Admin`,readTime:`8 min read`,excerpt:`A deep dive into writing a basic TCP port scanner using Python's socket module. We'll analyze the connection logic, discuss error handling optimizations, and reflect on network reconnaissance.`,category:`WordPress`,tags:[`Python`,`Networking`,`Port Scanning`,`Socket`],content:`
<h2>1. Objective of the Code</h2>
<p>The objective of this Python script is to perform a basic TCP port scan on a target IP address or hostname. It is designed to identify open ports on a server, which is a fundamental technique used in network administration and ethical hacking (reconnaissance phase) to understand the attack surface of a system.</p>

<h2>2. Logic Flow and Working</h2>
<p>The program follows a clear procedural structure:</p>
<ul>
  <li><strong>Input:</strong> The script prompts the user to enter a target IP address or URL.</li>
  <li><strong>Resolution:</strong> It resolves the URL to an IPv4 address.</li>
  <li><strong>Iteration:</strong> It loops through a specified range of ports (e.g., ports 1 to 1024).</li>
  <li><strong>Connection Attempt:</strong> For each port, it attempts to establish a TCP connection.</li>
  <li><strong>Evaluation:</strong> If the connection succeeds, the port is marked as "Open". If it fails, it moves to the next port.</li>
  <li><strong>Output:</strong> It prints the open ports to the console.</li>
</ul>

<h2>3. Code & Module Explanation</h2>
<p>We use Python's built-in <code>socket</code> library to create raw connections:</p>

<div class="code-block-header"><span>scanner.py</span><button class="copy-code-btn" data-code-id="py-code"><i class="fa-regular fa-copy"></i> Copy</button></div>
<pre><code id="py-code" class="language-python"><span class="hljs-keyword">import</span> socket
<span class="hljs-keyword">import</span> sys
<span class="hljs-keyword">from</span> datetime <span class="hljs-keyword">import</span> datetime

<span class="hljs-comment"># Define target</span>
target = <span class="hljs-built_in">input</span>(<span class="hljs-string">"Enter target IP/URL: "</span>)
target_ip = socket.gethostbyname(target)

<span class="hljs-built_in">print</span>(<span class="hljs-string">"-"</span> * <span class="hljs-number">50</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f"Scanning Target: {target_ip}"</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f"Scan started at: {str(datetime.now())}"</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">"-"</span> * <span class="hljs-number">50</span>)

<span class="hljs-keyword">try</span>:
    <span class="hljs-comment"># Scanning ports 1 to 1024</span>
    <span class="hljs-keyword">for</span> port <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">1</span>, <span class="hljs-number">1025</span>):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        socket.setdefaulttimeout(<span class="hljs-number">0.5</span>) <span class="hljs-comment"># Timeout quickly</span>
        result = s.connect_ex((target_ip, port))
        
        <span class="hljs-keyword">if</span> result == <span class="hljs-number">0</span>:
            <span class="hljs-built_in">print</span>(<span class="hljs-string">f"Port {port}: OPEN"</span>)
        s.close()
        
<span class="hljs-keyword">except</span> <span class="hljs-title">KeyboardInterrupt</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">"\\nExiting Program."</span>)
    sys.exit()
<span class="hljs-keyword">except</span> socket.gaierror:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">"\\nHostname could not be resolved."</span>)
    sys.exit()
<span class="hljs-keyword">except</span> socket.error:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">"\\nServer not responding."</span>)
    sys.exit()</code></pre>

<ul>
  <li><code>socket.gethostbyname()</code>: Resolves a domain (e.g., <code>google.com</code>) to its IPv4 address.</li>
  <li><code>socket.socket()</code>: Instantiates the socket. <code>AF_INET</code> specifies IPv4, and <code>SOCK_STREAM</code> specifies TCP.</li>
  <li><code>s.connect_ex()</code>: Attempts connection. Crucially, it returns an error code (0 on success, error number on failure) rather than throwing an exception.</li>
</ul>

<h2>4. Debugging & Optimization Analysis</h2>
<p><strong>Initial Bug:</strong> The original procedural draft used <code>s.connect()</code>. Closed ports threw an exception which crashed the script entirely before it could proceed.</p>
<p><strong>Fix:</strong> Switched to <code>connect_ex()</code>. Since it returns an integer error code, we can easily check if it equals <code>0</code> and loop continuously without expensive try-except logic blocks.</p>
<p><strong>Optimizations:</strong> Scanning sequentially takes too long on 65k ports. We can speed this up by using <strong>Multithreading</strong> (via Python's <code>concurrent.futures</code>) or <strong>Asynchronous connections</strong> (using <code>asyncio</code>) to scan hundreds of ports concurrently.</p>

<h2>5. Personal Learning Reflection</h2>
<p>Writing this basic scanner demystified network recon. It visually reinforced how the standard TCP 3-Way Handshake operates—connecting via SYN, SYN-ACK, and ACK. It also highlighted the necessity of configuring sensible timeouts; otherwise, a single non-responsive port can freeze the thread for minutes. My next step will be to re-write this script using Python threads to achieve lightning-fast scan operations.</p>
    `}],t={currentView:`home`,searchQuery:``,selectedCategory:`All`};function n(){let e=document.querySelector(`#app`);e&&(e.innerHTML=`
    <header class="header-banner">
      <div class="container header-banner-content">
        <div class="header-text">
          <h1>Theerdha</h1>
          <p>Docker & Cyber Security</p>
        </div>
        <div class="header-graphic">
          <img src="/src/assets/header_topic_graphic.png" alt="Docker & Cyber Security Graphic" class="header-topic-img">
        </div>
      </div>
    </header>
  
    <div class="navbar-wrapper">
      <div class="container navbar">
        <ul class="nav-links">
          <li>
            <a href="#" class="${t.currentView===`home`?`active`:``}" data-nav="home">
              Home
            </a>
          </li>
          <li><a href="#" class="${t.currentView===`about`?`active`:``}" data-nav="about">About</a></li>
          <li><a href="#" class="${t.currentView===`contact`?`active`:``}" data-nav="contact">Contact</a></li>
        </ul>
        <div class="navbar-right" id="navbar-search-trigger">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
    </div>
  
    <main class="container main-layout">
      <div class="blog-feed" id="main-content-pane"></div>
      <div class="sidebar" id="sidebar-pane"></div>
    </main>
  
    <footer>
      <div class="container footer-top">
        <!-- Footer Column 1: Info -->
        <div class="footer-column">
          <div class="footer-icon-circle">
            <i class="fa-solid fa-pencil"></i>
          </div>
          <div class="footer-column-content">
            <h4>Theerdha</h4>
            <p>Docker</p>
          </div>
        </div>
        <!-- Footer Column 2: Email -->
        <div class="footer-column">
          <div class="footer-icon-circle">
            <i class="fa-regular fa-envelope"></i>
          </div>
          <div class="footer-column-content">
            <h4>Email</h4>
            <p>info@example.com</p>
          </div>
        </div>
        <!-- Footer Column 3: Location -->
        <div class="footer-column">
          <div class="footer-icon-circle">
            <i class="fa-solid fa-location-dot"></i>
          </div>
          <div class="footer-column-content">
            <h4>Location</h4>
            <p>123 Blog Street, Internet City</p>
          </div>
        </div>
      </div>
      
      <!-- Bottom Footer strip -->
      <div class="footer-bottom">
        <div class="container footer-bottom-container">
          <p>&copy; 2018 Theerdha. All rights reserved.</p>
          <div class="footer-social-links">
            <a href="https://facebook.com" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="https://twitter.com" target="_blank"><i class="fa-brands fa-twitter"></i></a>
            <a href="https://linkedin.com" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>
            <a href="https://instagram.com" target="_blank"><i class="fa-brands fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  `,r(),t.currentView===`home`?i():t.currentView===`about`?o():t.currentView===`contact`?s():a(t.currentView),c())}function r(){document.querySelectorAll(`[data-nav]`).forEach(e=>{e.addEventListener(`click`,e=>{e.preventDefault();let r=e.currentTarget.getAttribute(`data-nav`);t.currentView=r,r===`home`&&(t.selectedCategory=`All`,t.searchQuery=``),n(),window.scrollTo({top:0,behavior:`smooth`})})});let e=document.querySelector(`#navbar-search-trigger`);e&&e.addEventListener(`click`,()=>{let e=document.querySelector(`#search-input`);e&&(e.focus(),e.scrollIntoView({behavior:`smooth`,block:`center`}))})}function i(){let r=document.querySelector(`#main-content-pane`);if(!r)return;let i=e.filter(e=>{let n=t.selectedCategory===`All`||e.category===t.selectedCategory,r=e.title.toLowerCase().includes(t.searchQuery.toLowerCase())||e.excerpt.toLowerCase().includes(t.searchQuery.toLowerCase());return n&&r}),a=``;i.length===0?a=`
      <div class="post-card" style="text-align: center; padding: 50px 20px;">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 2rem; color: var(--color-text-muted); margin-bottom: 16px;"></i>
        <h2>No posts found</h2>
        <p style="color: var(--color-text-muted); margin-top: 8px;">Try clearing your search query or choosing another category in the sidebar.</p>
      </div>
    `:(i.forEach(e=>{a+=`
        <article class="post-card">
          <div class="post-meta">
            <span><i class="fa-regular fa-calendar"></i> ${e.date}</span>
            <span style="margin: 0 4px;">|</span>
            <span><i class="fa-regular fa-user"></i> ${e.author}</span>
          </div>
          <h2><a href="#" data-post-link="${e.id}">${e.title}</a></h2>
          <p class="post-excerpt">${e.excerpt}</p>
          <button class="read-more-btn" data-post-btn="${e.id}">
            Read More &rarr;
          </button>
        </article>
      `}),a+=`
      <div class="pagination">
        <span class="page-num active">1</span>
        <span class="page-num">2</span>
        <span class="page-num"><i class="fa-solid fa-chevron-right" style="font-size: 0.75rem;"></i></span>
      </div>
    `),r.innerHTML=a,r.querySelectorAll(`[data-post-link], [data-post-btn]`).forEach(e=>{e.addEventListener(`click`,e=>{e.preventDefault(),t.currentView=e.currentTarget.getAttribute(`data-post-link`)||e.currentTarget.getAttribute(`data-post-btn`),n(),window.scrollTo({top:0,behavior:`smooth`})})})}function a(r){let i=document.querySelector(`#main-content-pane`);if(!i)return;let a=e.find(e=>e.id===r);if(!a){i.innerHTML=`<h2>Post not found</h2>`;return}i.innerHTML=`
    <article class="post-detail-view">
      <div class="back-btn-wrapper">
        <button class="back-to-feed-btn" id="back-to-feed-btn">
          <i class="fa-solid fa-arrow-left"></i> Back to Articles
        </button>
      </div>
      
      <div class="post-meta">
        <span><i class="fa-regular fa-calendar"></i> ${a.date}</span>
        <span style="margin: 0 4px;">|</span>
        <span><i class="fa-regular fa-user"></i> ${a.author}</span>
        <span class="tag" style="margin-left: 12px;">${a.category}</span>
      </div>
      
      <div class="post-detail-header">
        <h1>${a.title}</h1>
      </div>

      <div class="post-detail-content">
        ${a.content}
      </div>
    </article>
  `,document.querySelector(`#back-to-feed-btn`).addEventListener(`click`,()=>{t.currentView=`home`,n()}),i.querySelectorAll(`.copy-code-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget.getAttribute(`data-code-id`),n=document.getElementById(t);n&&navigator.clipboard.writeText(n.innerText).then(()=>{let t=e.currentTarget.innerHTML;e.currentTarget.innerHTML=`<i class="fa-solid fa-check"></i> Copied!`,setTimeout(()=>{e.currentTarget.innerHTML=t},2e3)})})})}function o(){let e=document.querySelector(`#main-content-pane`);e&&(e.innerHTML=`
    <div class="post-detail-view" style="padding: 40px;">
      <h1 style="font-family: var(--font-heading); font-size: 2.3rem; color: var(--color-primary); margin-bottom: 24px;">About the Portfolio</h1>
      <p style="color: var(--color-text-dark); font-size: 1.05rem; margin-bottom: 20px; line-height: 1.8;">
        Welcome to <strong>Theerdha</strong>, a professional engineering portfolio designed to showcase software implementation, system architectures, and detailed code-break security audits.
      </p>
      <p style="color: var(--color-text-dark); font-size: 1.05rem; margin-bottom: 20px; line-height: 1.8;">
        Hi, I'm <strong>Theerdha Raju</strong>. I’m a student passionate about web development, focused on building responsive and interactive frontend applications. I enjoy writing clean, efficient code and am currently learning full‑stack development step by step. My goal is to become a skilled frontend developer and grow into full‑stack engineering.
      </p>
      
      <h2 style="font-family: var(--font-heading); color: var(--color-primary); font-size: 1.45rem; margin: 32px 0 16px 0; position: relative; padding-bottom: 12px;">Portfolio Rubrics</h2>
      <ul style="color: var(--color-text-dark); padding-left: 20px; display: flex; flex-direction: column; gap: 10px; line-height: 1.7;">
        <li>Demonstrating end-to-end containerized setup and deployments (Docker implementation).</li>
        <li>Presenting structured programmatic socket audit procedures and logic flow breakdowns.</li>
        <li>Engineering a premium, highly responsive custom styling layout.</li>
      </ul>
    </div>
  `)}function s(){let e=document.querySelector(`#main-content-pane`);e&&(e.innerHTML=`
    <div class="post-detail-view" style="padding: 40px;">
      <h1 style="font-family: var(--font-heading); font-size: 2.3rem; color: var(--color-primary); margin-bottom: 24px;">Contact Us</h1>
      <p style="color: var(--color-text-dark); font-size: 1.05rem; margin-bottom: 24px; line-height: 1.8;">
        Have any questions regarding our software implementations or security audit briefs? Reach out to us below.
      </p>
      
      <form action="https://formspree.io/f/xeedagnq" method="POST" style="display: flex; flex-direction: column; gap: 20px; max-width: 500px;">
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <label style="font-weight: 600; font-size: 0.9rem;">Name *</label>
          <input type="text" name="name" required style="padding: 10px; border: 1px solid #cbd5e1; outline: none; border-radius: 3px;">
        </div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <label style="font-weight: 600; font-size: 0.9rem;">From Email *</label>
          <input type="email" name="_replyto" required style="padding: 10px; border: 1px solid #cbd5e1; outline: none; border-radius: 3px;">
        </div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
            <label style="font-weight: 600; font-size: 0.9rem;">From Email *</label>
          <input type="email" name="to" required style="padding: 10px; border: 1px solid #cbd5e1; outline: none; border-radius: 3px;">
        </div>
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <label style="font-weight: 600; font-size: 0.9rem;">Message *</label>
          <textarea name="message" required rows="5" style="padding: 10px; border: 1px solid #cbd5e1; outline: none; border-radius: 3px; resize: vertical;"></textarea>
        </div>
        <button type="submit" class="read-more-btn" style="max-width: 150px; justify-content: center;">Send Message</button>
      </form>
    </div>
  `)}function c(){let e=document.querySelector(`#sidebar-pane`);e&&(e.innerHTML=`
    <div class="sidebar-widget">
      <form class="search-form" id="search-form">
        <input type="text" class="search-input" placeholder="Search ..." id="search-input" value="${t.searchQuery}">
        <button type="submit" class="search-btn" aria-label="Search">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
    </div>
  
    <div class="sidebar-widget">
      <h3>Recent Posts</h3>
      <ul class="sidebar-list">
        <li><a href="#" data-recent-id="docker-implementation">Topic-Based Tech Tool Implementation: Docker</a></li>
        <li><a href="#" data-recent-id="port-scanner-analysis">Code Break Analysis: Python Network Port Scanner</a></li>
      </ul>
    </div>
  
    <div class="sidebar-widget">
      <h3>Recent Comments</h3>
      <p style="color: var(--color-text-muted); font-size: 0.95rem;">No comments to show.</p>
    </div>
  
    <div class="sidebar-widget">
      <h3>Archives</h3>
      <ul class="sidebar-list">
        <li><a href="#" data-nav="home">May 2018</a></li>
      </ul>
    </div>
  
    <div class="sidebar-widget">
      <h3>Categories</h3>
      <ul class="sidebar-list">
        <li><a href="#" data-nav="home">WordPress (2)</a></li>
        <li><a href="#" style="pointer-events: none; cursor: default;">Uncategorized (0)</a></li>
      </ul>
    </div>
  
    <div class="sidebar-widget">
      <h3>Meta</h3>
      <ul class="sidebar-list">
        <li><a href="#" onclick="alert('Admin Login Module is active.'); return false;">Log in</a></li>
        <li><a href="#" onclick="alert('Entries RSS feed.'); return false;">Entries feed</a></li>
        <li><a href="#" onclick="alert('Comments RSS feed.'); return false;">Comments feed</a></li>
        <li><a href="https://wordpress.org" target="_blank">WordPress.org</a></li>
      </ul>
    </div>
  
    <div class="sidebar-widget">
      <h3>Interactive Sandbox</h3>
      <div class="terminal-widget">
        <div class="terminal-header">
          <span>sandbox.sh // v1.0.4</span>
          <i class="fa-solid fa-circle" style="color: #38bdf8; font-size: 0.55rem; animation: pulse 1.5s infinite alternate;"></i>
        </div>
        <div class="terminal-window" id="terminal-window">
          <div class="terminal-line">Welcome guest. Type <span style="color: #f43f5e; font-weight:bold;">help</span> to list commands.</div>
        </div>
        <div class="terminal-input-container">
          <span class="terminal-prompt">$</span>
          <input type="text" class="terminal-input-field" id="terminal-input" placeholder="..." autocomplete="off">
        </div>
      </div>
    </div>
  `,l())}function l(){let e=document.querySelector(`#search-form`);e&&e.addEventListener(`submit`,e=>{e.preventDefault(),t.searchQuery=document.querySelector(`#search-input`).value,t.currentView=`home`,i()}),document.querySelectorAll(`[data-recent-id]`).forEach(e=>{e.addEventListener(`click`,e=>{e.preventDefault(),t.currentView=e.currentTarget.getAttribute(`data-recent-id`),n(),window.scrollTo({top:0,behavior:`smooth`})})}),u()}function u(){let e=document.querySelector(`#terminal-input`),t=document.querySelector(`#terminal-window`);if(!e||!t)return;t.addEventListener(`click`,()=>{e.focus()}),e.addEventListener(`keydown`,t=>{if(t.key===`Enter`){let t=e.value.trim();if(e.value=``,!t)return;n(`guest@theerdha:~$ ${t}`,`#cbd5e1`),r(t)}});function n(e,n=`#38bdf8`){let r=document.createElement(`div`);r.className=`terminal-line`,r.style.color=n,r.innerHTML=e,t.appendChild(r),t.scrollTop=t.scrollHeight}function r(e){let r=e.toLowerCase().split(` `),i=r[0],a=r.slice(1).join(` `);switch(i){case`help`:n(`Active sandbox parameters:`,`#a78bfa`),n(`  <span style="color:#e2e8f0">help</span> - Display active lists.`),n(`  <span style="color:#e2e8f0">scan &lt;target&gt;</span> - Trace TCP port connections (Post #2).`),n(`  <span style="color:#e2e8f0">docker build</span> - Assemble app container (Post #1).`),n(`  <span style="color:#e2e8f0">clear</span> - Clear prompt buffer.`),n(`  <span style="color:#e2e8f0">whoami</span> - Check active user context.`);break;case`clear`:t.innerHTML=``;break;case`whoami`:n(`guest_user // Session key: WP_GUEST_404`,`#10b981`);break;case`scan`:if(!a)n(`Usage error: scan &lt;ip/url&gt;`,`#f43f5e`);else{n(`Scanning target ${a}...`,`#38bdf8`),n(`Scanning common ports [22, 80, 443] at timeout 0.5s...`,`#e2e8f0`);let e=[22,80,443],t=0,r=setInterval(()=>{if(t<e.length){let r=e[t];n(`Port ${r}/tcp (${r===22?`ssh`:r===80?`http`:`https`}) -> <span style="color:#10b981; font-weight:600;">OPEN</span>`,`#10b981`),t++}else clearInterval(r),n(`TCP connection port scan completed successfully.`,`#38bdf8`)},350)}break;case`docker`:a===`build`?(n(`Building container context: my-node-app...`,`#e2e8f0`),setTimeout(()=>n(`FROM node:18-alpine -> pull successful`,`#38bdf8`),200),setTimeout(()=>n(`WORKDIR /usr/src/app -> complete`,`#e2e8f0`),500),setTimeout(()=>n(`COPY package*.json ./ -> complete`,`#e2e8f0`),800),setTimeout(()=>n(`RUN npm install -> complete (added 50 packages)`,`#e2e8f0`),1100),setTimeout(()=>n(`COPY . . -> complete`,`#e2e8f0`),1400),setTimeout(()=>{n(`Successfully built ad372bdcf361`,`#10b981`),n(`Successfully tagged my-node-app:latest`,`#10b981`)},1700)):n(`Error: Invalid arguments. Try "docker build"`,`#f43f5e`);break;default:n(`Command not found: '${i}'. Type 'help' for active commands.`,`#f43f5e`);break}}}n();