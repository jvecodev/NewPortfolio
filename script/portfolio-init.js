/**
 * Sistema de Inicialização do Portfólio
 * Gerencia a intro e inicialização das animações de forma robusta
 */

class PortfolioInit {
  constructor() {
    this.hasIntro = document.getElementById('introContainer') !== null;
    this.isIntroActive = this.hasIntro && !document.getElementById('introContainer')?.classList.contains('disabled');
    this.animationsInitialized = false;
    
    this.init();
  }

  init() {
    
    if (this.isIntroActive) {
      this.waitForIntroCompletion();
    } else {
      // Se não há intro ou está desabilitada, inicializar diretamente
      this.initializePortfolio();
    }
  }

  waitForIntroCompletion() {
    const checkIntroComplete = () => {
      const introContainer = document.getElementById('introContainer');
      if (!introContainer || introContainer.classList.contains('hidden')) {
        this.initializePortfolio();
      } else {
        setTimeout(checkIntroComplete, 100);
      }
    };

    checkIntroComplete();
  }

  initializePortfolio() {
    if (this.animationsInitialized) return;
    
    console.log('🚀 Inicializando portfólio...');
    
    // Garantir que o body está limpo
    document.body.style.position = '';
    document.body.style.overflow = '';
    
    // Inicializar todas as funcionalidades
    this.initScrollAnimations();
    this.initScrollTopButton();
    this.initProjectHovers();
    this.initNavbarCollapse();
    this.initTypedJS();
    
    this.animationsInitialized = true;
  }

  initScrollAnimations() {
    // Sistema de animação bidirecional (scroll up e down)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const animatedElements = document.querySelectorAll(`
      .fade-in-scroll, 
      .slide-up-scroll, 
      .slide-left-scroll, 
      .slide-right-scroll, 
      .scale-in-scroll
    `);
    
    animatedElements.forEach((el) => observer.observe(el));
  }

  initScrollTopButton() {
    const scrollTopBtn = document.getElementById("scrollTop");
    if (!scrollTopBtn) return;

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add("show");
      } else {
        scrollTopBtn.classList.remove("show");
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  initProjectHovers() {
    const projetos = document.querySelectorAll(".imagensprojetos");
    projetos.forEach((projeto) => {
      projeto.addEventListener("mouseover", () => {
        const overlay = projeto.querySelector(".overlay");
        if (overlay) {
          overlay.style.opacity = "1";
          overlay.style.pointerEvents = "auto";
        }
      });

      projeto.addEventListener("mouseout", () => {
        const overlay = projeto.querySelector(".overlay");
        if (overlay) {
          overlay.style.opacity = "0";
          overlay.style.pointerEvents = "none";
        }
      });
    });
  }

  initNavbarCollapse() {
    const toggleButton = document.querySelector(".navbar-toggler");
    const collapseElement = document.querySelector(".navbar-collapse");

    if (toggleButton && collapseElement) {
      toggleButton.addEventListener("click", function () {
        collapseElement.classList.toggle("show");
      });
    }

    // Fechar menu ao clicar nos links
    document.querySelectorAll(".nav-link").forEach((item) => {
      item.addEventListener("click", () => {
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show");
        }
      });
    });
  }

  initTypedJS() {
    setTimeout(() => {
      if (typeof Typed !== 'undefined') {
        const typedElement = document.querySelector(".typed-text");
        if (typedElement && !typedElement.classList.contains('typed')) {
          typedElement.classList.add('typed');
          new Typed(".typed-text", {
            strings: ["Software Engineer"],
            typeSpeed: 80,
            backSpeed: 60,
            loop: false,
          });
        }
      }
    }, 500);
  }

  // Método público para reinicializar (útil para debug)
  reinitialize() {
    this.animationsInitialized = false;
    this.initializePortfolio();
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  window.portfolioInit = new PortfolioInit();
});

// Exportar para uso global (debug)
window.PortfolioInit = PortfolioInit;
