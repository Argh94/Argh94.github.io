// Main variables
let currentDirectory = '~';
let history = [];
let historyIndex = -1;
let isAnimationEnabled = true;
let typingSound = true;
let audioContext = null;
let isAudioInitialized = false;
let currentSection = 'portfolio';
let deferredPrompt = null;
let analyticsData = {};
let apiStatus = 'checking';

// DOM elements
const terminalBody = document.getElementById('terminal-body');
const input = document.getElementById('command-input');
const welcomeElement = document.getElementById('welcome-msg');
const themeSelector = document.getElementById('theme-selector');
const animationToggle = document.getElementById('animation-toggle');
const navItems = document.querySelectorAll('.nav-item');
const terminalTitle = document.getElementById('terminal-title');
const sshOverlay = document.getElementById('ssh-overlay');
const apiStatusElement = document.getElementById('api-status');
const apiText = document.getElementById('api-text');

// Commands
const commandList = [
  'help', 'man', 'cd', 'pwd', 'ls', 'cat', 'tree', 'find', 'about', 'skills', 
  'projects', 'contact', 'education', 'github', 'cv', 'resume', 'analytics',
  'whoami', 'date', 'clear', 'neofetch', 'themes', 'theme', 'ssh',
  'sound', 'animation', 'sudo', 'portfolio'
];

