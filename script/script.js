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
});