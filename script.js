// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Menu hamburger
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Animação das barras de habilidades
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
};

// Observer para animações
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
            
            // Adicionar classe de animação para outros elementos
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observar seções para animações
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Formulário de contato
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obter dados do formulário
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validação simples
    if (!name || !email || !subject || !message) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    // Simular envio (aqui você integraria com um serviço real)
    const submitBtn = this.querySelector('.btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Efeito de scroll no header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Fechar menu mobile ao clicar fora
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Animação de entrada para elementos
const fadeElements = document.querySelectorAll('.project-card, .about-text, .contact-content');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Aplicar animação inicial e observar elementos
fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// Scroll suave para o topo
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Adicionar botão "voltar ao topo" dinamicamente
const createScrollToTopBtn = () => {
    const btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.className = 'scroll-to-top';
    btn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4f46e5;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    `;
    
    btn.addEventListener('click', scrollToTop);
    document.body.appendChild(btn);
    
    // Mostrar/ocultar botão baseado no scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });
};

// Inicializar botão de voltar ao topo
createScrollToTopBtn();

// Smooth scroll para navegação ativa
const updateActiveNav = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveNav);

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Animar elementos visíveis na carga da página
    const visibleElements = document.querySelectorAll('.hero-content');
    visibleElements.forEach(element => {
        element.style.animation = 'fadeInUp 1s ease forwards';
    });
});