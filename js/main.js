// ===== Mobile Nav =====
const toggle = document.querySelector('.mobile-toggle');
const links = document.querySelector('.links');
toggle?.addEventListener('click', ()=> links.classList.toggle('open'));
links?.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> links.classList.remove('open')));

// ===== Year & Progress bar =====
document.getElementById('year').textContent = new Date().getFullYear();
const progress = document.getElementById('progress');
const setProgress = ()=>{
  const max = document.body.scrollHeight - innerHeight;
  const p = Math.max(0, Math.min(1, scrollY / max));
  progress.style.transform = `scaleX(${p})`;
};
addEventListener('scroll', setProgress, {passive:true});
setProgress();

// ===== Theme switch =====
const root = document.documentElement;
const themeBtn = document.querySelector('.theme-switch');
function applyTheme(mode){ root.classList.toggle('light', mode === 'light'); localStorage.setItem('theme', mode); }
applyTheme(localStorage.getItem('theme') || 'dark');
themeBtn?.addEventListener('click', ()=> applyTheme(root.classList.contains('light') ? 'dark' : 'light'));

// ===== Reveal on scroll (variants) =====
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('reveal-in');
      io.unobserve(e.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('[data-reveal]').forEach(el=> io.observe(el));

// ===== Parallax tiles & hero background =====
const tiles = document.querySelectorAll('.tile');
let lastY = scrollY;
function parallax(){
  const y = scrollY;
  tiles.forEach(t => {
    const d = parseFloat(t.dataset.depth || '0.2');
    t.style.transform = `translateY(${y * d * 0.25}px)`;
  });
  // dynamic clip-path for hero shape
  const shape = document.querySelector('.shape-clip');
  const n = Math.min(100, Math.max(0, y / innerHeight * 100));
  shape.style.clipPath = `polygon(0 0, 100% ${20+n/5}%, 100% 100%, 0 100%)`;
  requestAnimationFrame(parallax);
}
requestAnimationFrame(parallax);

// ===== Tilt on cards =====
document.querySelectorAll('.tilt').forEach(card=>{
  let rect;
  function set(e){
    rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - .5;
    const y = (e.clientY - rect.top) / rect.height - .5;
    card.style.setProperty('--ry', `${x * 6}deg`);
    card.style.setProperty('--rx', `${-y * 6}deg`);
  }
  card.addEventListener('mousemove', set);
  card.addEventListener('mouseleave', ()=>{
    card.style.setProperty('--ry', `0deg`);
    card.style.setProperty('--rx', `0deg`);
  });
});

// ===== Stats counter =====
const counters = document.querySelectorAll('.stat .num');
const numsObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count;
    let cur = 0;
    const step = Math.max(1, Math.floor(target/90));
    const tick = () => {
      cur += step;
      if(cur >= target){ el.textContent = target; return; }
      el.textContent = cur;
      requestAnimationFrame(tick);
    };
    tick();
    numsObserver.unobserve(el);
  });
},{threshold:.5});
counters.forEach(el=> numsObserver.observe(el));

// ===== Smooth anchors =====
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',(e)=>{
    const id = a.getAttribute('href');
    if(id.length > 1){
      const target = document.querySelector(id);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }
  });
});

// ===== Magnetic buttons =====
const magnets = document.querySelectorAll('.magnetic');
magnets.forEach(btn=>{
  btn.style.transform = 'translate3d(0,0,0)';
  btn.addEventListener('mousemove', (e)=>{
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width/2) * 0.15;
    const y = (e.clientY - rect.top - rect.height/2) * 0.15;
    btn.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  });
  btn.addEventListener('mouseleave', ()=>{
    btn.style.transform = 'translate3d(0,0,0)';
  });
});