const filesystem = {
  'about.txt': `👨‍💻 About Argh94
      
═══════════════════════════════════════

I'm Argh94, a full-stack developer and AI enthusiast with over 3 years of hands-on experience building real-world projects. From designing responsive user interfaces with React and Tailwind to developing backends with Node.js, Express, and databases like MongoDB and PostgreSQL, I'm always seeking clean, scalable, and user-centric solutions.

🎯 Current Focus: AI/ML integration in web applications
🔮 Next Goal: Building scalable microservices with Go
💡 Philosophy: "Code is poetry, architecture is art"`,

  'skills.txt': `🛠️ Technical Skills Overview
      
═══════════════════════════════════════

💻 Programming Languages:
  JavaScript    ██████████░░░░░░░░░░░░░░░░░░░░░░  96%
  Python       ██████████░░░░░░░░░░░░░░░░░░░░░  89%
  Go           ████████░░░░░░░░░░░░░░░░░░░░░  78%
  PHP          ███████░░░░░░░░░░░░░░░░░░░░░░  73%
  Linux/Bash   ████████░░░░░░░░░░░░░░░░░░░░░  81%
  TypeScript   █████████░░░░░░░░░░░░░░░░░░░  92%
  
⚡ Frameworks & Technologies:
  React.js     ██████████░░░░░░░░░░░░░░░░░░░  95%
  Node.js      █████████░░░░░░░░░░░░░░░░░░░  88%
  Express.js   ████████░░░░░░░░░░░░░░░░░░░░  82%
  Next.js      ████████░░░░░░░░░░░░░░░░░░░░  85%
  FastAPI      ███████░░░░░░░░░░░░░░░░░░░░░  76%
  MongoDB      ███████░░░░░░░░░░░░░░░░░░░░░  76%
  PostgreSQL   ██████░░░░░░░░░░░░░░░░░░░░░░  68%
  Redis        ███████░░░░░░░░░░░░░░░░░░░░░░  72%
  Tailwind CSS █████████░░░░░░░░░░░░░░░░░░░░  90%`,

  'projects.txt': `🚀 Featured Projects
      
═══════════════════════════════════════

1. 📱 telegram-proxy-scraper
   Python script for collecting MTProto proxies
   from text sources and Telegram channels.
   
   🛠️ Tech: Python, asyncio, aiohttp, BeautifulSoup
   🔗 GitHub: https://github.com/Argh94/telegram-proxy-scraper
   ⭐ 47 stars, 12 forks

2. 🖥️ Win95-Ai
   Windows 95 UI with modern AI capabilities.
   Nostalgic design meets cutting-edge technology.
   
   🛠️ Tech: HTML5, CSS3, JavaScript, Web Speech API
   🔗 GitHub: https://github.com/Argh94/Win-95_Ai
   ⭐ 23 stars, 8 forks

3. 💻V2RayAutoConfig
   An automated script has been developed to extract and organize xrey kernel configuration files from multiple sources.

   🛠️ Tech:Python
   🔗 GitHub: https://github.com/Argh94/V2RayAutoConfig
   ⭐ 130 stars, 18 forks

4. 🔍ProxyProwler
   This is a robust and automated tool for the collection, verification, and management of SOCKS5, SOCKS4, and HTTPS proxies from public resources.

   🛠️ Tech:Python
   🔗 GitHub: https://github.com/Argh94/ProxyProwler
   ⭐ 5 stars, 1 forks

5. ⛓‍💥proxy-configurator-chrome-extension
   A Chrome browser extension for managing proxies with a single click to bypass restrictions, hide your IP, and stay anonymous. It features a single power button connection to the powerful and automated ProxyProwler, which handles finding proxies for you.

   🛠️ Tech:TypeScript,JavaScript,HTML5
   🔗 GitHub: https://github.com/Argh94/proxy-configurator-chrome-extension
   ⭐ 1 stars, 1 forks

6. 📱TeleFilesBot
   is a powerful and easy-to-use Telegram bot that allows users to upload, manage, and download files, images, and videos. 

   🛠️ Tech:Go
   🔗 GitHub: https://github.com/Argh94/TeleFilesBot
   ⭐ 4 stars, 1 forks

7. 📱Wg-script
   A robust and versatile script for automatically generating WARP configurations leveraging the WireGuard protocol. This script is optimized for the Termux environment and is capable of producing configurations for diverse VPN client implementations.

   🛠️ Tech:bash
   🔗 GitHub: https://github.com/Argh94/Wg-script
   ⭐ 6 stars, 3 forks

8. 🧑‍💻GitHub-Backup-Tool
   A simple and elegant web tool to list and backup public GitHub repositories as ZIP files. 

   🛠️ Tech:JavaScript,HTML5,CSS3
   🔗 GitHub: https://github.com/Argh94/GitHub-Backup-Tool
   ⭐ 2 stars, 1 forks

9. 🔎clean-ip-scanner
Clean IP Scanner is a Bash script designed to scan and test the latency of IP addresses associated with Cloudflare, IRCF (Iranian Cloudflare domains), and Gcore CDN networks. The script runs on Termux (Android) and helps users identify IP addresses with lower ping times and better accessibility.

   🛠️ Tech:bash
   🔗 GitHub: https://github.com/Argh94/clean-ip-scanner
   ⭐ 4 stars, 1 forks 
   
═══════════════════════════════════════

💼 Professional Contact:
  📧 Email: argh7394@gmail.com
  
🎮 Social Media:
  📱 Telegram: @Argh94
  💻 GitHub: github.com/Argh94
  
💡 Best Contact Methods:
  • Business inquiries: Email works best
  • Quick questions: Telegram
  
🕐 Response Time: Usually within 24 hours
🌍 Timezone: UTC+3:30 (Iran)`,

  'portfolio.txt': 
    `      ,ggg,                                     ad88888ba          a8   
          dP""8I                          ,dPYb,    d8"     "88       ,d88   
         dP   88                          IP\`\`Yb  88       88      a8P88   
        dP    88                          I8  8I    88       88    ,d8" 88   
       ,8'    88                          I8  8'    Y8,    ,d88   a8P'  88   
       d88888888    ,gggggg,    ,gggg,gg  I8 dPgg,   "PPPPPP"88 ,d8"    88   
 __   ,8"     88    dP""""8I   dP"  "Y8I  I8dP" "8I          88 888888888888 
dP"  ,8P      Y8   ,8'    8I  i8'    ,8I  I8P    I8          8P         88   
Yb,_,dP       \`8b,,dP     Y8,,d8,   ,d8I ,d8     I8,8b,    a8P         88   
 "Y8P"         \`Y88P      \`Y8P"Y8888P"88888P    \`Y8\`"Y8888P'        88   
                                    ,d8I'                                    
                                  ,dP'8I                                     
                                 ,8"  8I                                     
                                 I8   8I                                     
                                 \`8, ,8I                                     
                                  \`Y8P"
                                  
🎯 Argh94's Terminal Portfolio
═══════════════════════════════════════

👨‍💻 Professional Identity:
• Full-Stack Developer & AI Enthusiast
• 3+ Years of Real-World Project Experience
• Clean Code Advocate & Architecture Enthusiast

🔧 Technical Stack:
• Frontend: React, Next.js, TypeScript, Tailwind
• Backend: Node.js, Express, FastAPI, Go
• Databases: MongoDB, PostgreSQL, Redis
• AI/ML: OpenAI API, TensorFlow, Custom Models

🎯 Specializations:
• Responsive UI/UX Design
• Scalable Backend Architecture
• AI Integration in Web Applications
• Microservices with Go
• Real-time Applications

💡 Current Focus:
AI/ML integration in web applications for enhanced user experiences

🔮 Next Goal:
Building scalable microservices architecture using Go

💭 Philosophy:
"Code is poetry, architecture is art"
"Every line of code tells a story"`,

  'help.txt': `🚀 Welcome to Argh94's Ultimate Terminal Portfolio!
═══════════════════════════════════════

✨ Ultimate Features:
• 🔍 Advanced search (find command)
• 📊 Real-time analytics dashboard
• 🔐 SSH connection simulation
• 🌙 Auto theme detection
• 🧪 Easter eggs & fun commands
• 📱 Progressive Web App
• ⚡ Performance optimized
• 🎯 Command usage tracking

💡 Try These Commands:
• help          - Show this help menu
• about         - About Argh94
• skills        - Technical skills overview
• projects      - Featured projects
• contact       - Contact information
• portfolio     - Terminal profile
• ssh argh94.dev - SSH connection simulation
• sudo rm -rf / - Easter egg command

🔮 Pro Tips:
• Type 'help' for complete command list
• Use ↑/↓ for command history
• Check API status (top-right corner)
• Click navigation buttons above for quick access

📍 Current directory: ${currentDirectory}
🕐 Last login: ${new Date().toLocaleString()}
🌐 Status: ${navigator.onLine ? 'Online' : 'Offline'}
🔌 API: ${apiStatus}`
};

