// main.js — minimal interactions with comments
const toggleBtn = document.querySelector('.mobile-toggle');
const menu = document.querySelector('.menu');
if (toggleBtn && menu) {
  toggleBtn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });
}
document.querySelectorAll('.switcher .btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.switcher .btn').forEach(b => b.classList.remove('primary'));
    btn.classList.add('primary');
  });
});
const faqAcc = document.querySelectorAll('.accordions details');
faqAcc.forEach(d => {
  d.addEventListener('toggle', () => {
    if (d.open) faqAcc.forEach(other => { if (other !== d) other.open = false; });
  });
});
