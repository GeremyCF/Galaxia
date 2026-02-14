const planetHoverPhrases = [
    "Eres mi todo",
    "Mi corazón late por ti",
    "Juntos por siempre",
    "Eres mi sueño hecho realidad",
    "Amor infinito",
    "Eres mi luz",
    "Mi alma te pertenece",
    "Contigo la vida es bella"
];

const floatingPhrases = [
    "El amor todo lo puede",
    "Eres mi universo",
    "Te amo más que ayer",
    "Nuestro amor es infinito",
    "Eres mi estrella favorita",
    "Mi corazón es tuyo",
    "Juntos somos más",
    "Eres mi destino",
    "Amor eterno",
    "Eres mi razón de ser",
    "Mi amor por ti crece cada día",
    "Eres mi paraíso",
    "Cada momento contigo es especial",
    "Eres la mejor parte de mi vida",
    "Tu amor ilumina mi existencia",
    "Eres mi pensamiento favorito",
    "Amo tu sonrisa",
    "Eres mi persona favorita",
    "Contigo quiero envejecer",
    "Eres mi felicidad",
    "Tu amor es mi fuerza",
    "Eres mi refugio",
    "Amo cada parte de ti",
    "Eres mi complemento perfecto",
    "Mi amor por ti es eterno"
];

const planetClickPhrases = [
    "Desde que llegaste a mi vida, todo tiene sentido. Eres la razón por la que mi corazón late con fuerza cada mañana y por la que mis sueños están llenos de felicidad.",
    "A tu lado descubrí que el amor verdadero existe. Eres mi complemento perfecto, la personificación de todo lo bueno que podía imaginar.",
    "Si tuviera que elegir entre respirar y amarte, usaría mi último aliento para decirte que te amo. Eres lo más importante en mi vida.",
    "Nuestro amor es como el universo: infinito, misterioso y lleno de maravillas por descubrir. Cada día a tu lado es una nueva aventura.",
    "Eres la melodía que alegra mi corazón, la poesía que da sentido a mis días, la pintura que colorea mi mundo. Sin ti, todo sería gris.",
    "Amo cada parte de ti: tu sonrisa que ilumina mi día, tu voz que calma mi alma, tu mirada que me hace sentir el ser más afortunado del mundo.",
    "En la inmensidad del cosmos, entre miles de millones de personas, encontré a mi alma gemela. El destino nos unió y el amor nos mantendrá juntos por siempre.",
    "Prometo amarte en cada vida, en cada universo, en cada realidad posible. Eres mi eternidad y mi hogar."
];

// Frases especiales para estrellas fugaces
const shootingStarPhrases = [
    "¡Eres increíble!",
    "Mi amor por ti brilla",
    "Eres mi deseo cumplido",
    "Eres mi constelación favorita",
    "Juntos somos magia",
    "Eres mi sueño hecho realidad",
    "Nuestro amor es cósmico",
    "Eres la galaxia a la que quiero pertenecer",
    "Mi corazón orbita alrededor de ti",
    "Eres mi supernova"
];

// Colores para estrellas fugaces
const starColors = [
    "#ff5e7d", "#ff9077", "#ffcc66", "#5ebdff", "#9d7cff", 
    "#ff6b6b", "#ff8e8e", "#6bff8e", "#8e6bff", "#ff6bff"
];

// Configuración de planetas
const planets = [
    { name: "Amor", size: 16, color: "#ff4d88", orbitRadius: 150, speed: 40, phrase: planetHoverPhrases[0] },
    { name: "Pasión", size: 18, color: "#ff3366", orbitRadius: 220, speed: 35, phrase: planetHoverPhrases[1] },
    { name: "Ternura", size: 14, color: "#ff99cc", orbitRadius: 290, speed: 30, phrase: planetHoverPhrases[2] },
    { name: "Compromiso", size: 20, color: "#cc66ff", orbitRadius: 360, speed: 25, phrase: planetHoverPhrases[3] },
    { name: "Complicidad", size: 15, color: "#9966ff", orbitRadius: 430, speed: 20, phrase: planetHoverPhrases[4] },
    { name: "Respeto", size: 17, color: "#6699ff", orbitRadius: 500, speed: 15, phrase: planetHoverPhrases[5] },
    { name: "Confianza", size: 19, color: "#66ccff", orbitRadius: 570, speed: 10, phrase: planetHoverPhrases[6] },
    { name: "Eternidad", size: 22, color: "#ffcc66", orbitRadius: 640, speed: 5, phrase: planetHoverPhrases[7] }
];

