// VeriVox Website JavaScript
// Funcionalidades interativas, scroll suave e animações

document.addEventListener('DOMContentLoaded', function () {
    // Inicializar todas as funcionalidades
    initNavigation();
    initScrollAnimations();
    initParallaxEffects();
    initContactTabs();
    initVideoControls();
    initFormHandling();
    initMobileMenu();
    initScrollIndicator();
});

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll para links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Altura da navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Adicionar classes de animação aos elementos
    const animatedElements = document.querySelectorAll('.stat-card, .solucao-card, .diferencial-card, .cliente-card, .membro-card, .chart-container');
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Animações específicas para diferentes seções
    const leftSlideElements = document.querySelectorAll('.historia-text, .mercado-text');
    leftSlideElements.forEach(el => {
        el.classList.add('slide-in-left');
        observer.observe(el);
    });

    const rightSlideElements = document.querySelectorAll('.mercado-charts');
    rightSlideElements.forEach(el => {
        el.classList.add('slide-in-right');
        observer.observe(el);
    });

    const scaleElements = document.querySelectorAll('.hero-content, .section-title');
    scaleElements.forEach(el => {
        el.classList.add('scale-in');
        observer.observe(el);
    });
}

// Parallax Effects
function initParallaxEffects() {
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.sound-waves, .gradient-overlay, .distorted-waves');

        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });

        // Efeito parallax para ondas sonoras
        const waves = document.querySelectorAll('.wave');
        waves.forEach((wave, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            wave.style.transform = `translate(-50%, -50%) translateY(${yPos}px)`;
        });

        // Efeito parallax para background gradients
        const gradients = document.querySelectorAll('.gradient-overlay, .gradient-horizontal');
        gradients.forEach(gradient => {
            const speed = 0.2;
            const yPos = -(scrolled * speed);
            gradient.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Contact Tabs
function initContactTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const forms = document.querySelectorAll('.contact-form');

    console.log('Tab buttons found:', tabButtons.length);
    console.log('Forms found:', forms.length);

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            console.log('Tab clicked:', this.dataset.tab);
            const targetTab = this.dataset.tab;

            // Remover classe active de todos os botões
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar classe active ao botão clicado
            this.classList.add('active');

            // Esconder todos os formulários
            forms.forEach(form => {
                form.classList.add('hidden');
                console.log('Hiding form:', form.id);
            });

            // Mostrar o formulário correspondente
            const targetForm = document.getElementById(`${targetTab}-form`);
            if (targetForm) {
                targetForm.classList.remove('hidden');
                console.log('Showing form:', targetForm.id);
            } else {
                console.error('Target form not found:', `${targetTab}-form`);
            }
        });
    });

    // Garantir que o primeiro formulário esteja visível por padrão
    const firstForm = document.getElementById('investidor-form');
    if (firstForm) {
        firstForm.classList.remove('hidden');
        console.log('Default form shown:', firstForm.id);
    } else {
        console.error('Default form not found: investidor-form');
    }

    // Garantir que o primeiro botão esteja ativo por padrão
    const firstButton = document.querySelector('.tab-button[data-tab="investidor"]');
    if (firstButton) {
        firstButton.classList.add('active');
        console.log('Default button activated');
    }
}

// Video Controls
function initVideoControls() {
    const video = document.querySelector('.prototype-video');
    const playButton = document.querySelector('.play-button');
    const videoOverlay = document.querySelector('.video-overlay');

    if (video && playButton) {
        playButton.addEventListener('click', function () {
            if (video.paused) {
                video.play();
                videoOverlay.style.opacity = '0';
            } else {
                video.pause();
                videoOverlay.style.opacity = '1';
            }
        });

        // Pausar vídeo quando não está visível
        const videoObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (!entry.isIntersecting && !video.paused) {
                    video.pause();
                    videoOverlay.style.opacity = '1';
                }
            });
        }, { threshold: 0.5 });

        videoObserver.observe(video);
    }
}

// Form Handling
function initFormHandling() {
    const forms = document.querySelectorAll('.contact-form');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const formType = this.id.includes('investidor') ? 'investidor' : 'cliente';

            // Simular envio do formulário
            showFormSuccess(formType);

            // Limpar formulário
            this.reset();
        });
    });
}

function showFormSuccess(formType) {
    // Criar modal de sucesso
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Mensagem enviada com sucesso!</h3>
            <p>Obrigado pelo seu interesse no VeriVox. Entraremos em contato em breve.</p>
            <button class="btn btn-primary" onclick="closeModal()">Fechar</button>
        </div>
    `;

    // Adicionar estilos do modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease-out;
    `;

    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: var(--primary-darker);
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        border: 1px solid rgba(0, 255, 255, 0.3);
        animation: scaleIn 0.3s ease-out;
    `;

    document.body.appendChild(modal);

    // Adicionar animações CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes scaleIn {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .modal-icon {
            font-size: 3rem;
            color: var(--accent-cyan);
            margin-bottom: 20px;
        }
        .modal-content h3 {
            font-family: var(--font-secondary);
            font-size: 1.5rem;
            margin-bottom: 15px;
            color: var(--text-primary);
        }
        .modal-content p {
            color: var(--text-secondary);
            margin-bottom: 25px;
            line-height: 1.6;
        }
    `;
    document.head.appendChild(style);
}

function closeModal() {
    const modal = document.querySelector('.success-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Scroll Indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        window.addEventListener('scroll', function () {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            if (scrollTop > windowHeight * 0.5) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Navigation functions
function goToContact() {
    scrollToSection('contato');
}

function goToPitchDeck() {
    window.location.href = 'pitch-deck.html';
}

// Animações de números (contadores)
function animateNumbers() {
    const numberElements = document.querySelectorAll('.stat-number');

    numberElements.forEach(element => {
        const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            // Formatar número baseado no tipo
            if (element.textContent.includes('%')) {
                element.textContent = Math.floor(current) + '%';
            } else if (element.textContent.includes('R$')) {
                element.textContent = 'R$ ' + Math.floor(current).toLocaleString() + 'M+';
            } else if (element.textContent.includes('US$')) {
                element.textContent = 'US$ ' + Math.floor(current).toLocaleString() + ' bi';
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    });
}

// Inicializar animações de números quando a seção estiver visível
const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.problema');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Efeito de typing para o título principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Inicializar efeito de typing no hero
window.addEventListener('load', function () {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Efeito de hover nos cards
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.stat-card, .solucao-card, .diferencial-card, .cliente-card, .membro-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Inicializar efeitos de hover
initCardHoverEffects();

// Smooth scroll para todos os links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Lazy loading para imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
initLazyLoading();

// Efeito de partículas para o background
function initParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';

    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(createParticle());
        }
    }

    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${particle.opacity})`;
            ctx.fill();
        });
    }

    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);
}

// Inicializar efeito de partículas
initParticleEffect();

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Otimizar eventos de scroll
const optimizedScrollHandler = debounce(function () {
    // Código de scroll otimizado aqui
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

// Preload de recursos críticos
function preloadCriticalResources() {
    const criticalImages = [
        'Logo_Fundo_Removido.png',
        'Logo.png'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Inicializar preload
preloadCriticalResources();

console.log('VeriVox website initialized successfully! 🚀');
