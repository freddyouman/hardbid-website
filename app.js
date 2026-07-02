(function(){
  "use strict";
  var header=document.getElementById('header');
  var toggle=document.querySelector('.nav-toggle');
  var nav=document.querySelector('.main-nav');

  // Sticky header
  function onScroll(){
    if(window.scrollY>20){header.classList.add('scrolled');}
    else{header.classList.remove('scrolled');}
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  // Mobile nav
  if(toggle){
    toggle.addEventListener('click',function(){
      var open=nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded',open?'true':'false');
    });
  }
  if(nav){
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){nav.classList.remove('open');toggle&&toggle.setAttribute('aria-expanded','false');});
    });
  }

  // Scroll reveal
  var revealEls=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
      });
    },{threshold:0.12,rootMargin:'0px 0px -50px 0px'});
    revealEls.forEach(function(el){io.observe(el);});
  }
})();