// Variables de estado
let currentZoom = 1;
let floatingPhrasesElements = [];
let visiblePhrases = 15;
let animationFrame = null;
let controller = null;

// Crear estrellas de fondo
function createStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    const starCount = 200;
    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 3;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        star.style.animationDuration = `${Math.random() * 5 + 3}s`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        fragment.appendChild(star);
    }
    
    starsContainer.appendChild(fragment);
}

function updateTransform(rotationX = 0, rotationY = 0) {
    const solarSystem = document.getElementById("solar-system");
    if (!solarSystem) return;
    
    solarSystem.style.transform = `
        translate(-50%, -50%)
        rotateX(${rotationX}deg)
        rotateY(${rotationY}deg)
        scale(${currentZoom})
    `;
}

// Crear estrellas fugaces con frases (optimizado)
function createShootingStars() {
    setInterval(() => {
        createShootingStar();
    }, 3000 + Math.random() * 5000);
}

function createShootingStar() {
    const star = document.createElement('div');
    star.classList.add('shooting-star');
    
    const randomPhrase = shootingStarPhrases[Math.floor(Math.random() * shootingStarPhrases.length)];
    const randomColor = starColors[Math.floor(Math.random() * starColors.length)];
    
    star.textContent = randomPhrase;
    star.style.color = randomColor;
    
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 100;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const rotation = Math.random() * 360;
    
    star.style.left = `${startX}%`;
    star.style.top = `${startY}%`;
    star.style.setProperty('--star-tx', `${tx}vw`);
    star.style.setProperty('--star-ty', `${ty}vh`);
    star.style.setProperty('--star-r', `${rotation}deg`);
    
    document.body.appendChild(star);
    
    setTimeout(() => {
        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    }, 5000);
}

// Crear órbitas y planetas
function createSolarSystem() {
    const orbitsContainer = document.getElementById('orbits-container');
    if (!orbitsContainer) return;
    
    planets.forEach((planet, index) => {
        const orbit = document.createElement('div');
        orbit.classList.add('orbit');
        orbit.style.width = `${planet.orbitRadius * 2}px`;
        orbit.style.height = `${planet.orbitRadius * 2}px`;
        orbitsContainer.appendChild(orbit);
        
        const planetEl = document.createElement('div');
        planetEl.classList.add('planet');
        planetEl.style.width = `${planet.size}px`;
        planetEl.style.height = `${planet.size}px`;
        planetEl.style.backgroundColor = planet.color;
        
        // Atributos de accesibilidad
        planetEl.setAttribute('role', 'button');
        planetEl.setAttribute('aria-label', `Planeta ${planet.name}`);
        planetEl.setAttribute('tabindex', '0');
        
        const startAngle = Math.random() * 360;
        planetEl.style.setProperty('--start-angle', `${startAngle}deg`);
        planetEl.style.animation = `orbit ${planet.speed}s linear infinite`;
        
        const hoverText = document.createElement('div');
        hoverText.classList.add('planet-hover-text');
        hoverText.textContent = planet.phrase;
        planetEl.appendChild(hoverText);
        
        planetEl.addEventListener('click', () => {
            showModal(planetClickPhrases[index]);
            createParticleEffect(event.clientX, event.clientY, planet.color);
        });
        
        // Soporte para tecla Enter
        planetEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                planetEl.click();
            }
        });
        
        orbitsContainer.appendChild(planetEl);
    });
    
    // Añadir animación de órbita
    const style = document.createElement('style');
    style.textContent = `
        @keyframes orbit {
            from { 
                transform: rotate(var(--start-angle)) translateX(var(--orbit-radius)) rotate(calc(-1 * var(--start-angle))); 
            }
            to { 
                transform: rotate(calc(var(--start-angle) + 360deg)) translateX(var(--orbit-radius)) rotate(calc(-1 * (var(--start-angle) + 360deg))); 
            }
        }
    `;
    document.head.appendChild(style);
    
    document.querySelectorAll('.planet').forEach((planet, index) => {
        planet.style.setProperty('--orbit-radius', `${planets[index].orbitRadius}px`);
    });
}

