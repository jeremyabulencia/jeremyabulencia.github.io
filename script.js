// ============================================================================
// TERMINAL FUNCTIONALITY
// ============================================================================

class Terminal {
  constructor() {
    this.output = document.getElementById('terminal-output');
    this.input = document.getElementById('terminal-input');
    this.cursor = document.getElementById('terminal-cursor');
    this.commandButtons = document.querySelectorAll('.command-btn');
    
    this.setupEventListeners();
    this.runStartupSequence();
  }

  setupEventListeners() {
    this.input.addEventListener('keypress', (e) => this.handleKeyPress(e));
    this.input.addEventListener('focus', () => {
      this.cursor.style.display = 'inline';
    });
    this.input.addEventListener('blur', () => {
      this.cursor.style.display = 'none';
    });

    this.commandButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const command = btn.getAttribute('data-command');
        this.executeCommand(command);
      });
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const command = this.input.value.trim().toLowerCase();
      this.input.value = '';
      
      if (command) {
        this.printLine(command, true);
        this.executeCommand(command);
      }
    }
  }

  async runStartupSequence() {
    await this.delay(300);
    await this.typeCommand('whoami');
    await this.typeOutput('jeremy_abulencia');
    
    await this.delay(500);
    await this.typeCommand('relocation_status');
    await this.typeOutput('STATUS: Moving from Manila, PH to Dortmund, DE');
    await this.typeOutput('READINESS: Ready for new challenges in Germany');
    
    await this.delay(500);
    await this.typeCommand('cat bio.json');
    await this.typeOutput('{');
    await this.typeOutput('  "name": "Jeremy Abulencia",');
    await this.typeOutput('  "role": "Backend Engineer & Cloud Architect",');
    await this.typeOutput('  "experience": "8+ years",');
    await this.typeOutput('  "specialization": "Microservices & Scalable Systems"');
    await this.typeOutput('}');
    
    this.input.focus();
  }

  async typeCommand(command) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `<span class="terminal-prompt">$</span><span class="terminal-text"></span>`;
    this.output.appendChild(line);
    
    const textSpan = line.querySelector('.terminal-text');
    
    for (let char of command) {
      textSpan.textContent += char;
      await this.delay(30);
    }
    
    this.output.scrollTop = this.output.scrollHeight;
  }

  async typeOutput(text) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `<span class="terminal-text"></span>`;
    this.output.appendChild(line);
    
    const textSpan = line.querySelector('.terminal-text');
    
    for (let char of text) {
      textSpan.textContent += char;
      await this.delay(10);
    }
    
    this.output.scrollTop = this.output.scrollHeight;
  }

  printLine(text, isCommand = false) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    
    if (isCommand) {
      line.innerHTML = `<span class="terminal-prompt">$</span><span class="terminal-text">${this.escapeHtml(text)}</span>`;
    } else {
      line.innerHTML = `<span class="terminal-text">${this.escapeHtml(text)}</span>`;
    }
    
    this.output.appendChild(line);
    this.output.scrollTop = this.output.scrollHeight;
  }

  executeCommand(command) {
    switch (command) {
      case 'bio':
        this.printLine('Jeremy Abulencia - Backend Engineer');
        this.printLine('Location: Manila, PH (Moving to Dortmund, DE)');
        this.printLine('Experience: 8+ years in full-stack backend development');
        this.printLine('Specialization: Microservices, Cloud Architecture, Scalable Systems');
        this.printLine('Expertise: PHP/Laravel, Node.js, Docker, Kubernetes, AWS');
        break;
      
      case 'stack':
        this.printLine('Backend: PHP, Laravel, Node.js, Express.js, Python');
        this.printLine('Databases: PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch');
        this.printLine('Cloud & DevOps: AWS, Docker, Kubernetes, Jenkins, CI/CD');
        this.printLine('Architecture: Microservices, REST APIs, GraphQL, Event-Driven');
        this.printLine('Tools: Git, Linux, VS Code, Postman, Jira');
        break;
      
      case 'experience':
        this.printLine('2021-2024: Senior Backend Engineer @ Acme Solutions');
        this.printLine('  → Architected microservices handling 2M+ daily transactions');
        this.printLine('  → Led monolith to Kubernetes migration');
        this.printLine('');
        this.printLine('2019-2021: Full Stack Developer @ TechStartup Inc');
        this.printLine('  → Built REST APIs supporting 500K+ active users');
        this.printLine('  → Implemented CI/CD pipelines');
        this.printLine('');
        this.printLine('2018-2019: Junior Developer @ Digital Agency XYZ');
        this.printLine('  → Developed 15+ client websites and applications');
        this.printLine('  → Set up automated testing framework');
        break;
      
      case 'clear':
        this.output.innerHTML = '';
        break;
      
      default:
        this.printLine(`command not found: ${command}`);
        this.printLine('Available commands: bio, stack, experience, clear');
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// ============================================================================
// EXPERIENCE CARDS - EXPANDABLE DETAILS
// ============================================================================

function setupExperienceCards() {
  const expandButtons = document.querySelectorAll('.expand-btn');
  
  expandButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.experience-card');
      const details = card.querySelector('.experience-details');
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      
      if (isExpanded) {
        details.classList.remove('active');
        this.setAttribute('aria-expanded', 'false');
      } else {
        details.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// ============================================================================
// CONTACT FORM & COPY FUNCTIONALITY
// ============================================================================

function setupContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();
      
      // Basic validation
      if (!name || !email || !message) {
        showFeedback('Please fill in all fields', 'error', feedback);
        return;
      }
      
      if (!isValidEmail(email)) {
        showFeedback('Please enter a valid email address', 'error', feedback);
        return;
      }
      
      // Simulate form submission
      showFeedback('Message sent successfully! I\'ll get back to you soon.', 'success', feedback);
      form.reset();
      
      // Clear feedback after 4 seconds
      setTimeout(() => {
        feedback.classList.remove('success', 'error');
        feedback.textContent = '';
      }, 4000);
    });
  }
}

