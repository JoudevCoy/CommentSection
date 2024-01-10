
let comAction = document.getElementById("comment-action"),
  comSection = document.querySelector(".comment-section"),
  overlay = document.querySelector(".overlay:has(~ .comment-section)");

//             [num >][num <]
const calcPer = (num1, num2) => {
  let calc = num2 - num1;
  let percent = (calc / num1);
  return -percent;
}
// console.log(calcPer(100, 50));
var onDrag = false,
  comSectionTop = Number([comSection.style.top.slice(0, comSection.style.top.length - 2)]),
  dragCount = calcPer(Math.floor(window.innerHeight), Math.floor(comSectionTop));



comAction.addEventListener("touchstart", (event) => {
  onDrag = false;
  comAction.style.background = "#f0f0f0";
});

comAction.addEventListener("touchmove", (event) => {
  event.preventDefault();
  comSectionTop = Number([comSection.style.top.slice(0, comSection.style.top.length - 2)]);
  var { clientY } = event.touches[0];
  dragCount = calcPer(Math.floor(window.innerHeight), Math.floor(comSectionTop));
  onDrag = true;
  if (comSectionTop > -1){
    gsap.to(overlay, {opacity: dragCount, duration: 0});
    gsap.to(comSection, { top: Math.floor(clientY), height: `${window.innerHeight - comSectionTop}px`, duration: 0});
  }
});

comAction.addEventListener("touchend", (event) => {
  onDrag = false;
  comAction.style.background = "var(--white-color)";
  console.log(comSectionTop, dragCount);
  if (comSectionTop > window.innerHeight/1.5){
    gsap.to(overlay, {opacity: 0, duration: .5});
    gsap.to(comSection, { top: "100%", height: 0, duration: .5});
    overlay.style.pointerEvents = "none";
  } else if (comSectionTop > window.innerHeight/3.5){
    gsap.to(overlay, {opacity: dragCount, duration: .5});
    gsap.to(comSection, { top: window.innerHeight/2, height: window.innerHeight/2, duration: .5});
  } else {
    gsap.to(comSection, { top: 0, height: "100%", duration: .5});
    gsap.to(overlay, { opacity: 1, duration: .5});
  }
  if (comSectionTop < 1){
    gsap.to(comSection, { top: 0, height: window.innerHeight, duration: .5});
    gsap.to(overlay, { opacity: 1, duration: .5});
  }
});

// Close comment
overlay.onclick = function(e){
  e.preventDefault();
  
  gsap.to(overlay, { opacity: 0, duration: .5});
  gsap.to(comSection, { top: "100%", height: 0, duration: .5});
  overlay.style.pointerEvents = "none";
}

// Show Comment
document.getElementById("showCommentBtn").onclick = function(){
  gsap.to(overlay, { opacity: 1, duration: .5});
  gsap.to(comSection, { top: 0, height: window.innerHeight, duration: .5});
  overlay.style.pointerEvents = "auto";
}

let commentWrap = document.querySelector(".comment-wrap"),
  commentBox = document.querySelector(".comment-wrap .comment"),
  box = document.querySelector(".box");
commentWrap.addEventListener("scroll", function(e){
  comBoxRect = commentBox.getBoundingClientRect();
  // console.log(comBoxRect.top);
  gsap.to(box, {top: comBoxRect.top, duration: 0});
})