const directories = {
  '~': ['about.txt', 'skills.txt', 'projects.txt', 'contact.txt', 'portfolio.txt', 'help.txt']
};

// Enhanced Scroll Manager
class ScrollManager {
  constructor() {
    this.isAtBottom = true;
    this.scrollTimeout = null;
    this.scrollIndicator = null;
    this.scrollToTopBtn = null;
    
    this.init();
  }

  init() {
    this.terminalBody = terminalBody;
    this.setupScrollIndicators();
    this.setupEventListeners();
    this.updateScrollState();
  }

  setupScrollIndicators() {
    // Create scroll indicator (dots)
    this.scrollIndicator = document.createElement('div');
    this.scrollIndicator.className = 'scroll-indicator';
    
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.className = 'scroll-dot';
      this.scrollIndicator.appendChild(dot);
    }

    // Create scroll to top button
    this.scrollToTopBtn = document.createElement('div');
    this.scrollToTopBtn.className = 'scroll-to-top';
    this.scrollToTopBtn.innerHTML = '↑';
    this.scrollToTopBtn.title = 'Scroll to top';

    // Add to DOM
    this.terminalBody.parentElement.style.position = 'relative';
    this.terminalBody.parentElement.appendChild(this.scrollIndicator);
    this.terminalBody.parentElement.appendChild(this.scrollToTopBtn);
  }

  setupEventListeners() {
    // Handle scroll events
    this.terminalBody.addEventListener('scroll', () => this.handleScroll());
    
    // Handle scroll to top button
    this.scrollToTopBtn.addEventListener('click', () => this.scrollToTop());
  }

  handleScroll() {
    this.updateScrollState();
    
    // Clear and reset timeout
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.isAtBottom = this.checkIfAtBottom();
    }, 1000);
  }

  updateScrollState() {
    this.isAtBottom = this.checkIfAtBottom();
    
    // Update scroll indicators
    const dots = this.scrollIndicator.querySelectorAll('.scroll-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === 0 && !this.isAtBottom);
    });
    
    // Show/hide scroll indicators
    const shouldShowIndicator = !this.isAtBottom;
    this.scrollIndicator.classList.toggle('visible', shouldShowIndicator);
    
    // Show/hide scroll to top button
    const isNearTop = this.terminalBody.scrollTop < 100;
    this.scrollToTopBtn.classList.toggle('visible', isNearTop);
  }

  checkIfAtBottom() {
    const { scrollTop, scrollHeight, clientHeight } = this.terminalBody;
    return scrollTop + clientHeight >= scrollHeight - 15;
  }

  checkIfNearTop() {
    return this.terminalBody.scrollTop <= 15;
  }

  scrollToTop() {
    this.terminalBody.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  scrollToBottom() {
    this.terminalBody.scrollTo({
      top: this.terminalBody.scrollHeight,
      behavior: 'smooth'
    });
  }
}

