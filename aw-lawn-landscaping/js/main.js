// Scroll fade-up animations
const fadeEls = document.querySelectorAll('.fade-up');
if(fadeEls.length){
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');}});
  },{threshold:0.12});
  fadeEls.forEach(el=>observer.observe(el));
}

// Counter animation
function animateCounter(el){
  const target=parseInt(el.dataset.target);
  const suffix=el.dataset.suffix||'';
  const dur=1800;
  const step=target/dur*16;
  let cur=0;
  const timer=setInterval(()=>{
    cur=Math.min(cur+step,target);
    el.textContent=Math.floor(cur)+suffix;
    if(cur>=target)clearInterval(timer);
  },16);
}
const counterEls=document.querySelectorAll('[data-target]');
if(counterEls.length){
  const cObs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){animateCounter(e.target);cObs.unobserve(e.target);}});
  },{threshold:0.5});
  counterEls.forEach(el=>cObs.observe(el));
}

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const item=btn.parentElement;
    const isOpen=item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i=>{
      i.classList.remove('open');
      i.querySelector('.faq-answer').style.maxHeight='0';
    });
    if(!isOpen){
      item.classList.add('open');
      item.querySelector('.faq-answer').style.maxHeight=item.querySelector('.faq-answer').scrollHeight+'px';
    }
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const target=document.querySelector(a.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}
  });
});
