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
    
    //Aguardar o DOM estar pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  }

  start() {

    this.initInteractiveCompass();
    this.initSailingBoat();
    this.updateCoordinates();
    this.initScrollEffects();
    

  }

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

    const animateBoat = () => {
      const dx = mouseX - boatX;
      const dy = mouseY - boatY;
      
      boatX += dx * 0.08;
      boatY += dy * 0.08;
      
      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
      
      boat.style.left = boatX + 'px';
      boat.style.top = boatY + 'px';
      boat.style.transform = `rotate(${angle}deg)`;
      
      requestAnimationFrame(animateBoat);
    };

    animateBoat();
    
    let mouseTimer;
    document.addEventListener('mousemove', () => {
      clearTimeout(mouseTimer);
      boat.style.filter = 'drop-shadow(2px 2px 8px rgba(255,182,55,0.6))';
      
      mouseTimer = setTimeout(() => {
        boat.style.filter = 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))';
      }, 1000);
    });
  }


  //Bússola interativa
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



  updateCoordinates() {
    const coordsElement = document.querySelector('.geographic-coords');
    if (!coordsElement) return;

    let angle = 0;
    
    setInterval(() => {
      angle += 0.5;
      
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

  initScrollEffects() {
    let ticking = false;

    const updateAnimations = () => {
      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercent = scrollY / (documentHeight - windowHeight);

      const compasses = document.querySelectorAll('.compass');
      compasses.forEach(compass => {
        const rotation = scrollPercent * 360;
        compass.style.transform = `rotate(${rotation}deg)`;
      });

     

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


}

document.addEventListener('DOMContentLoaded', () => {
  window.geographicAnimations = new GeographicAnimations();
  
  document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'm' && window.geographicAnimations) {
      window.geographicAnimations.meteorShower();
    }
  });
});

window.GeographicAnimations = GeographicAnimations;
