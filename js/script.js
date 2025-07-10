// script.js - Preloader, glitch, typewriter, menu, sidebar, scroll, etc.
window.addEventListener('DOMContentLoaded', function() {
  // Preloader
  setTimeout(function() {
    var preloader = document.querySelector('.preloader');
    if (preloader) preloader.style.opacity = 0;
    setTimeout(function() {
      var preloader2 = document.querySelector('.preloader');
      if (preloader2) preloader2.style.display = 'none';
    }, 500);
  }, 1200);

  // Eğer preloader 2 saniye sonra hâlâ görünüyorsa zorla gizle
  setTimeout(function() {
    var pre = document.querySelector('.preloader');
    if (pre && pre.style.display !== 'none') {
      pre.style.opacity = 0;
      pre.style.display = 'none';
    }
  }, 2000);

  // Ana kapsayıcıları görünür yap (gizli kalmışsa)
  window.addEventListener('DOMContentLoaded', function() {
    var cont = document.querySelector('.container');
    if (cont) cont.style.display = '';
    var wrap = document.querySelector('.wrapper');
    if (wrap) wrap.style.display = '';
  });

  // Döngüsel alt başlıklar (subtitle)
  var subtitles = [
    'Red Teamer',
    'Offensive Security Consultant',
    'BF V Player',
    'Cyber Security Consultant',
    'BF V Europe Server Admin',
    'Vulnerability Management',
    'I use Arch btw :D'
  ];
  var subtitleEl = document.querySelector('.h-subtitle');
  if(subtitleEl) {
    let idx = 0;
    function showSubtitle(i) {
      subtitleEl.style.opacity = 0.2;
      setTimeout(function() {
        subtitleEl.textContent = subtitles[i];
        subtitleEl.style.opacity = 0.7;
      }, 250);
    }
    showSubtitle(idx);
    setInterval(function() {
      idx = (idx + 1) % subtitles.length;
      showSubtitle(idx);
    }, 2200);
  }

  // Menu button (for mobile)
  const menuBtn = document.querySelector('.menu-btn');
  if(menuBtn) {
    menuBtn.addEventListener('click', function(e) {
      e.preventDefault();
      menuBtn.classList.toggle('open');
      var topMenu = document.querySelector('.top-menu');
      if (topMenu) topMenu.classList.toggle('open');
    });
  }

  // CSS testi: style.css yüklenmezse uyarı göster
  var testDiv = document.createElement('div');
  testDiv.style.display = 'none';
  testDiv.className = 'css-test-div';
  document.body.appendChild(testDiv);
  setTimeout(function() {
    var comp = window.getComputedStyle(testDiv);
    // Eğer style.css yüklüyse bu div görünmez olur, yüklenmediyse görünür olur
    if (comp.display !== 'none') {
      var warn = document.createElement('div');
      warn.style.position = 'fixed';
      warn.style.top = '0';
      warn.style.left = '0';
      warn.style.width = '100vw';
      warn.style.background = 'red';
      warn.style.color = 'white';
      warn.style.fontSize = '2rem';
      warn.style.zIndex = '9999';
      warn.style.textAlign = 'center';
      warn.textContent = 'style.css YÜKLENEMİYOR! Dosya eksik veya yanlış yerde.';
      document.body.appendChild(warn);
    }
    document.body.removeChild(testDiv);
  }, 500);

  // Blog search filter
  const blogSearch = document.getElementById('blog-search');
  if(blogSearch) {
    blogSearch.addEventListener('input', function() {
      const q = blogSearch.value.trim().toLowerCase();
      const rows = document.querySelectorAll('.blog-table tbody tr');
      rows.forEach(row => {
        const title = row.children[1].textContent.toLowerCase();
        const desc = row.children[2].textContent.toLowerCase();
        if(title.includes(q) || desc.includes(q)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }
});

// Global error handler for debugging
window.addEventListener('error', function(event) {
  console.error('Script error:', event.message, 'at', event.filename + ':' + event.lineno);
});