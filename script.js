const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close-modal");

// Klik gambar untuk perbesar
document.querySelectorAll('.clickable img').forEach(img => {
  img.onclick = function() {
    modal.style.display = "flex";
    modalImg.src = this.src;
  }
});

// Tutup modal
closeBtn.onclick = function() { modal.style.display = "none"; }
modal.onclick = function(e) { if (e.target !== modalImg) modal.style.display = "none"; }
