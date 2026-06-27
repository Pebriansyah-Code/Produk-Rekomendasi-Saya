// ===========================
// VARIABEL GLOBAL
// ===========================
let activeCategory = 'semua';

// ===========================
// FUNGSI CARI PRODUK
// ===========================
function searchProduct() {
  let keyword = document.getElementById('searchInput').value.toLowerCase().trim();
  let cards = document.querySelectorAll('.product-card');
  let visibleCount = 0;

  cards.forEach(function(card) {
    let title = card.querySelector('.product-title').innerText.toLowerCase();
    let desc = card.querySelector('.product-desc').innerText.toLowerCase();
    let category = card.getAttribute('data-category');

    // Cek cocok dengan pencarian
    let matchSearch = title.includes(keyword) || desc.includes(keyword);

    // Cek cocok dengan kategori aktif
    let matchCategory = (activeCategory === 'semua') || (category === activeCategory);

    if (matchSearch && matchCategory) {
      card.style.display = 'flex';
      // Animasi muncul
      card.style.opacity = '0';
      card.style.transform = 'translateY(6px)';
      setTimeout(function() {
        card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 10);
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // Update jumlah produk yang ditampilkan
  updateProductCount(visibleCount);

  // Tampilkan pesan kosong jika tidak ada hasil
  let emptyState = document.getElementById('emptyState');
  if (visibleCount === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }
}

// ===========================
// FUNGSI FILTER KATEGORI
// ===========================
function filterCategory(btn, category) {
  // Update kategori aktif
  activeCategory = category;

  // Update tampilan tombol aktif
  document.querySelectorAll('.cat-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  // Jalankan ulang pencarian dengan kategori baru
  searchProduct();
}

// ===========================
// FUNGSI TOGGLE MENU KATEGORI
// ===========================
function toggleCategory() {
  let bar = document.getElementById('categoryBar');
  bar.classList.toggle('open');
}

// ===========================
// UPDATE JUMLAH PRODUK
// ===========================
function updateProductCount(count) {
  let el = document.getElementById('productCount');
  if (count === 0) {
    el.textContent = 'Tidak ada produk yang cocok';
  } else if (count === 1) {
    el.textContent = 'Menampilkan 1 produk';
  } else {
    el.textContent = 'Menampilkan ' + count + ' produk';
  }
}

// ===========================
// INISIALISASI SAAT HALAMAN DIBUKA
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  let total = document.querySelectorAll('.product-card').length;
  updateProductCount(total);

  // Animasi kartu produk saat pertama dibuka
  let cards = document.querySelectorAll('.product-card');
  cards.forEach(function(card, index) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    setTimeout(function() {
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.2s, transform 0.2s';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 80);
  });
});