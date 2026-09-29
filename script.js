/* ============================================================
   Cyril.dev — Portfolio scripts (vanilla JS, no framework)
   ============================================================ */

// ---------- Particle canvas background ----------
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let raf;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 1.4 + 0.6,
    });
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(16, 185, 129, 0.65)';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.12 - dist / 1300})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  };
  draw();
})();

// ---------- Typewriter ----------
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const phrases = [
    'python manage.py runserver 0.0.0.0:8000',
    'System check identified no issues.',
    'Django version 5.0, using settings "config.settings"',
    'Development server is running at http://127.0.0.1:8000/',
  ];
  let phrase = 0, char = 0, deleting = false;

  const tick = () => {
    const cur = phrases[phrase];
    if (deleting) {
      char--;
      el.textContent = cur.substring(0, char);
      if (char === 0) {
        deleting = false;
        phrase = (phrase + 1) % phrases.length;
        setTimeout(tick, 500);
        return;
      }
      setTimeout(tick, 28);
    } else {
      char++;
      el.textContent = cur.substring(0, char);
      if (char === cur.length) {
        deleting = true;
        setTimeout(tick, 2200);
        return;
      }
      setTimeout(tick, 55);
    }
  };
  setTimeout(tick, 600);
})();

// ---------- Scroll reveal ----------
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.12 }
  );
  els.forEach((el) => observer.observe(el));
})();

// ---------- Mobile menu ----------
(function initMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-mobile');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      menu.classList.remove('open');
    })
  );
})();

// ---------- Project modal ----------
const modalData = {
  jewels: {
    title: 'Honey Jewels — Architecture',
    body: `<p><strong>Product Catalog:</strong> Designed a relational product-category schema in Django with dynamic filtering using query parameters — lets users browse by material, price, and collection in real time.</p>
           <p><strong>Cart State:</strong> Session-based cart that persists across page refreshes without requiring account creation, lowering friction for first-time buyers.</p>
           <p><strong>WhatsApp Checkout:</strong> On order submit, the backend formats a WhatsApp deep-link prefilled with the cart summary and sends the customer directly to the owner's chat — zero payment gateway needed.</p>`,
  },
  amazon: {
    title: 'Amazon Clone — Architecture',
    body: `<p><strong>Database Schema:</strong> Normalized tables for Users, Products, Categories, Orders, and Items built with PostgreSQL and Django ORM.</p>
           <p><strong>Query Optimization:</strong> Used <code>select_related</code> and <code>prefetch_related</code> throughout list and detail views to eliminate N+1 bottlenecks.</p>
           <p><strong>Security:</strong> CSRF protection, environment-variable secrets via <code>python-dotenv</code>, dynamic password hashing, and server-side checkout validation.</p>`,
  },
  flora: {
    title: 'Flora Bloom — In Progress',
    body: `<p><strong>Goal:</strong> A responsive houseplant-store frontend focused on modern CSS layout techniques and vanilla JS interactivity — no framework dependencies.</p>
           <p><strong>Features planned:</strong> Category filtering with animated transitions, a product grid with hover details, a hero carousel, and a favourites sidebar powered by localStorage.</p>
           <p><strong>Status:</strong> Core layout and hero section complete; category filter and product grid are actively being built.</p>`,
  },
};

(function initModal() {
  const modal = document.getElementById('modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');

  const open = (key) => {
    if (!modalData[key]) return;
    title.textContent = modalData[key].title;
    body.innerHTML = modalData[key].body;
    modal.classList.add('open');
  };
  const close = () => modal.classList.remove('open');

  document.querySelectorAll('[data-modal]').forEach((btn) =>
    btn.addEventListener('click', () => open(btn.dataset.modal))
  );
  document.getElementById('modal-close-x').addEventListener('click', close);
  document.getElementById('modal-close-btn').addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
})();

// ---------- Contact form ----------
(function initForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();
    success.classList.add('show');
    setTimeout(() => success.classList.remove('show'), 5000);
  });
})();