// Funcionalidad principal del portafolio
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades principales
    initButtons();
    initSocialAnimations();
    initTypeWriter();
    initAnalytics();
});

// Configuración de botones principales - VERSIÓN HÍBRIDA
function initButtons() {
    const platziNavbarBtn = document.querySelector('.platziNavbar button');
    const platziStoreBtn = document.querySelector('.platziStore button');
    
    if (platziNavbarBtn) {
        // Botón único para abrir proyecto en la misma ventana
        const viewBtn = document.createElement('button');
        viewBtn.textContent = 'Ver Proyecto';
        viewBtn.className = 'btn-primary';
        viewBtn.onclick = () => {
            window.location.href = 'platziNavbar.html';
            trackEvent('project_open_direct', 'platziNavbar');
        };
        
        // Reemplazar botón original
        platziNavbarBtn.parentNode.replaceChild(viewBtn, platziNavbarBtn);
    }
    
    if (platziStoreBtn) {
        // Botón único para abrir proyecto en la misma ventana
        const viewBtn = document.createElement('button');
        viewBtn.textContent = 'Ver Proyecto';
        viewBtn.className = 'btn-primary';
        viewBtn.onclick = () => {
            window.location.href = 'productosPlatziStore.html';
            trackEvent('project_open_direct', 'platziStore');
        };
        
        // Reemplazar botón original
        platziStoreBtn.parentNode.replaceChild(viewBtn, platziStoreBtn);
    }
}

