document.addEventListener('DOMContentLoaded', () => {
    // Resume Download Functionality
    const downloadResumeBtn = document.getElementById("download-resume");
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener("click", function (event) {
            event.preventDefault();
            const resumeUrl = "Somesh Pratap Singh Resume.pdf";
            const link = document.createElement("a");
            link.href = resumeUrl;
            link.download = "Somesh_Pratap_Singh_Resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // Profile Dropdown Functionality
    const profileButton = document.getElementById('profileButton');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    if (profileButton && dropdownMenu) {
        profileButton.addEventListener('click', () => {
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });

        window.addEventListener('click', (event) => {
            if (!profileButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    }

    // Hamburger Menu Toggle Functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const headerLinks = document.querySelector('.Headerlinks');
  
    if (hamburgerMenu && headerLinks) {
        hamburgerMenu.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
  
            headerLinks.classList.toggle('active');
  
            const isExpanded = headerLinks.classList.contains('active');
            hamburgerMenu.setAttribute('aria-expanded', isExpanded);
            headerLinks.setAttribute('aria-hidden', !isExpanded);
        });
  
        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!headerLinks.contains(event.target) && 
                !hamburgerMenu.contains(event.target)) {
                headerLinks.classList.remove('active');
                hamburgerMenu.setAttribute('aria-expanded', 'false');
                headerLinks.setAttribute('aria-hidden', 'true');
            }
        });
  
        // Close menu on escape key
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && headerLinks.classList.contains('active')) {
                headerLinks.classList.remove('active');
                hamburgerMenu.setAttribute('aria-expanded', 'false');
                headerLinks.setAttribute('aria-hidden', 'true');
            }
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const headerLinks = document.querySelector('.Headerlinks');
  const navLinks = headerLinks.querySelectorAll('a');

  // Close menu when a nav link is clicked
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          headerLinks.classList.remove('active');
          hamburgerMenu.setAttribute('aria-expanded', 'false');
          headerLinks.setAttribute('aria-hidden', 'true');
      });
  });
});

// Viewport and Element Size Management
const ViewportManager = {
    initialSizes: new Map(),
    
    init() {
        this.storeInitialSizes();
        this.setupEventListeners();
        this.handleResize();
    },
  
    storeInitialSizes() {
        const elements = {
            heroTitle: document.querySelector('.homeh1'),
            heroText: document.querySelector('.herosammy'),
            aboutContent: document.querySelector('.aboutp'),
            skillItems: document.querySelectorAll('.skills__skill')
        };
  
        for (const [key, element] of Object.entries(elements)) {
            if (element) {
                const styles = window.getComputedStyle(element);
                this.initialSizes.set(key, {
                    fontSize: parseFloat(styles.fontSize),
                    padding: styles.padding,
                    margin: styles.margin
                });
            }
        }
    },
  
    setupEventListeners() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.handleResize(), 250);
        });
      
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.handleResize(), 100);
        });
    },
  
    handleResize() {
        const width = window.innerWidth;
        this.adjustElementSizes(width);
        this.adjustLayout(width);
        this.optimizePerformance(width);
    },
  
    adjustElementSizes(width) {
        const heroTitle = document.querySelector('.homeh1');
        const heroText = document.querySelector('.herosammy');
      
        if (heroTitle && heroText) {
            const scaleFactor = Math.min(width / 1200, 1);
            const initialHeroSize = this.initialSizes.get('heroTitle');
        
            if (initialHeroSize) {
                heroTitle.style.fontSize = `${initialHeroSize.fontSize * scaleFactor}px`;
                heroText.style.fontSize = `${initialHeroSize.fontSize * scaleFactor * 0.8}px`;
            }
        }
  
        const skills = document.querySelectorAll('.skills__skill');
        skills.forEach(skill => {
            if (width <= 480) {
                skill.style.padding = '0.5rem 1rem';
                skill.style.margin = '0.3rem';
            } else {
                const initialSkillSize = this.initialSizes.get('skillItems');
                if (initialSkillSize) {
                    skill.style.padding = initialSkillSize.padding;
                    skill.style.margin = initialSkillSize.margin;
                }
            }
        });
    },
  
    adjustLayout(width) {
        const navbar = document.querySelector('.navbar');
        const headerLinks = document.querySelector('.Headerlinks');
      
        if (width <= 768) {
            navbar?.classList.add('mobile-nav');
            headerLinks?.classList.add('mobile-links');
            this.handleMobileNav();
        } else {
            navbar?.classList.remove('mobile-nav');
            headerLinks?.classList.remove('mobile-links');
            headerLinks && (headerLinks.style.display = 'flex');
        }
    },
  
    handleMobileNav() {
        const headerLinks = document.querySelector('.Headerlinks');
        const herome = document.querySelector('.herome');
      
        if (!document.querySelector('.nav-toggle')) {
            const toggle = document.createElement('button');
            toggle.className = 'nav-toggle';
            toggle.innerHTML = '☰';
            toggle.style.cssText = `
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
            `;
        
            toggle.onclick = () => {
                const isVisible = headerLinks.style.display === 'flex';
                headerLinks.style.display = isVisible ? 'none' : 'flex';
            };
        
            herome?.parentNode.insertBefore(toggle, herome.nextSibling);
        }
    },
  
    optimizePerformance(width) {
        if (width <= 768) {
            document.body.classList.add('reduce-motion');
            this.debounceScrollEvents();
        } else {
            document.body.classList.remove('reduce-motion');
        }
      
        const heroSection = document.querySelector('.hero-home');
        const aboutSection = document.querySelector('.about');
      
        if (width <= 480) {
            heroSection?.style.setProperty('background-attachment', 'scroll');
            aboutSection?.style.setProperty('background-attachment', 'scroll');
        }
    },
  
    debounceScrollEvents() {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Placeholder for scroll-based animations/effects
            }, 150);
        }, { passive: true });
    }
};

// Initialize viewport manager
document.addEventListener('DOMContentLoaded', () => ViewportManager.init());