// Crear frases flotantes
function createFloatingPhrases() {
    const container = document.getElementById('floating-phrases');
    if (!container) return;
    
    // Limpiar container
    container.innerHTML = '';
    floatingPhrasesElements = [];
    
    // Crear 3 anillos concéntricos para distribuir mejor las frases
    const rings = [
        { radius: 300, count: 8 },  // Anillo interno: 8 frases
        { radius: 450, count: 10 }, // Anillo medio: 10 frases
        { radius: 600, count: 7 }   // Anillo externo: 7 frases (total 25)
    ];
    
    let phraseIndex = 0;
    
    rings.forEach(ring => {
        for (let i = 0; i < ring.count; i++) {
            if (phraseIndex >= floatingPhrases.length) break;
            
            const phraseText = floatingPhrases[phraseIndex];
            const phrase = document.createElement('div');
            phrase.classList.add('floating-phrase');
            phrase.textContent = phraseText;
            
            // Calcular posición en el círculo
            const angle = (i / ring.count) * Math.PI * 2;
            const x = Math.cos(angle) * ring.radius;
            const y = Math.sin(angle) * ring.radius;
            
            // Posicionar
            phrase.style.left = `calc(50% + ${x}px)`;
            phrase.style.top = `calc(50% + ${y}px)`;
            
            // Añadir un pequeño retraso en la animación para cada frase
            phrase.style.animationDelay = `${phraseIndex * 0.1}s`;
            
            // Guardar el ángulo para usarlo en actualizaciones
            phrase.dataset.angle = angle;
            phrase.dataset.radius = ring.radius;
            
            // Hacer visible
            phrase.classList.add('visible');
            
            container.appendChild(phrase);
            floatingPhrasesElements.push(phrase);
            phraseIndex++;
        }
    });

    animateFloatingPhrases();
}

function updateFloatingPhrasesPosition() {
    floatingPhrasesElements.forEach(phrase => {
        const angle = parseFloat(phrase.dataset.angle);
        const baseRadius = parseFloat(phrase.dataset.radius);
        
        // El radio aumenta con el zoom, pero manteniendo la proporción
        const adjustedRadius = baseRadius * currentZoom;
        
        const x = Math.cos(angle) * adjustedRadius;
        const y = Math.sin(angle) * adjustedRadius;
        
        phrase.style.left = `calc(50% + ${x}px)`;
        phrase.style.top = `calc(50% + ${y}px)`;
    });
}

// Modificar applyZoom para incluir la actualización
function applyZoom() {
    updateTransform();
    
    const heart = document.querySelector('.heart');
    if (heart) {
        heart.style.animationDuration = `${2 / currentZoom}s`;
    }
    
    updateFloatingPhrasesPosition();
    
    // Actualizar indicador de zoom
    const zoomLevel = document.getElementById('zoom-level');
    if (zoomLevel) {
        zoomLevel.textContent = `Zoom: ${Math.round(currentZoom * 100)}%`;
    }
    
    // Guardar preferencia
    localStorage.setItem('lastZoom', currentZoom);
}