// Animaciones para las redes sociales
function initSocialAnimations() {
    const socialLinks = document.querySelectorAll('.enlaces a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Efecto de escritura para el título
function initTypeWriter() {
    const title = document.querySelector('header h1');
    if (title) {
        const originalText = title.textContent;
        typeWriter(title, originalText, 150);
    }
}

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

// Sistema de modales
function createModal() {
    let existingModal = document.querySelector('.modal');
    if (existingModal) {
        return existingModal;
    }

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <span class="close">&times;</span>
                <h2 id="modal-title"></h2>
            </div>
            <div class="modal-body">
                <div id="modal-description"></div>
                <div id="modal-technologies"></div>
                <div id="modal-features"></div>
                <div id="modal-gallery"></div>
                <div class="modal-actions">
                    <button id="modal-demo-btn" class="btn-demo">Abrir Proyecto</button>
                    <button id="modal-code-btn" class="btn-code">Ver Código</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Event listeners para cerrar modal
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => closeModal();
    
    // Cerrar al hacer click fuera del modal
    window.onclick = (event) => {
        if (event.target === modal) {
            closeModal();
        }
    };
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    return modal;
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function showProjectDetails(projectName) {
    const modal = createModal();
    const title = document.getElementById('modal-title');
    const description = document.getElementById('modal-description');
    const technologies = document.getElementById('modal-technologies');
    const features = document.getElementById('modal-features');
    const gallery = document.getElementById('modal-gallery');
    const demoBtn = document.getElementById('modal-demo-btn');
    const codeBtn = document.getElementById('modal-code-btn');
    
    // Base de datos de proyectos actualizada
    const projectInfo = {
        'platziNavbar': {
            title: 'Platzi Navbar - Navegación Interactiva',
            description: `
                <p>Una réplica completa y funcional de la barra de navegación de Platzi, desarrollada con tecnologías web modernas.</p>
                <p><strong>Objetivo del proyecto:</strong> Recrear la experiencia de navegación de Platzi con funcionalidades interactivas y diseño responsive.</p>
                <p><strong>Principales desafíos:</strong> Implementar búsqueda en tiempo real, crear animaciones fluidas y mantener la usabilidad en dispositivos móviles.</p>
                <p><strong>Aprendizajes clave:</strong> Manipulación avanzada del DOM, eventos JavaScript, CSS Grid/Flexbox, y principios de UX/UI.</p>
            `,
            technologies: [
                { name: 'HTML5', level: 'Avanzado', color: '#e34c26' },
                { name: 'CSS3', level: 'Avanzado', color: '#1572b6' },
                { name: 'JavaScript ES6+', level: 'Intermedio', color: '#f7df1e' },
                { name: 'Responsive Design', level: 'Avanzado', color: '#61dafb' },
                { name: 'Flexbox/Grid', level: 'Avanzado', color: '#ff6b6b' }
            ],
            features: [
                'Diseño completamente responsivo',
                'Búsqueda interactiva con filtros dinámicos',
                'Navegación por categorías con animaciones',
                'Menú hamburguesa para móviles',
                'Optimización para dispositivos táctiles',
                'Accesibilidad web (WCAG 2.1)',
                'Animaciones CSS y JavaScript',
                'Cross-browser compatibility'
            ],
            images: ['img/platziNavbar.png'],
            projectUrl: 'platziNavbar.html',
            codeUrl: 'https://github.com/andre051223/platziNavbar',
            status: 'Completado',
            duration: '2 semanas'
        },
        'platziStore': {
            title: 'Platzi Store - E-commerce Moderno',
            description: `
                <p>Tienda virtual completa inspirada en Platzi Store, con funcionalidades de e-commerce moderno y experiencia de usuario optimizada.</p>
                <p><strong>Objetivo del proyecto:</strong> Crear una tienda online funcional con carrito de compras, sistema de filtros y proceso de checkout.</p>
                <p><strong>Principales desafíos:</strong> Gestión del estado del carrito, implementar filtros múltiples y crear un flujo de compra intuitivo.</p>
                <p><strong>Aprendizajes clave:</strong> Gestión de estado con JavaScript, LocalStorage API, patrones de diseño y arquitectura de aplicaciones web.</p>
            `,
            technologies: [
                { name: 'HTML5', level: 'Avanzado', color: '#e34c26' },
                { name: 'CSS3 + SASS', level: 'Avanzado', color: '#1572b6' },
                { name: 'JavaScript ES6+', level: 'Avanzado', color: '#f7df1e' },
                { name: 'LocalStorage API', level: 'Intermedio', color: '#4caf50' },
                { name: 'JSON', level: 'Intermedio', color: '#333333' },
                { name: 'Module Pattern', level: 'Intermedio', color: '#9c27b0' }
            ],
            features: [
                'Catálogo de productos dinámico',
                'Carrito de compras persistente',
                'Sistema de filtros múltiples (precio, categoría, rating)',
                'Búsqueda de productos en tiempo real',
                'Proceso de checkout simulado',
                'Sistema de favoritos/wishlist',
                'Diseño mobile-first',
                'Animaciones y microinteracciones',
                'Notificaciones toast',
                'Paginación de productos'
            ],
            images: ['img/platziStore.png'],
            projectUrl: 'productosPlatziStore.html',
            codeUrl: 'https://github.com/andre051223/platziStore',
            status: 'Completado',
            duration: '3 semanas'
        }
    };
    
    const info = projectInfo[projectName];
    if (!info) return;
    
    // Llenar contenido del modal
    title.innerHTML = `${info.title} <span class="project-status">${info.status}</span>`;
    description.innerHTML = `
        ${info.description}
        <div class="project-meta">
            <span class="meta-item"><strong>⏱️ Duración:</strong> ${info.duration}</span>
            <span class="meta-item"><strong>📅 Estado:</strong> ${info.status}</span>
        </div>
    `;
    
    // Tecnologías con barras de progreso mejoradas
    technologies.innerHTML = `
        <h4>🛠️ Stack Tecnológico:</h4>
        <div class="tech-grid">
            ${info.technologies.map(tech => `
                <div class="tech-item" style="border-left-color: ${tech.color}">
                    <div class="tech-header">
                        <span class="tech-name" style="color: ${tech.color}">
                            <i class="tech-icon" style="background-color: ${tech.color}"></i>
                            ${tech.name}
                        </span>
                        <span class="tech-level ${tech.level.toLowerCase()}">${tech.level}</span>
                    </div>
                    <div class="tech-bar">
                        <div class="tech-progress" style="background-color: ${tech.color}; width: ${tech.level === 'Avanzado' ? '90%' : '70%'}"></div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Features con iconos mejorados
    features.innerHTML = `
        <h4>✨ Características y Funcionalidades:</h4>
        <div class="features-grid">
            ${info.features.map((feature, index) => `
                <div class="feature-item" style="animation-delay: ${index * 0.1}s">
                    <span class="feature-icon">🚀</span>
                    <span class="feature-text">${feature}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    // Galería de imágenes mejorada
    gallery.innerHTML = `
        <h4>📷 Vista Previa del Proyecto:</h4>
        <div class="image-gallery">
            ${info.images.map((img, index) => `
                <div class="gallery-item">
                    <img src="${img}" alt="${info.title} - Vista ${index + 1}" 
                         class="gallery-image" onclick="openImageModal('${img}', '${info.title}')">
                    <div class="gallery-overlay">
                        <span class="gallery-zoom">🔍 Ver completa</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Configurar botones de acción mejorados
    demoBtn.onclick = () => {
        window.open(info.projectUrl, '_blank');
        trackEvent('project_open_from_modal', projectName);
        closeModal();
    };
    
    codeBtn.onclick = () => {
        window.open(info.codeUrl, '_blank');
        trackEvent('code_view', projectName);
    };
    
    // Mostrar modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Tracking de analytics
    trackEvent('modal_open', projectName);
}

// Modal para imágenes en pantalla completa
function openImageModal(imageSrc, title) {
    const imageModal = document.createElement('div');
    imageModal.className = 'image-modal';
    imageModal.innerHTML = `
        <div class="image-modal-content">
            <span class="image-close">&times;</span>
            <img src="${imageSrc}" alt="${title}" class="fullscreen-image">
            <div class="image-caption">${title}</div>
        </div>
    `;
    
    document.body.appendChild(imageModal);
    
    // Event listeners
    const closeBtn = imageModal.querySelector('.image-close');
    closeBtn.onclick = () => {
        document.body.removeChild(imageModal);
        document.body.style.overflow = 'hidden'; // Mantener el modal principal
    };
    
    imageModal.onclick = (e) => {
        if (e.target === imageModal) {
            document.body.removeChild(imageModal);
            document.body.style.overflow = 'hidden'; // Mantener el modal principal
        }
    };
}

// Sistema de analytics mejorado
function initAnalytics() {
    // Tracking de clicks en enlaces sociales
    document.querySelectorAll('.enlaces a').forEach(link => {
        link.addEventListener('click', (e) => {
            const platform = link.querySelector('img').alt;
            trackEvent('social_click', platform);
        });
    });
    
    // Tracking de scroll con más detalle
    let maxScroll = 0;
    window.addEventListener('scroll', throttle(() => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            if (scrollPercent >= 25 && scrollPercent < 50) trackEvent('scroll_25');
            if (scrollPercent >= 50 && scrollPercent < 75) trackEvent('scroll_50');
            if (scrollPercent >= 75 && scrollPercent < 100) trackEvent('scroll_75');
            if (scrollPercent >= 100) trackEvent('scroll_100');
        }
    }, 1000));
    
    // Tracking de tiempo en página
    const startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        trackEvent('time_on_page', timeSpent);
    });
}

function trackEvent(eventName, data = null) {
    const events = JSON.parse(localStorage.getItem('platziAnalytics')) || [];
    events.push({
        event: eventName,
        data: data,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent.substring(0, 100) // Primeros 100 caracteres
    });
    
    // Mantener solo los últimos 100 eventos
    if (events.length > 100) {
        events.splice(0, events.length - 100);
    }
    
    localStorage.setItem('platziAnalytics', JSON.stringify(events));
    
    // Log para desarrollo (puedes comentar en producción)
    console.log(`📊 Analytics: ${eventName}`, data);
}

// Función throttle para optimizar eventos
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Función para mostrar estadísticas de analytics (opcional - para desarrollo)
function showAnalytics() {
    const events = JSON.parse(localStorage.getItem('platziAnalytics')) || [];
    console.table(events);
    return events;
}

// Función para limpiar analytics
function clearAnalytics() {
    localStorage.removeItem('platziAnalytics');
    console.log('📊 Analytics limpiados');
}