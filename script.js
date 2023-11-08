let sideBarOpen=0;
const sidebarClickHandler=()=>{
 const slideBar=document.querySelector('.slide-bar');
 const sideBarIcon=document.querySelector('.sidebar-icon>img');
 const sideBarIconContainer=document.querySelector('.sidebar-icon');
 if(!sideBarOpen){
  slideBar.style="left:0px";
  sideBarIcon.src="./media/sidebar-blue.png";
  sideBarIconContainer.style="border-bottom:2px solid blue";
 }
 else{
  slideBar.style="left:-200px";
  sideBarIcon.src="./media/sidebar-black.png";
  sideBarIconContainer.style="border-bottom-style:hidden";
 }
 sideBarOpen^=1;
}

const items=document.querySelectorAll('.item');
const slideBar=document.querySelector('.slide-bar');
for(item of items){
  slideBar.appendChild(item.cloneNode(true));
}
const arrows=document.querySelectorAll('.slide-bar .item .arrow-down');
for(arrow of arrows){
  arrow.className="arrow arrow-right";
}

const slides=document.querySelectorAll('.slide');
const dots=document.querySelector('.dots');
let index=0;

for(let i=0;i<slides.length;i++){
  const dot=document.createElement('div');
  dot.className='dot';
  dot.setAttribute("index",i);
  dot.addEventListener('click',(event)=>{
    const nextIndex=parseInt(event.target.getAttribute("index"));
    slides[index].style.opacity="0";
    dots.children[index].style.opacity=".5";
    slides[nextIndex].style.opacity="1";
    dots.children[nextIndex].style.opacity=".8";
    index=nextIndex;
  });
  dots.appendChild(dot);
}

const leftHandler=()=>{
  const left=(slides.length+index-1)%slides.length;
  slides[index].style.opacity="0";
  dots.children[index].style.opacity=".5";
  slides[left].style.opacity="1";
  dots.children[left].style.opacity=".8";
  index=left;
}

const rightHandler=()=>{
  const right=(index+1)%slides.length;
  slides[index].style.opacity="0";
  dots.children[index].style.opacity=".5";
  slides[right].style.opacity="1";
  dots.children[right].style.opacity=".8";
  index=right;
}

const autoSlide=setInterval(rightHandler,5000);
const clearAutoSlide=setTimeout(()=>{
  clearInterval(autoSlide);
},25000);

addEventListener('click',(e)=>{
  clearInterval(autoSlide);
  clearTimeout(clearAutoSlide);
})

const logoClickHandler=()=>{
  document.querySelector('.dot').click();
  scroll({
    top:0,
    left:0,
    behavior:"smooth"
  });
}

document.querySelector('.slide-container').style.height=`${window.innerHeight-100}px`;
document.querySelector('body').style.marginTop=`${window.innerHeight}px`;

addEventListener('resize',(e)=>{
  document.querySelector('.slide-container').style.height=`${window.innerHeight-100}px`;
  document.querySelector('body').style.marginTop=`${window.innerHeight}px`;
})

const aboutMeHandler=()=>{
  scroll({
    top:scrollY+document.querySelectorAll('.about-me-container')[0].getBoundingClientRect().top-25,
    behavior:"smooth"
  })
}