// Animar frases flotantes con movimiento orgánico
function animateFloatingPhrases() {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }
    
    function animate() {
        const time = Date.now() / 2000;
        
        floatingPhrasesElements.forEach((phrase, index) => {
            if (!phrase.classList.contains('visible')) return;
            
            const baseX = parseFloat(phrase.style.left) || 0;
            const baseY = parseFloat(phrase.style.top) || 0;
            const offsetX = Math.sin(time * 0.5 + index) * 15;
            const offsetY = Math.cos(time * 0.3 + index) * 15;
            
            phrase.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${Math.sin(time + index) * 5}deg)`;
        });
        
        animationFrame = requestAnimationFrame(animate);
    }
    
    animate();
}

// Crear efecto de partículas
function createParticleEffect(x, y, color) {
    const particles = 8;
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 2000;
            box-shadow: 0 0 10px ${color};
            animation: particleFade 0.8s ease-out forwards;
        `;
        
        const angle = (i / particles) * Math.PI * 2;
        const velocity = 3 + Math.random() * 4;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--dx', dx + 'px');
        particle.style.setProperty('--dy', dy + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 800);
    }
}

// Actualizar frases visibles según el nivel de zoom
function updateVisiblePhrases() {
    const newVisibleCount = Math.min(
        floatingPhrases.length,
        Math.floor(15 + (currentZoom - 1) * 20)
    );
    
    if (newVisibleCount !== visiblePhrases) {
        visiblePhrases = newVisibleCount;
        
        floatingPhrasesElements.forEach((phrase, index) => {
            if (index < visiblePhrases) {
                phrase.classList.add('visible');
            } else {
                phrase.classList.remove('visible');
            }
        });
        
        const zoomLevel = document.getElementById('zoom-level');
        if (zoomLevel) {
            zoomLevel.textContent = `Zoom: ${Math.round(currentZoom * 100)}%`;
        }
        
        // Guardar preferencia
        localStorage.setItem('lastZoom', currentZoom);
    }
}

// Aplicar zoom
function applyZoom() {
    updateTransform();
    
    const heart = document.querySelector('.heart');
    if (heart) {
        heart.style.animationDuration = `${2 / currentZoom}s`;
    }
    
    updateVisiblePhrases();
}

// Mostrar modal
function showModal(phrase) {
    const modal = document.getElementById('modal');
    const modalText = document.getElementById('modal-text');
    
    if (!modal || !modalText) return;
    
    modalText.textContent = phrase;
    modal.classList.add('active');
    
    // Vibración en móviles
    if ('vibrate' in navigator) {
        navigator.vibrate(30);
    }
}

// Configurar cierre del modal
function setupModalClose() {
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('modal-close');
    
    if (!modal || !closeBtn) return;
    
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

// Configurar controles de zoom
function setupZoomControls() {
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => {
            currentZoom = Math.min(3, currentZoom + 0.2);
            applyZoom();
        });
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => {
            currentZoom = Math.max(0.5, currentZoom - 0.2);
            applyZoom();
        });
    }
    
    // Zoom con rueda del ratón
    const wheelHandler = (e) => {
        e.preventDefault();
        if (e.deltaY < 0) {
            currentZoom = Math.min(3, currentZoom + 0.1);
        } else {
            currentZoom = Math.max(0.5, currentZoom - 0.1);
        }
        applyZoom();
    };
    
    document.addEventListener('wheel', wheelHandler, { passive: false });
    
    return () => document.removeEventListener('wheel', wheelHandler);
}

// Configurar movimiento con mouse
function setupMouseMovement() {
    const solarSystem = document.getElementById("solar-system");
    if (!solarSystem) return;
    
    const mouseHandler = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        solarSystem.style.transform = `
            translate(-50%, -50%) 
            rotateY(${x}deg) 
            rotateX(${-y}deg) 
            scale(${currentZoom})
        `;
    };
    
    document.addEventListener("mousemove", mouseHandler);
    
    return () => document.removeEventListener("mousemove", mouseHandler);
}

