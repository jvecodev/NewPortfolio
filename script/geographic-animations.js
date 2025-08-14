/**
 * Sistema de Animações Geográficas e Astronômicas
 * Adiciona interatividade aos elementos temáticos
 */

class GeographicAnimations {
  constructor() {
    this.stars = [];
    this.init();
  }

  init() {
    
    // Aguardar o DOM estar pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  }

  start() {
    this.createStarField();
    this.initInteractiveCompass();
    this.initSailingBoat();
    this.initLighthouseInteraction();
    this.updateCoordinates();
    this.initScrollEffects();
    
    console.log('✨ Animações geográficas ativadas');
  }

  // Barquinho que segue o cursor
  initSailingBoat() {
    const boat = document.getElementById('sailingBoat');
    if (!boat) return;

    let mouseX = 0;
    let mouseY = 0;
    let boatX = 0;
    let boatY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Animação suave do barquinho
    const animateBoat = () => {
      const dx = mouseX - boatX;
      const dy = mouseY - boatY;
      
      // Velocidade suave (0.05 = mais lento, 0.2 = mais rápido)
      boatX += dx * 0.08;
      boatY += dy * 0.08;
      
      // Calcular direção para rotacionar o barco
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      
      boat.style.left = boatX + 'px';
      boat.style.top = boatY + 'px';
      boat.style.transform = `rotate(${angle}deg)`;
      
      requestAnimationFrame(animateBoat);
    };

    animateBoat();
    
    // Efeito especial quando o mouse para
    let mouseTimer;
    document.addEventListener('mousemove', () => {
      clearTimeout(mouseTimer);
      boat.style.filter = 'drop-shadow(2px 2px 8px rgba(255,182,55,0.6))';
      
      mouseTimer = setTimeout(() => {
        boat.style.filter = 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))';
      }, 1000);
    });
  }

  // Criar campo de estrelas dinâmico
  createStarField() {
    const constellation = document.getElementById('constellation');
    if (!constellation) return;

    const numStars = 50;
    
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Posição aleatória
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      
      // Delay aleatório para piscar
      star.style.animationDelay = Math.random() * 3 + 's';
      
      // Tamanho aleatório
      const size = Math.random() * 3 + 1;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      
      constellation.appendChild(star);
      this.stars.push(star);
    }
  }

  // Bússola interativa
  initInteractiveCompass() {
    const compasses = document.querySelectorAll('.compass');
    
    compasses.forEach(compass => {
      compass.addEventListener('mouseenter', () => {
        const needle = compass.querySelector('.compass-needle');
        if (needle) {
          needle.style.animationPlayState = 'paused';
          needle.style.transform = 'translate(-50%, -100%) rotate(45deg)';
        }
      });

      compass.addEventListener('mouseleave', () => {
        const needle = compass.querySelector('.compass-needle');
        if (needle) {
          needle.style.animationPlayState = 'running';
          needle.style.transform = '';
        }
      });

      // Clique para resetar
      compass.addEventListener('click', () => {
        const needle = compass.querySelector('.compass-needle');
        if (needle) {
          needle.style.animation = 'none';
          setTimeout(() => {
            needle.style.animation = '';
          }, 100);
        }
      });
    });
  }

  // Sistema solar interativo
  initLighthouseInteraction() {
    const lighthouse = document.querySelector('.lighthouse');
    if (!lighthouse) return;

    lighthouse.addEventListener('mouseenter', () => {
      const light = lighthouse.querySelector('.lighthouse-light');
      if (light) {
        light.style.animationDuration = '1s';
        light.style.boxShadow = '0 0 60px #f1c40f, 0 0 100px rgba(241, 196, 15, 0.8)';
      }
    });

    lighthouse.addEventListener('mouseleave', () => {
      const light = lighthouse.querySelector('.lighthouse-light');
      if (light) {
        light.style.animationDuration = '4s';
        light.style.boxShadow = '';
      }
    });
  }

  // Atualizar coordenadas com movimento
  updateCoordinates() {
    const coordsElement = document.querySelector('.geographic-coords');
    if (!coordsElement) return;

    let angle = 0;
    
    setInterval(() => {
      angle += 0.5;
      
      // Simular pequenas variações nas coordenadas
      const baseLat = -25.4296;
      const baseLong = -49.2713;
      const variation = Math.sin(angle * Math.PI / 180) * 0.001;
      
      const newLat = (baseLat + variation).toFixed(4);
      const newLong = (baseLong + variation).toFixed(4);
      
      const coordsData = coordsElement.querySelector('.coords-data');
      if (coordsData) {
        coordsData.innerHTML = `
          Lat: ${newLat}°<br>
          Long: ${newLong}°<br>
          Alt: 934m
        `;
      }
    }, 2000);
  }

  // Efeitos baseados no scroll
  initScrollEffects() {
    let ticking = false;

    const updateAnimations = () => {
      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercent = scrollY / (documentHeight - windowHeight);

      // Rotacionar rosa dos ventos baseado no scroll
      const compasses = document.querySelectorAll('.compass');
      compasses.forEach(compass => {
        const rotation = scrollPercent * 360;
        compass.style.transform = `rotate(${rotation}deg)`;
      });

     

      // Movimento das estrelas
      this.stars.forEach((star, index) => {
        const speed = (index % 3 + 1) * scrollPercent * 50;
        star.style.transform = `translateY(${speed}px)`;
      });

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  // Método para pausar/retomar animações (útil durante a intro)
  pauseAnimations() {
    const animatedElements = document.querySelectorAll('.compass-needle, .planet, .star');
    animatedElements.forEach(el => {
      el.style.animationPlayState = 'paused';
    });
  }

  resumeAnimations() {
    const animatedElements = document.querySelectorAll('.compass-needle, .planet, .star');
    animatedElements.forEach(el => {
      el.style.animationPlayState = 'running';
    });
  }

  // Método para criar evento especial (como chuva de meteoros)
  meteorShower() {
    console.log('🌠 Iniciando chuva de meteoros...');
    
    const meteorsContainer = document.createElement('div');
    meteorsContainer.style.position = 'fixed';
    meteorsContainer.style.top = '0';
    meteorsContainer.style.left = '0';
    meteorsContainer.style.width = '100%';
    meteorsContainer.style.height = '100%';
    meteorsContainer.style.pointerEvents = 'none';
    meteorsContainer.style.zIndex = '1000';
    
    document.body.appendChild(meteorsContainer);

    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        meteor.style.left = Math.random() * 100 + '%';
        meteor.style.animationDuration = (Math.random() * 2 + 1) + 's';
        
        meteorsContainer.appendChild(meteor);
        
        // Remover após animação
        setTimeout(() => {
          meteor.remove();
        }, 3000);
      }, i * 200);
    }

    // Remover container após todas as animações
    setTimeout(() => {
      meteorsContainer.remove();
    }, 6000);
  }
}

// Inicializar animações geográficas
document.addEventListener('DOMContentLoaded', () => {
  window.geographicAnimations = new GeographicAnimations();
  
  // Easter egg: chuva de meteoros ao pressionar 'M'
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'm' && window.geographicAnimations) {
      window.geographicAnimations.meteorShower();
    }
  });
});

// Exportar para uso global
window.GeographicAnimations = GeographicAnimations;