// Initialize scroll manager
const scrollManager = new ScrollManager();

// Commands implementation
const commands = {
  help: () => filesystem['help.txt'],

  find: (args) => {
    if (!args) return '❌ Usage: find <search-term>';
    return `🔍 Search results for "${args}": (Demo mode - integrate with filesystem for full search)`;
  },

  analytics: () => {
    const totalCommands = analyticsData.totalCommands || 0;
    return `📊 Analytics Dashboard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 Total Commands: ${totalCommands}
📝 Last Command: ${analyticsData.lastCommand || 'None'}
🕐 Session Time: ${Math.floor((Date.now() - new Date().getTime()) / 60000)}m
💡 This demo shows basic analytics. Integration with real analytics services available.`;
  },

  about: () => filesystem['about.txt'],
  skills: () => filesystem['skills.txt'],
  projects: () => filesystem['projects.txt'],
  contact: () => filesystem['contact.txt'],
  portfolio: () => filesystem['portfolio.txt'],
  resume: () => filesystem['about.txt'],
  cv: () => filesystem['about.txt'],

  whoami: () => '👤 root (Argh94 - Full-Stack Developer)',

  date: () => `📅 Current time: ${new Date().toLocaleString()}`,

  clear: () => {
    terminalBody.innerHTML = '';
    return '';
  },

  neofetch: () => `📊 System Information
┌─────────────────────────────────────┐
│        Argh94's Portfolio          │
├─────────────────────────────────────┤
│ 💻 OS: Web Browser (Linux Kernel)   │
│ 🏠 Host: Ultimate Portfolio v5.0    │
│ 🔧 Shell: Enhanced Bash Terminal     │
│ 📁 PWD: /home/root/${currentDirectory}          │
│ 🎨 Theme: ${document.body.getAttribute('data-theme')}                    │
│ 🔊 Sound: ${typingSound ? 'ON' : 'OFF'}                    │
│ ✨ Animation: ${isAnimationEnabled ? 'ON' : 'OFF'}                   │
│ 📱 Mobile: ${window.innerWidth <= 768 ? 'Yes' : 'No'}                       │
└─────────────────────────────────────┘`,

  theme: (args) => {
    const themes = ['auto', 'green', 'blue', 'cyber-blue', 'matrix-blue'];
    if (!args || !themes.includes(args)) {
      return `❌ Usage: theme <${themes.join('|')}>`;
    }
    changeTheme(args);
    return `✅ Theme changed to: ${args}!`;
  },

  sound: () => {
    typingSound = !typingSound;
    return `${typingSound ? '🔊 ON' : '🔇 OFF'} Typing sound ${typingSound ? 'enabled' : 'disabled'}`;
  },

  animation: () => {
    toggleAnimation();
    return `${isAnimationEnabled ? '✨ ON' : '🌑 OFF'} Animation ${isAnimationEnabled ? 'enabled' : 'disabled'}`;
  },

  ssh: (args) => {
    if (!args) return '❌ Usage: ssh <host>';
    
    // SSH simulation
    sshOverlay.style.display = 'flex';
    const statusElement = document.getElementById('ssh-status');
    
    setTimeout(() => {
      statusElement.textContent = 'Authenticating with public key...';
    }, 1000);
    
    setTimeout(() => {
      statusElement.textContent = 'Establishing secure tunnel...';
    }, 2000);
    
    setTimeout(() => {
      statusElement.textContent = 'Connected successfully!';
    }, 3000);
    
    setTimeout(() => {
      sshOverlay.style.display = 'none';
      addOutput(`🔐 SSH Connection Established
Host: ${args}
Encryption: AES-256-GCM
Status: Active`, true);
    }, 4000);

    return `🔐 Connecting to ${args}...`;
  },

  sudo: (args) => {
    if (!args) {
      return `⚡ sudo - Superuser do
💡 Try: sudo rm -rf / (just kidding!)`;
    }
    if (args.includes('rm -rf /')) {
      return `🚀 Easter Egg Activated!
      
😱 OH NO! You've executed the infamous rm -rf / command!

🤖 Just kidding! This is a simulation...
      
💡 Try something else like 'sudo neofetch' for a real demo!`;
    }
    return `❌ Permission denied - This is a simulation!`;
  }
};

