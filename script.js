/* =========================================
   LENTE LIBRE - JAVASCRIPT
========================================= */

// ========================================
// 1. CAMBIO DE TEMA CLARO Y OSCURO
// ========================================

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("lenteLibreTheme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  themeToggle.textContent = "☾";
} else {
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  const isDark = document.body.classList.contains("dark-theme");

  localStorage.setItem("lenteLibreTheme", isDark ? "dark" : "light");

  themeToggle.textContent = isDark ? "☾" : "☀";
});


// ========================================
// 2. MENÚ RESPONSIVE
// ========================================

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");

  menuToggle.textContent = nav.classList.contains("active")
    ? "✕"
    : "☰";
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    menuToggle.textContent = "☰";
  });
});


// ========================================
// 3. FILTROS DE LA GALERÍA
// ========================================

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    const selectedCategory = button.dataset.filter;

    // Cambiar botón activo
    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    // Filtrar fotografías
    galleryItems.forEach(item => {

      const category = item.dataset.category;

      if (
        selectedCategory === "todos" ||
        category === selectedCategory
      ) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }

    });

  });

});


// ========================================
// 4. VISOR AMPLIADO LIGHTBOX
// ========================================

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");

const closeLightbox = document.getElementById("closeLightbox");
const prevImage = document.getElementById("prevImage");
const nextImage = document.getElementById("nextImage");

let currentIndex = 0;
let visibleImages = [];

function updateVisibleImages() {

  visibleImages = Array.from(galleryItems).filter(item => {
    return !item.classList.contains("hidden");
  });

}

// Abrir fotografía
galleryItems.forEach(item => {

  item.addEventListener("click", () => {

    updateVisibleImages();

    currentIndex = visibleImages.indexOf(item);

    showImage();

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

  });

});

// Mostrar imagen seleccionada
function showImage() {

  const item = visibleImages[currentIndex];

  if (!item) return;

  const img = item.querySelector("img");
  const title = item.querySelector(".image-info h3");

  lightboxImage.src = img.src;
  lightboxImage.alt = img.alt;

  lightboxCaption.textContent = title.textContent;

}

// Imagen siguiente
nextImage.addEventListener("click", () => {

  currentIndex++;

  if (currentIndex >= visibleImages.length) {
    currentIndex = 0;
  }

  showImage();

});

// Imagen anterior
prevImage.addEventListener("click", () => {

  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = visibleImages.length - 1;
  }

  showImage();

});

// Cerrar visor
function closeViewer() {

  lightbox.classList.remove("active");

  lightbox.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  lightboxImage.src = "";

}

closeLightbox.addEventListener("click", closeViewer);

// Cerrar al hacer clic fuera de la fotografía
lightbox.addEventListener("click", (event) => {

  if (event.target === lightbox) {
    closeViewer();
  }

});

// Navegación mediante teclado
document.addEventListener("keydown", (event) => {

  if (!lightbox.classList.contains("active")) return;

  if (event.key === "Escape") {
    closeViewer();
  }

  if (event.key === "ArrowRight") {
    nextImage.click();
  }

  if (event.key === "ArrowLeft") {
    prevImage.click();
  }

});


// ========================================
// 5. FORMULARIO DE CONTACTO
// ========================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {

  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !service || !message) {

    formMessage.textContent = "Por favor, completa todos los campos obligatorios.";

    return;
  }

  formMessage.textContent =
    "¡Gracias, " + name + "! Tus datos fueron validados correctamente. Para recibir solicitudes reales, conecta este formulario a un servicio de envío de correos.";

  contactForm.reset();

});


// ========================================
// 6. BOTÓN VOLVER ARRIBA
// ========================================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

  if (window.scrollY > 400) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }

});

backToTop.addEventListener("click", () => {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

});