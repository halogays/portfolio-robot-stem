/* ============================================================
   1) Smooth Scroll dengan Offset Header
   ============================================================ */
const header = document.querySelector(".header");
const navLinks = document.querySelectorAll('a[href^="#"]');

function smoothScrollWithOffset(target) {
  const el = document.querySelector(target);
  if (!el) return;

  const headerH = header ? header.offsetHeight : 0;
  const y = el.getBoundingClientRect().top + window.scrollY - headerH - 10;

  window.scrollTo({
    top: y,
    behavior: "smooth"
  });
}

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (!id || !id.startsWith("#")) return;

    e.preventDefault();
    smoothScrollWithOffset(id);
    history.pushState(null, "", id);
  });
});

/* ============================================================
   2) Highlight Nav Aktif Saat Scroll
   ============================================================ */
const sections = Array.from(document.querySelectorAll("section"));

function setActiveNav(id) {
  navLinks.forEach(a => a.classList.remove("active"));
  const active = document.querySelector(`.nav a[href="${id}"]`);
  if (active) active.classList.add("active");
}

window.addEventListener("scroll", () => {
  const headerH = header.offsetHeight + 20;
  let current = "";

  sections.forEach(sec => {
    const top = sec.offsetTop - headerH;
    const bottom = top + sec.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      current = "#" + sec.id;
    }
  });

  if (current) setActiveNav(current);
});

/* ============================================================
   3) Lightbox / Preview Gambar
   ============================================================ */
// Create lightbox container
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
lightbox.className = "lightbox";
lightbox.innerHTML = `<img id="lightbox-img" src="" alt="preview">`;
document.body.appendChild(lightbox);

const lightboxImg = document.getElementById("lightbox-img");

// Buat semua IMG bisa diklik
document.querySelectorAll("img").forEach(img => {
  img.style.cursor = "zoom-in";
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.classList.add("show");
  });
});

// Tutup lightbox saat klik area gelap
lightbox.addEventListener("click", () => {
  lightbox.classList.remove("show");
  lightboxImg.src = "";
});
