/* =========================================================
   Roberto Calderón Amorós — Portafolio profesional
   Interacción: filtros, galería dinámica y visor de imágenes
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initIcons();
  initPortfolioFilters();
  initGalleryTabs();
  initGalleries();
  initLightbox();
});

function initIcons() {
  if (window.lucide) lucide.createIcons();
}

/* ---------- Filtros del portafolio destacado ---------- */
function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll("#portafolio .filter-btn");
  const cards = document.querySelectorAll(".portfolio-grid .card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      cards.forEach((card) => {
        const category = card.dataset.category;
        const show = filter === "all" || filter === category;
        card.classList.toggle("hidden", !show);
      });
    });
  });
}

/* ---------- Pestañas de la galería (Fotografía / Ilustraciones / Proyectos / Evidencias) ---------- */
function initGalleryTabs() {
  const tabButtons = document.querySelectorAll(".gallery-tabs .filter-btn");
  const panels = document.querySelectorAll(".gallery-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.dataset.panel;
      panels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === target);
      });
    });
  });
}

/* ---------- Construcción dinámica de cada galería a partir de gallery-data.js ---------- */
const galleryLists = {}; // guarda, por categoría, solo los elementos que sí cargaron (para el lightbox)

function initGalleries() {
  const data = window.PORTFOLIO_DATA || {};
  Object.keys(data).forEach((category) => {
    const grid = document.querySelector(`#panel-${category} .gallery-grid`);
    if (!grid) return;
    galleryLists[category] = [];
    data[category].forEach((item, index) => {
      grid.appendChild(createShot(item, index, category));
    });
    updateProgress(category);
  });
}

function createShot(item, index, category) {
  const shot = document.createElement("button");
  shot.type = "button";
  shot.className = "shot";
  shot.setAttribute("aria-label", item.caption);

  const img = document.createElement("img");
  img.loading = "lazy";
  img.alt = item.caption;
  img.src = item.src;

  const caption = document.createElement("span");
  caption.className = "shot-caption";
  caption.textContent = item.caption;

  img.addEventListener("load", () => {
    galleryLists[category].push({ src: item.src, caption: item.caption });
    shot.dataset.loadedIndex = galleryLists[category].length - 1;
    shot.addEventListener("click", () => {
      openLightbox(category, Number(shot.dataset.loadedIndex));
    });
    updateProgress(category);
  });

  img.addEventListener("error", () => {
    shot.classList.add("placeholder");
    shot.disabled = true;
    shot.innerHTML = `
      <div class="ph-inner">
        <i data-lucide="image-plus"></i>
        <span class="ph-label">${item.fileName}</span>
      </div>`;
    if (window.lucide) lucide.createIcons();
  });

  shot.appendChild(img);
  shot.appendChild(caption);
  return shot;
}

function updateProgress(category) {
  const el = document.querySelector(`#panel-${category} .gallery-progress`);
  if (!el) return;
  const total = (window.PORTFOLIO_DATA[category] || []).length;
  const loaded = (galleryLists[category] || []).length;
  el.textContent = `${loaded} de ${total} agregadas`;
}

/* ---------- Lightbox ---------- */
let lightboxState = { category: null, index: 0 };

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  document.getElementById("lightbox-prev").addEventListener("click", () => stepLightbox(-1));
  document.getElementById("lightbox-next").addEventListener("click", () => stepLightbox(1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });
}

function openLightbox(category, index) {
  lightboxState = { category, index };
  renderLightbox();
  document.getElementById("lightbox").classList.add("open");
}

function stepLightbox(delta) {
  const list = galleryLists[lightboxState.category] || [];
  if (!list.length) return;
  lightboxState.index = (lightboxState.index + delta + list.length) % list.length;
  renderLightbox();
}

function renderLightbox() {
  const list = galleryLists[lightboxState.category] || [];
  const item = list[lightboxState.index];
  if (!item) return;
  document.getElementById("lightbox-img").src = item.src;
  document.getElementById("lightbox-img").alt = item.caption;
  document.getElementById("lightbox-caption").textContent =
    `${item.caption} · ${lightboxState.index + 1} / ${list.length}`;
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
}
