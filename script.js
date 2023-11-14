let sideBarOpen = 0;
const sidebarClickHandler = () => {
  const slideBar = document.querySelector('.slide-bar');
  const sideBarIcon = document.querySelector('.sidebar-icon>img');
  const sideBarIconContainer = document.querySelector('.sidebar-icon');
  if (!sideBarOpen) {
    slideBar.style = "left:0px";
    sideBarIcon.src = "./media/sidebar-blue.png";
    sideBarIconContainer.style = "border-bottom:2px solid blue";
  }
  else {
    slideBar.style = "left:-200px";
    sideBarIcon.src = "./media/sidebar-black.png";
    sideBarIconContainer.style = "border-bottom-style:hidden";
  }
  sideBarOpen ^= 1;
}

const items = document.querySelectorAll('.item');
const slideBar = document.querySelector('.slide-bar');
for (item of items) {
  slideBar.appendChild(item.cloneNode(true));
}
const arrows = document.querySelectorAll('.slide-bar .item .arrow-down');
for (arrow of arrows) {
  arrow.className = "arrow arrow-right";
}

const slides = document.querySelectorAll('.slide');
const dots = document.querySelector('.dots');
let index = 0;

for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement('div');
  dot.className = 'dot';
  dot.setAttribute("index", i);
  dot.addEventListener('click', (event) => {
    const nextIndex = parseInt(event.target.getAttribute("index"));
    slides[index].style.opacity = "0";
    dots.children[index].style.opacity = ".5";
    slides[nextIndex].style.opacity = "1";
    dots.children[nextIndex].style.opacity = ".8";
    index = nextIndex;
  });
  dots.appendChild(dot);
}

const leftHandler = () => {
  const left = (slides.length + index - 1) % slides.length;
  slides[index].style.opacity = "0";
  dots.children[index].style.opacity = ".5";
  slides[left].style.opacity = "1";
  dots.children[left].style.opacity = ".8";
  index = left;
}

const rightHandler = () => {
  const right = (index + 1) % slides.length;
  slides[index].style.opacity = "0";
  dots.children[index].style.opacity = ".5";
  slides[right].style.opacity = "1";
  dots.children[right].style.opacity = ".8";
  index = right;
}

// const autoSlide=setInterval(rightHandler,5000);
// const clearAutoSlide=setTimeout(()=>{
//   clearInterval(autoSlide);
// },25000);

// addEventListener('click',(e)=>{
//   clearInterval(autoSlide);
//   clearTimeout(clearAutoSlide);
// })

const logoClickHandler = () => {
  document.querySelector('.dot').click();
  scroll({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
}

document.querySelector('.slide-container').style.height = `${window.innerHeight - 100}px`;
document.querySelector('body').style.marginTop = `${window.innerHeight}px`;

addEventListener('resize', (e) => {
  document.querySelector('.slide-container').style.height = `${window.innerHeight - 100}px`;
  document.querySelector('body').style.marginTop = `${window.innerHeight}px`;
})

// const shortCutHandler=()=>{
//   scroll({
//     top:scrollY+document.querySelectorAll('.about-me-container')[0].getBoundingClientRect().top-25,
//     behavior:"smooth"
//   })
// }

const slideContainer = document.querySelector('.slide-container');

let touchStartX, touchEndX;

slideContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].pageX;
})

const abs = (a) => {
  if (a < 0)
    return -a;
  return a;
}

slideContainer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].pageX;
  // console.log(`Start: ${touchStartX} End: ${touchEndX}`);
  if (abs(touchStartX - touchEndX) > 25)
    if (touchStartX < touchEndX)
      leftHandler();
    else
      rightHandler();
})

const big_screen_awards = document.querySelector('.big-screen-awards');
const short_screen_awards = document.querySelector('.short-screen-awards');

const dir = [2, 2, -1, 1];

for (let i = 0; i < big_screen_awards.children.length; i += dir[i % 4]) {
  short_screen_awards.appendChild(big_screen_awards.children[i].cloneNode(true));
}

const shortCuts = document.querySelectorAll('.short-cut');
const target = document.querySelectorAll('.target');
// console.log(shortCuts);
// console.log(target);

const arr = [0, 10, 11, 14, 15, 18, -1, -1, -1, 0, 1, 2, 4, 6, 8];

for (let i = 0; i < arr.length; i++) {
  if (arr[i] != -1)
    shortCuts[i].addEventListener('click', (e) => {
      if (!e.target.hasAttribute('executed')) {
        e.target.setAttribute('executed',true);
        scroll({
          top: scrollY + target[arr[i]].getBoundingClientRect().top - 25,
          behavior: "smooth"
        })
      }
    })
}

document.querySelector('body').addEventListener('click',(e)=>{
  if(e.target.hasAttribute('executed')){
    e.target.removeAttribute('executed');
  }
})

