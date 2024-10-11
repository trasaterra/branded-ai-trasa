document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelector(".content-wrapper"),t=document.querySelector(".answer-logo-wrapper"),n=document.getElementById("text-input"),o=e.innerHTML;function a(){var e;document.querySelectorAll(".prompt-link").forEach((function(e){e.addEventListener("mouseover",(function(){e.classList.add("spin-animation")})),e.addEventListener("animationend",(function(){e.classList.remove("spin-animation")})),e.addEventListener("click",(function(t){t.preventDefault(),r(e.textContent.trim())}))})),e=".prompt-link",document.querySelectorAll(e).forEach((e=>{const t=e.innerHTML.split(" ");t.length>1&&(t[t.length-2]+="&nbsp;"+t.pop(),e.innerHTML=t.join(" "))}))}function s(n){e.innerHTML='\n      <div class="answer-bg"></div>\n      <div class="answer-window">\n        <div id="answerCarousel" class="carousel slide" data-bs-ride="false">\n          <div class="carousel-indicators"></div>\n          <div class="carousel-inner"></div>\n          <button class="carousel-control-prev" type="button" data-bs-target="#answerCarousel" data-bs-slide="prev">\n            <span class="carousel-control-prev-icon" aria-hidden="true"></span>\n            <span class="visually-hidden">Previous</span>\n          </button>\n          <button class="carousel-control-next" type="button" data-bs-target="#answerCarousel" data-bs-slide="next">\n            <span class="carousel-control-next-icon" aria-hidden="true"></span>\n            <span class="visually-hidden">Next</span>\n          </button>\n        </div>\n      </div>\n    ',t&&(t.style.display="block"),function(e){const t=document.querySelector("#answerCarousel .carousel-inner"),n=document.querySelector(".carousel-indicators"),o=document.querySelector(".carousel-control-prev"),a=document.querySelector(".carousel-control-next");if(t.innerHTML="",n.innerHTML="",!e.length)return void console.warn("No answers provided to populate the carousel.");e.forEach(((e,o)=>{const a=document.createElement("div");a.className="carousel-item"+(0===o?" active":"");const s=document.createElement("div");s.className="d-block w-100 p-4",s.innerHTML=`\n        <div class="parent-container">\n          <div class="container answer-vertical">\n            <p>${e}</p>\n          </div>\n        </div>`,a.appendChild(s),t.appendChild(a);const r=document.createElement("button");r.type="button",r.setAttribute("data-bs-target","#answerCarousel"),r.setAttribute("data-bs-slide-to",o),r.setAttribute("aria-label",`Slide ${o+1}`),r.innerHTML=`<span class="indicator-number">${o+1}</span>`,0===o&&(r.classList.add("active"),r.setAttribute("aria-current","true")),n.appendChild(r)}));const s=e.length>1;o.style.display=s?"block":"none",a.style.display=s?"block":"none",n.style.display=s?"block":"none"}(n),function(){const e=["https://trasaterra.com/wp-content/uploads/2024/07/2023-Portfolio-SMG_21-scaled.jpg","https://trasaterra.com/wp-content/uploads/2023/04/TT-2021-thumbnails-SJS.jpg","https://trasaterra.com/wp-content/uploads/2023/05/2023-Portfolio-Soapbox_09-scaled.jpg","https://trasaterra.com/wp-content/uploads/2023/03/MIRAS-thumbnail-1.jpg","https://trasaterra.com/wp-content/uploads/2023/02/newsgathering-and-reporting-3-scaled.jpg","https://trasaterra.com/wp-content/uploads/2023/02/fundamentals-of-journalism-3-scaled.jpg","https://trasaterra.com/wp-content/uploads/2019/02/2019-Portfolio-AMP_07-scaled.jpg","https://trasaterra.com/wp-content/uploads/2021/01/CHP-thumbnail3.jpg"],t=document.querySelector(".answer-window");if(!t)return void console.error("The .answer-window element was not found.");const n=Math.floor(Math.random()*e.length),o=e[n];console.log("Randomly selected image:",o);const a=new Image;a.src=o;const s=getComputedStyle(t).getPropertyValue("--new-background");t.style.setProperty("--previous-background",s),t.classList.add("fade-out"),a.onload=function(){t.style.setProperty("--new-background",`url(${o})`),t.classList.add("fade-in"),t.classList.remove("fade-out"),console.log("Background image applied successfully:",o)},a.onerror=function(){console.error("Failed to load image:",o)}}()}function r(e){const t=e||n.value.trim();if(!t)return;s(t.split(/(?<=[.!?])\s+/).map((e=>e.trim())).filter((e=>e.length>0)))}t&&(t.style.display="none"),document.querySelector(".upload-btn").addEventListener("click",(()=>r())),n.addEventListener("keydown",(function(e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),r())})),document.addEventListener("keydown",(function(s){"Escape"===s.key&&(e.innerHTML=o,n.value="",a(),t&&(t.style.display="none"))})),n.addEventListener("input",(function(){this.style.height="auto",this.style.height=`${this.scrollHeight}px`})),a()}));