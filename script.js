// Smooth scrolling para navegação
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Contador da waitlist (simulado)
let waitlistCount = 847;

// Função para entrar na waitlist
function joinWaitlist() {
    scrollToSection('waitlist');
    
    // Adiciona um pequeno delay para o scroll terminar
    setTimeout(() => {
        document.querySelector('input[type="email"]').focus();
    }, 800);
}

// Função para submeter o formulário da waitlist
function submitWaitlist(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const name = form.querySelector('input[type="text"]').value;
    
    // Validação básica
    if (!email || !name) {
        alert('Por favor, preencha todos os campos!');
        return;
    }
    
    // Simula envio (em produção, conectaria com backend)
    showSuccessMessage(name);
    
    // Incrementa contador
    waitlistCount++;
    updateWaitlistCounter();
    
    // Limpa formulário
    form.reset();
}

// Mostra mensagem de sucesso
function showSuccessMessage(name) {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <div style="
            background: linear-gradient(45deg, #00b894, #00cec9);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            margin: 1rem 0;
            text-align: center;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(0, 184, 148, 0.3);
            animation: slideIn 0.5s ease-out;
        ">
            🎉 Parabéns ${name}! Você está na waitlist! 
            <br><small>Em breve enviaremos mais informações no seu email.</small>
        </div>
    `;
    
    const form = document.querySelector('.waitlist-form');
    form.parentNode.insertBefore(message, form.nextSibling);
    
    // Remove mensagem após 5 segundos
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// Atualiza contador da waitlist
function updateWaitlistCounter() {
    const counter = document.getElementById('waitlist-counter');
    if (counter) {
        counter.textContent = waitlistCount;
        
        // Animação no contador
        counter.style.transform = 'scale(1.2)';
        counter.style.color = '#ff6b6b';
        
        setTimeout(() => {
            counter.style.transform = 'scale(1)';
            counter.style.color = '#667eea';
        }, 300);
    }
}

// Animações ao fazer scroll
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.feature-card, .token-stat');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Efeito parallax suave no hero
function handleParallax() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Contador animado nos stats
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        let currentValue = 0;
        const increment = finalValue.includes('%') ? 1 : 1;
        const isPercentage = finalValue.includes('%');
        const numericValue = parseInt(finalValue);
        
        const timer = setInterval(() => {
            if (currentValue < numericValue) {
                currentValue += increment;
                stat.textContent = currentValue + (isPercentage ? '%' : '');
            } else {
                stat.textContent = finalValue;
                clearInterval(timer);
            }
        }, 50);
    });
}

// Efeito de digitação no título
function typewriterEffect() {
    const title = document.querySelector('.hero-content h1');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    title.style.borderRight = '2px solid white';
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            setTimeout(() => {
                title.style.borderRight = 'none';
            }, 1000);
        }
    }, 100);
}

// Menu mobile (para futuras implementações)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa contador da waitlist
    updateWaitlistCounter();
    
    // Configura animações de scroll
    window.addEventListener('scroll', () => {
        handleScrollAnimations();
        handleParallax();
    });
    
    // Anima stats quando visíveis
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.classList.contains('stats')) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Efeito de digitação no título (opcional)
    // setTimeout(typewriterEffect, 1000);
    
    // Adiciona classe para animações CSS
    document.body.classList.add('loaded');
});

// Adiciona estilos CSS para animações via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .feature-card, .token-stat {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .success-message {
        animation: slideIn 0.5s ease-out;
    }
    
    .nav-links.mobile-active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        padding: 1rem;
    }
`;
document.head.appendChild(style);

// Easter egg - Konami Code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.toString() === konamiSequence.toString()) {
        document.body.style.transform = 'rotate(360deg)';
        document.body.style.transition = 'transform 2s ease-in-out';
        
        setTimeout(() => {
            alert('🚀 Easter Egg encontrado! Você é um verdadeiro geek! 💎');
            document.body.style.transform = 'none';
        }, 2000);
        
        konamiCode = [];
    }
});