// Cargar preferencias guardadas
function loadUserPreferences() {
    const savedZoom = localStorage.getItem('lastZoom');
    if (savedZoom) {
        currentZoom = parseFloat(savedZoom);
        applyZoom();
    }
}

// Inicializar todo
function init() {
    createStars();
    createSolarSystem();
    createFloatingPhrases();
    createShootingStars();
    setupModalClose();
    setupZoomControls();
    setupMouseMovement();
    loadUserPreferences();
    
    // Añadir estilo para animación de partículas si no existe
    if (!document.querySelector('#particle-style')) {
        const particleStyle = document.createElement('style');
        particleStyle.id = 'particle-style';
        particleStyle.textContent = `
            @keyframes particleFade {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(var(--dx), var(--dy)) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(particleStyle);
    }
    
    updateVisiblePhrases();
}

// Cleanup al descargar la página
window.addEventListener('beforeunload', () => {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }
});

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Ajustar responsividad
window.addEventListener('resize', applyZoom);


//MUSICA

// Configurar música de fondo
function setupBackgroundMusic() {
    // Crear el reproductor de audio (ASÍ ES CORRECTO)
    const audio = new Audio(); // ❌ Tú tenías "const audioLoop = true"
    audio.loop = true; // ✅ Así se pone loop
    audio.volume = 0.3; // ✅ Así se pone el volumen
    
    // Aquí va el nombre de tu archivo MP3
    audio.src = "MUSICA/musica.mp3"; // O "musica.mp3" si lo renombraste
    
    // Crear el botón de control
    const musicButton = document.createElement('button');
    musicButton.id = 'music-button';
    musicButton.innerHTML = '🎵'; // ❌ Te faltaba esto
    musicButton.title = 'Activar música';
    
    // Estilos para el botón (CORREGIDOS)
    musicButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ff4d88, #ff99cc);
        border: 2px solid white;
        color: white;
        font-size: 24px;
        cursor: pointer;
        z-index: 1000;
        box-shadow: 0 0 20px rgba(255, 77, 136, 0.5);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Estado de la música
    let isPlaying = false;
    
    // Función para reproducir/pausar (CORREGIDA)
    musicButton.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            musicButton.innerHTML = '🎵';
            musicButton.style.opacity = '0.7';
        } else {
            // IMPORTANTE: Los navegadores requieren interacción del usuario
            audio.play().catch(error => {
                console.log("Error al reproducir:", error);
                alert("Haz clic en cualquier parte de la página para activar la música");
            });
            musicButton.innerHTML = '🎵🎵';
            musicButton.style.opacity = '1';
        }
        isPlaying = !isPlaying;
    });
    
    // Agregar el botón a la página
    document.body.appendChild(musicButton);
    
    // Intentar reproducir automáticamente (puede que no funcione sin interacción)
    audio.play().catch(error => {
        console.log("Esperando clic del usuario para reproducir música");
    });
}

// Función para mostrar nivel de volumen
function showVolumeLevel(volume) {
    // Eliminar indicador anterior si existe
    const oldIndicator = document.getElementById('volume-indicator');
    if (oldIndicator) oldIndicator.remove();
    
    const indicator = document.createElement('div');
    indicator.id = 'volume-indicator';
    indicator.textContent = `Volumen: ${Math.round(volume * 100)}%`;
    indicator.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 30px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 14px;
        z-index: 1000;
        border: 1px solid #ff4d88;
        animation: fadeOut 2s forwards;
    `;
    
    document.body.appendChild(indicator);
    
    setTimeout(() => indicator.remove(), 2000);
}

// Llamar a la función en tu init()
function init() {
    createStars();
    createSolarSystem();
    createFloatingPhrases();
    createShootingStars();
    setupModalClose();
    setupZoomControls();
    setupMouseMovement();
    loadUserPreferences();
    setupBackgroundMusic(); // <-- AÑADIR ESTA LÍNEA
    
    // ... resto del código
}

