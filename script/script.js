document.querySelectorAll('ul a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
});
});

document.addEventListener("DOMContentLoaded", () => {
    var typed = new Typed('.typed-text', {
        
        strings:['Software Engineer'],
        
        typeSpeed: 80,
        backSpeed: 60,
        loop: false
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

function getProjects() {
    const projetos = document.querySelector('.aboutPro');   
    if (projetos) {
        projetos.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const projetos = document.querySelectorAll('.imagensprojetos');
    projetos.forEach(projeto => {
        projeto.addEventListener('mouseover', () => {
            const overlay = projeto.querySelector('.overlay');
            overlay.style.opacity = '1';
            overlay.style.pointerEvents = 'auto';
        });

        projeto.addEventListener('mouseout', () => {
            const overlay = projeto.querySelector('.overlay');
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
        });
    });

    // Sistema de animação bidirecional (scroll up e down)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Elemento entra na viewport - adiciona animação
                entry.target.classList.add('show');
            } else {
                // Elemento sai da viewport - remove animação para reativar
                entry.target.classList.remove('show');
            }
        });
    }, {
        threshold: 0.15, // 15% do elemento precisa estar visível
        rootMargin: '0px 0px -50px 0px' // Margem para trigger mais preciso
    });

    // Observa todos os elementos com classes de animação
    const animatedElements = document.querySelectorAll(`
        .fade-in-scroll, 
        .slide-up-scroll, 
        .slide-left-scroll, 
        .slide-right-scroll, 
        .scale-in-scroll
    `);
    animatedElements.forEach(el => observer.observe(el));
});

      // Teste se o Bootstrap está carregado
      document.addEventListener('DOMContentLoaded', function() {
        console.log('Bootstrap version:', window.bootstrap?.Tooltip?.VERSION || 'Bootstrap não carregado');
        
        // Inicializar o collapse manualmente se necessário
        const toggleButton = document.querySelector('.navbar-toggler');
        const collapseElement = document.querySelector('.navbar-collapse');
        
        if (toggleButton && collapseElement) {
          toggleButton.addEventListener('click', function() {
            console.log('Botão hambúrguer clicado');
            collapseElement.classList.toggle('show');
          });
        }
      });

      // Fechar menu ao clicar nos links
      document.querySelectorAll(".nav-link").forEach((item) => {
        item.addEventListener("click", () => {
          const navbarCollapse = document.querySelector(".navbar-collapse");
          if (navbarCollapse && navbarCollapse.classList.contains("show")) {
            navbarCollapse.classList.remove('show');
          }
        });
      });
