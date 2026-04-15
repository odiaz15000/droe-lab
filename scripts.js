/**
 * Inyecta componentes HTML de forma dinámica
 */
const injectComponent = async (elementId, componentName) => {
    const container = document.getElementById(elementId);
    if (!container) return;

    try {
        const response = await fetch(`./components/${componentName}.html`);
        if (response.ok) {
            const html = await response.text();
            container.innerHTML = html;

            // IMPORTANTE: Si acabamos de inyectar la navbar, activamos el menú móvil
            if (componentName === "navbar") {
                initMobileMenu();
            }
        }
    } catch (error) {
        console.error(`Error cargando el componente ${componentName}:`, error);
    }
};

/**
 * Activa la funcionalidad del menú hamburguesa
 */
const initMobileMenu = () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animación opcional de las rayitas
            menuToggle.classList.toggle('is-active');
        });

        // Cerrar el menú al hacer clic en un enlace (útil para móviles)
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
};

// Cargar elementos al iniciar la página
document.addEventListener("DOMContentLoaded", () => {
    injectComponent("main-nav", "navbar");
    injectComponent("main-footer", "footer");
});