function showFeedback(message, type, feedbackEl) {
  feedbackEl.textContent = message;
  feedbackEl.classList.remove('success', 'error');
  feedbackEl.classList.add(type);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setupCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');
  
  copyButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const textToCopy = this.getAttribute('data-copy');
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = this.textContent;
        this.textContent = '✓ Copied!';
        this.classList.add('copied');
        
        setTimeout(() => {
          this.textContent = originalText;
          this.classList.remove('copied');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    });
  });
}

// ============================================================================
// SMOOTH SCROLLING FOR NAVIGATION
// ============================================================================

function setupSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// ============================================================================
// SCROLL REVEAL ANIMATIONS
// ============================================================================

function setupScrollReveal() {
  const cards = document.querySelectorAll('.bento-card, .experience-card, .metric-card, .tech-stack-card, .contact-card, .skill-category');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

// ============================================================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================================================

function setupAccessibility() {
  // Add keyboard navigation to buttons
  const buttons = document.querySelectorAll('button, a.btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
  
  // Skip to main content link
  const skipLink = document.createElement('a');
  skipLink.href = '#profile';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.position = 'absolute';
  skipLink.style.top = '-40px';
  skipLink.style.left = '0';
  skipLink.style.background = '#000';
  skipLink.style.color = 'white';
  skipLink.style.padding = '8px';
  skipLink.style.textDecoration = 'none';
  skipLink.style.zIndex = '100';
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
  });
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  document.body.prepend(skipLink);
}

// ============================================================================
// DARK MODE & THEME TOGGLE (Optional Enhancement)
// ============================================================================

function setupTheme() {
  // Check for saved theme preference or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  const terminal = new Terminal();
  setupExperienceCards();
  setupContactForm();
  setupCopyButtons();
  setupSmoothScroll();
  setupScrollReveal();
  setupAccessibility();
  setupTheme();
  
  // Log initialization
  console.log('Portfolio loaded successfully!');
  console.log('Terminal interactive commands: bio, stack, experience, clear');
});