// Helper functions
function addLine() {
  const line = document.createElement('div');
  line.className = 'line';
  line.innerHTML = `<span class="prompt">root@portfolio:${currentDirectory}$</span> <span class="command"></span>`;
  terminalBody.appendChild(line);
  return line.querySelector('.command');
}

function addOutput(text, skipAnimation = false) {
  const output = document.createElement('div');
  output.className = `output${skipAnimation ? ' no-animation' : ''}`;
  output.innerHTML = text;
  terminalBody.appendChild(output);
  
  // Smart scroll: only scroll if user is at bottom
  if (scrollManager.isAtBottom) {
    setTimeout(() => scrollManager.scrollToBottom(), 50);
  }
  
  return output;
}

function executeCommand(cmd) {
  const commandLine = addLine();
  commandLine.textContent = cmd;
  execute(cmd);
}

function execute(cmd) {
  const [command, ...args] = cmd.trim().split(' ');
  const argStr = args.join(' ');

  // Track command for analytics
  analyticsData.totalCommands = (analyticsData.totalCommands || 0) + 1;
  analyticsData.lastCommand = cmd;

  if (commands[command]) {
    const result = commands[command](argStr);
    if (result) {
      addOutput(result, cmd.length > 100);
    }
  } else if (cmd.trim() !== '') {
    addOutput(`❌ Command not found: ${command}\n💡 Type 'help' for available commands`, true);
  }
}

function changeTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('terminal-theme', theme);
  if (themeSelector) themeSelector.value = theme;
}

function toggleAnimation() {
  const toggle = document.querySelector('.toggle-switch');
  isAnimationEnabled = !isAnimationEnabled;
  
  if (isAnimationEnabled) {
    toggle.classList.add('active');
    // Start background animation
    startBackgroundAnimation();
  } else {
    toggle.classList.remove('active');
    // Stop background animation
    stopBackgroundAnimation();
  }
  
  localStorage.setItem('terminal-animation', isAnimationEnabled);
}

// Background animation functions
function startBackgroundAnimation() {
  if (window.backgroundAnimInterval) return;
  
  window.backgroundAnimInterval = setInterval(() => {
    if (!isAnimationEnabled) return;
    
    createParticle();
    if (Math.random() < 0.3) createMatrixColumn();
  }, 1000);
}

function stopBackgroundAnimation() {
  clearInterval(window.backgroundAnimInterval);
  window.backgroundAnimInterval = null;
  document.getElementById('background-animation').innerHTML = '';
}

function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  
  const size = Math.random() * 3 + 1;
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  particle.style.left = Math.random() * 100 + '%';
  
  document.getElementById('background-animation').appendChild(particle);
  
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, 15000);
}

function createMatrixColumn() {
  const column = document.createElement('div');
  column.className = 'matrix-column';
  
  const chars = '01アイウエオカキクケコ';
  let text = '';
  const lines = Math.floor(Math.random() * 15) + 5;
  
  for (let i = 0; i < lines; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length)) + '<br>';
  }
  column.innerHTML = text;
  
  column.style.left = Math.random() * 100 + '%';
  column.style.animationDelay = Math.random() * 2 + 's';
  
  document.getElementById('background-animation').appendChild(column);
  
  setTimeout(() => {
    if (column.parentNode) {
      column.parentNode.removeChild(column);
    }
  }, 4000);
}

function updateAPIStatus(isOnline) {
  const statusElement = apiStatusElement;
  const textElement = apiText;
  
  if (isOnline) {
    statusElement.className = 'api-status online';
    textElement.textContent = 'API Online';
    apiStatus = 'online';
  } else {
    statusElement.className = 'api-status offline';
    textElement.textContent = 'API Offline';
    apiStatus = 'offline';
  }
}

// Enhanced typeWriter with RTL fixes
function typeWriter(text, element, callback) {
  let i = 0;
  element.classList.add('output');
  element.style.direction = 'ltr';
  element.style.unicodeBidi = 'plaintext';
  
  element.textContent = '';
  setTimeout(initAudio, 100);
  
  const interval = setInterval(() => {
    if (i < text.length) {
      const char = text.charAt(i);
      element.textContent += char;
      if (char !== ' ' && char !== '\n') {
        setTimeout(() => playTypingSound(), 20);
      }
      i++;
      // Smart scroll during typing
      if (scrollManager.isAtBottom) {
        setTimeout(() => scrollManager.scrollToBottom(), 20);
      }
    } else {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 20);
}

// Audio functions
function initAudio() {
  if (!audioContext && !isAudioInitialized) {
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      isAudioInitialized = true;
    } catch (error) {
      console.log('Audio not supported');
    }
  }
  
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
}

function playTypingSound() {
  if (!typingSound || !audioContext || !isAudioInitialized) return;
  
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const frequency = 600 + Math.random() * 400;
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
  } catch (error) {
    // Silent fail for mobile compatibility
  }
}

