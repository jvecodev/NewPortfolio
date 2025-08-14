/**
 * Sistema de Intro Isolado com Leaflet
 * COMPLETAMENTE SEPARADO - NÃO AFETA O PORTFOLIO-INIT.JS
 */

class IsolatedIntroMap {
  constructor() {
    this.map = null;
    this.curitibaCoords = [-25.4296, -49.2713]; 
    this.isAnimationComplete = false;
    this.portfolioInitialized = false;
    
    // Verificar se a intro existe antes de inicializar
    if (document.getElementById('introContainer')) {
      this.init();
    }
  }

  init() {
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  }

  start() {
    if (typeof L === 'undefined') {
      setTimeout(() => this.start(), 100);
      return;
    }

    this.initMap();
    this.bindEvents();
  }

  initMap() {
    try {
      // Inicializar mapa com vista global
      this.map = L.map('intro-map', {
        center: [20, 0], 
        zoom: 2,
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        keyboard: false,
        attributionControl: false
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: false
      }).addTo(this.map);

      this.map.whenReady(() => {
        const spinner = document.getElementById('loadingSpinner');
        if (spinner) spinner.style.display = 'none';
        setTimeout(() => this.startAnimation(), 1000);
      });

    } catch (error) {
      this.skipToPortfolio();
    }
  }

  startAnimation() {
    
    // Sequência de zoom até Curitiba
    const zoomSequence = [
      { center: [20, 0], zoom: 2, duration: 1000 },      // Vista global
      { center: [-15, -55], zoom: 4, duration: 1500 },   // América do Sul
      { center: [-25, -50], zoom: 6, duration: 1500 },   // Sul do Brasil
      { center: [-25.4296, -49.2713], zoom: 10, duration: 2000 }, // Paraná
      { center: [-25.4296, -49.2713], zoom: 13, duration: 2000 }  // Curitiba
    ];

    this.animateZoomSequence(zoomSequence, 0);
  }

  animateZoomSequence(sequence, index) {
    if (index >= sequence.length) {
      this.showLocationMarker();
      return;
    }

    const step = sequence[index];
    
    this.map.flyTo(step.center, step.zoom, {
      duration: step.duration / 1000,
      easeLinearity: 0.25
    });

    setTimeout(() => {
      this.animateZoomSequence(sequence, index + 1);
    }, step.duration);
  }

  showLocationMarker() {
    const marker = document.getElementById('locationMarker');
    const introText = document.getElementById('introText');
    
    setTimeout(() => {
      if (marker) marker.classList.add('show');
    }, 500);

    setTimeout(() => {
      if (introText) introText.classList.add('show');
    }, 1500);

    setTimeout(() => {
      this.finishIntro();
    }, 4000);
  }

  finishIntro() {
    this.removeIntroCompletely();
  }

  skipToPortfolio() {
    this.removeIntroCompletely();
  }

  removeIntroCompletely() {
    const introContainer = document.getElementById('introContainer');
    
    if (!introContainer) {
      this.ensurePortfolioInit();
      return;
    }
    
    // Fade out
    introContainer.classList.add('hidden');
    
    // Remover completamente após transição
    setTimeout(() => {
      try {
        // Destruir mapa se existir
        if (this.map) {
          this.map.remove();
          this.map = null;
        }
        
        // Remover elemento do DOM
        if (introContainer && introContainer.parentNode) {
          introContainer.parentNode.removeChild(introContainer);
        }
        
        // Limpar estilos vazados
        document.body.style.position = '';
        document.body.style.overflow = '';
        
        // Forçar reflow
        document.body.offsetHeight;
        
        this.isAnimationComplete = true;
        this.ensurePortfolioInit();
        
      } catch (error) {
        this.ensurePortfolioInit();
      }
    }, 800);
  }

  ensurePortfolioInit() {
    // Garantir que o portfolio seja inicializado
    if (!this.portfolioInitialized && window.portfolioInit) {
      
      // Pequeno delay para garantir que a remoção da intro foi concluída
      setTimeout(() => {
        if (window.portfolioInit && typeof window.portfolioInit.reinitialize === 'function') {
          window.portfolioInit.reinitialize();
        }
        this.portfolioInitialized = true;
      }, 100);
    }
  }

  bindEvents() {
    const skipBtn = document.getElementById('skipIntro');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        this.skipToPortfolio();
      });
    }

    // ESC para pular
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.isAnimationComplete) {
        this.skipToPortfolio();
      }
    });

    // Timeout de segurança (caso algo dê errado)
    setTimeout(() => {
      if (!this.isAnimationComplete) {
        this.skipToPortfolio();
      }
    }, 15000); // 15 segundos máximo
  }
}

// Inicializar apenas se a intro existir
if (document.getElementById('introContainer')) {
  window.isolatedIntro = new IsolatedIntroMap();
} 
