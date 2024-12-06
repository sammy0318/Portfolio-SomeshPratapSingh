document.getElementById("download-resume").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    const resumeUrl = "Somesh Pratap Singh Resume.pdf"; // Update with the correct path to your resume
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Somesh_Pratap_Singh_Resume.pdf"; // The downloaded file name
    document.body.appendChild(link); // Append the link to the document
    link.click(); // Simulate a click
    document.body.removeChild(link); // Remove the link after download
});







// Viewport and element size management
const ViewportManager = {
    // Store initial element sizes for reference
    initialSizes: new Map(),
    
    // Initialize viewport manager
    init() {
      this.storeInitialSizes();
      this.setupEventListeners();
      this.handleResize();
    },
  
    // Store initial sizes of key elements
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
  
    // Set up resize and orientation change listeners
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
  
    // Handle resize events
    handleResize() {
      const width = window.innerWidth;
      this.adjustElementSizes(width);
      this.adjustLayout(width);
      this.optimizePerformance(width);
    },
  
    // Adjust element sizes based on viewport
    adjustElementSizes(width) {
      // Adjust hero section
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
  
      // Adjust skills section
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
  
    // Adjust layout based on viewport
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
        headerLinks.style.display = 'flex';
      }
    },
  
    // Handle mobile navigation
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
  
    // Optimize performance for different viewport sizes
    optimizePerformance(width) {
      // Disable animations on mobile
      if (width <= 768) {
        document.body.classList.add('reduce-motion');
        this.debounceScrollEvents();
      } else {
        document.body.classList.remove('reduce-motion');
      }
      
      // Optimize background images
      const heroSection = document.querySelector('.hero-home');
      const aboutSection = document.querySelector('.about');
      
      if (width <= 480) {
        heroSection?.style.setProperty('background-attachment', 'scroll');
        aboutSection?.style.setProperty('background-attachment', 'scroll');
      }
    },
  
    // Debounce scroll events for better performance
    debounceScrollEvents() {
      let scrollTimeout;
      window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          // Handle scroll-based animations and effects
        }, 150);
      }, { passive: true });
    }
  };
  
  // Initialize viewport manager when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => ViewportManager.init());
  
  // Handle dynamic content loading
  document.addEventListener('load', () => {
    ViewportManager.storeInitialSizes();
    ViewportManager.handleResize();
  });






  document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const headerLinks = document.querySelector('.Headerlinks');

    hamburgerMenu.addEventListener('click', () => {
        console.log("Hamburger clicked!"); // Debug log
        headerLinks.classList.toggle('active');
    });
});