// Navigation handlers
function showSection(section) {
  // Clear terminal
  terminalBody.innerHTML = '';
  
  // Add content based on section
  switch(section) {
    case 'portfolio':
      addOutput(filesystem['portfolio.txt']);
      break;
    case 'about':
      addOutput(filesystem['about.txt']);
      break;
    case 'skills':
      addOutput(filesystem['skills.txt']);
      break;
    case 'projects':
      addOutput(filesystem['projects.txt']);
      break;
    case 'help':
      addOutput(filesystem['help.txt']);
      break;
    case 'analytics':
      addOutput(commands.analytics());
      break;
    case 'contact':
      addOutput(filesystem['contact.txt']);
      break;
    case 'github':
      window.open('https://github.com/Argh94', '_blank');
      addOutput(`🔗 Opening GitHub profile: https://github.com/Argh94`, true);
      break;
    default:
      addOutput(filesystem['portfolio.txt']);
  }
  
  // Update active nav item
  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.dataset.section === section) {
      item.classList.add('active');
    }
  });
  
  // Update terminal title
  terminalTitle.textContent = `root@portfolio:${currentDirectory} (${section})`;
}

// Event listeners
input.addEventListener('keydown', (e) => {
  if (!isAudioInitialized && (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Enter')) {
    initAudio();
  }
  
  if (e.key === 'Enter') {
    const cmd = input.value;
    if (cmd.trim()) {
      history.push(cmd);
      historyIndex = history.length;
    }
    const commandLine = addLine();
    commandLine.textContent = cmd;
    execute(cmd);
    input.value = '';
    scrollManager.scrollToBottom(); // Force scroll to bottom on command
    
    if (!isAudioInitialized) {
      setTimeout(initAudio(), 100);
    }
  } else if (e.key === 'ArrowUp') {
    if (historyIndex > 0) {
      historyIndex--;
      input.value = history[historyIndex];
    }
    e.preventDefault();
  } else if (e.key === 'ArrowDown') {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      input.value = history[historyIndex];
    } else {
      historyIndex = history.length;
      input.value = '';
    }
    e.preventDefault();
  } else if (e.key.length === 1 || e.key === 'Backspace') {
    setTimeout(() => playTypingSound(), 30);
  }
});

// Navigation click handlers
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const section = item.dataset.section;
    showSection(section);
  });
});

// Other event listeners
themeSelector.addEventListener('change', (e) => {
  changeTheme(e.target.value);
  addOutput(`✅ Theme changed to: ${e.target.value}!`, true);
});

animationToggle.addEventListener('click', () => {
  toggleAnimation();
  const status = isAnimationEnabled ? 'enabled' : 'disabled';
  addOutput(`🎬 Background animation ${status}`, true);
});

// API status initialization
updateAPIStatus(navigator.onLine);

window.addEventListener('online', () => {
  updateAPIStatus(true);
  addOutput('🌐 Back online! All features are now available.', true);
});

window.addEventListener('offline', () => {
  updateAPIStatus(false);
  addOutput('📡 You\'re now offline. Some features may not work properly.', true);
});

// Initialize saved theme
const savedTheme = localStorage.getItem('terminal-theme');
if (savedTheme) {
  changeTheme(savedTheme);
}

const savedAnimation = localStorage.getItem('terminal-animation');
if (savedAnimation !== null) {
  isAnimationEnabled = savedAnimation === 'true';
  if (!isAnimationEnabled) {
    const toggle = document.querySelector('.toggle-switch');
    if (toggle) toggle.classList.remove('active');
  }
}

if (isAnimationEnabled) {
  startBackgroundAnimation();
}

const welcomeMessage = filesystem['portfolio.txt'];

window.onload = () => {
  typeWriter(welcomeMessage, welcomeElement, () => {
    input.focus();
  });
};
