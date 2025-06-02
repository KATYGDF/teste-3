// KGF Data Solutions - Scripts
// Desenvolvido por Manus AI

document.addEventListener('DOMContentLoaded', function() {
    // Menu responsivo
    const menuToggle = document.querySelector('.menu-toggle');
    const navItems = document.querySelector('.nav-items');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navItems.classList.toggle('active');
            
            // Anima as barras do menu hambúrguer
            const bars = document.querySelectorAll('.menu-toggle span');
            bars[0].classList.toggle('rotate-45');
            bars[1].classList.toggle('opacity-0');
            bars[2].classList.toggle('rotate-negative-45');
        });
    }
    
    // Adiciona classe para animação de entrada aos elementos
    const animatedElements = document.querySelectorAll('.fade-in');
    
    // Função para verificar se elemento está visível na viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Função para animar elementos quando visíveis
    function animateOnScroll() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        });
    }
    
    // Executa animação no carregamento e no scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scroll para links internos
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Fecha o menu mobile se estiver aberto
                if (navItems.classList.contains('active')) {
                    navItems.classList.remove('active');
                }
                
                // Scroll suave até o elemento
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Ajuste para o header fixo
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header com efeito de scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Validação e envio do formulário de contato
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;
            
            // Validação básica
            if (!nameInput.value.trim()) {
                markInvalid(nameInput, 'Por favor, informe seu nome');
                isValid = false;
            } else {
                markValid(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                markInvalid(emailInput, 'Por favor, informe seu e-mail');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                markInvalid(emailInput, 'Por favor, informe um e-mail válido');
                isValid = false;
            } else {
                markValid(emailInput);
            }
            
            if (!messageInput.value.trim()) {
                markInvalid(messageInput, 'Por favor, escreva sua mensagem');
                isValid = false;
            } else {
                markValid(messageInput);
            }
            
            if (isValid) {
                // Configuração para enviar para o email do usuário
                const formData = {
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    message: messageInput.value.trim(),
                    to: 'katy.garcia@kgfdatasolutions.com' // Email do usuário
                };
                
                // Simulação de envio bem-sucedido
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
                
                // Em um ambiente real, aqui seria feita uma requisição AJAX para um backend
                // que processaria o envio do email
                setTimeout(function() {
                    contactForm.reset();
                    submitBtn.textContent = 'Enviado com sucesso!';
                    
                    setTimeout(function() {
                        submitBtn.disabled = false;
                        submitBtn.textContent = originalText;
                    }, 3000);
                }, 1500);
                
                console.log('Formulário enviaria para:', formData.to);
                console.log('Dados do formulário:', formData);
            }
        });
    }
    
    // Funções auxiliares para validação do formulário
    function markInvalid(element, message) {
        element.classList.add('invalid');
        
        // Cria ou atualiza mensagem de erro
        let errorMessage = element.parentElement.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            element.parentElement.appendChild(errorMessage);
        }
        errorMessage.textContent = message;
    }
    
    function markValid(element) {
        element.classList.remove('invalid');
        const errorMessage = element.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});
