/**
 * Sistema de Inicialização do Portfólio
 * Gerencia a intro e inicialização das animações de forma robusta
 */

class PortfolioInit {
  constructor() {
    this.hasIntro = document.getElementById("introContainer") !== null;
    this.isIntroActive =
      this.hasIntro &&
      !document
        .getElementById("introContainer")
        ?.classList.contains("disabled");
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
      const introContainer = document.getElementById("introContainer");
      if (!introContainer || introContainer.classList.contains("hidden")) {
        this.initializePortfolio();
      } else {
        setTimeout(checkIntroComplete, 100);
      }
    };

    checkIntroComplete();
  }

  initializePortfolio() {
    if (this.animationsInitialized) return;

    // Garantir que o body está limpo
    document.body.style.position = "";
    document.body.style.overflow = "";

    this.initScrollAnimations();
    this.initScrollTopButton();
    this.initProjectHovers();

    setTimeout(() => {
      this.initNavbarCollapse();
    }, 200);

    this.initTypedJS();

    this.animationsInitialized = true;
  }

  initScrollAnimations() {
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

    if (!toggleButton || !collapseElement) {
      console.warn("⚠️ Elementos do navbar não encontrados:", {
        toggleButton: !!toggleButton,
        collapseElement: !!collapseElement,
      });
      return;
    }

    toggleButton.replaceWith(toggleButton.cloneNode(true));
    const newToggleButton = document.querySelector(".navbar-toggler");

    try {
      if (window.bootstrap && window.bootstrap.Collapse) {
        const bsCollapse = new window.bootstrap.Collapse(collapseElement, {
          toggle: false,
        });

        newToggleButton.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          bsCollapse.toggle();
        });
      } else {
        throw new Error("Bootstrap não carregado");
      }
    } catch (error) {
      console.warn(
        "⚠️ Bootstrap Collapse falhou, usando método customizado:",
        error
      );

      newToggleButton.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        const isVisible = collapseElement.classList.contains("show");

        if (isVisible) {
          collapseElement.classList.remove("show");
          newToggleButton.setAttribute("aria-expanded", "false");
        } else {
          collapseElement.classList.add("show");
          newToggleButton.setAttribute("aria-expanded", "true");
        }
      });
    }

    document.querySelectorAll(".nav-link").forEach((item) => {
      item.addEventListener("click", () => {
        const navbarCollapse = document.querySelector(".navbar-collapse");
        const toggleBtn = document.querySelector(".navbar-toggler");

        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show");
          if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
        }
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".navbar")) {
        const navbarCollapse = document.querySelector(".navbar-collapse");
        const toggleBtn = document.querySelector(".navbar-toggler");

        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          navbarCollapse.classList.remove("show");
          if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
        }
      }
    });
  }

  initTypedJS() {
    setTimeout(() => {
      if (typeof Typed !== "undefined") {
        const typedElement = document.querySelector(".typed-text");
        if (typedElement && !typedElement.classList.contains("typed")) {
          typedElement.classList.add("typed");
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

  reinitialize() {
    this.animationsInitialized = false;
    this.initializePortfolio();
  }
}
function openWhatsApp() {
  const phoneNumber = "5541988734741";

  const message = "Olá! Vi seu portfólio e gostaria de conversar.";

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappURL, "_blank");
}


document.addEventListener("DOMContentLoaded", () => {
  window.portfolioInit = new PortfolioInit();
});

window.PortfolioInit = PortfolioInit;
