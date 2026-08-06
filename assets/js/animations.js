function animationHandler(){
const slideContainers = document.querySelectorAll(".slide-container");
const fadeIn = document.querySelectorAll(".fade-in");
const increaseHeight = document.querySelectorAll(".increase-height");
const increaseWidth = document.querySelectorAll(".increase-width");
const counters = document.querySelectorAll(".counter");

const slideUpAnimation = () => {
  slideContainers.forEach((slideContainer) => {
    if (window.innerHeight - slideContainer.getBoundingClientRect().top >= 0)
      slideContainer.children[0].classList.remove("translate-y-full");
  });
};

const fadeInAnimation = () => {
  fadeIn.forEach((el) => {
    if (window.innerHeight - el.getBoundingClientRect().top >= 0)
      el.classList.remove("fade-in");
  });
};

const increaseHeightAnimation = () => {
  increaseHeight.forEach((el) => {
    if (window.innerHeight - el.getBoundingClientRect().top >= 0) {
      //el.classList.remove("increase-height");
      el.children[0].setAttribute("style", `height:${el.offsetHeight}px`);
    }
  });
};

const increaseWidthAnimation = () => {
  increaseWidth.forEach((el) => {
    if (window.innerHeight - el.getBoundingClientRect().top >= 0) {
      el.classList.remove("increase-width");
      el.classList.add("w-full");
    }
  });
};

const counterAnimation = () => {
  counters.forEach((counter) => {
    if (window.innerHeight - counter.getBoundingClientRect().top >= 0) {
      counter.children[1].classList.remove("top-0");
      counter.children[1].classList.add("-top-full");
    }
  });
};

//Text graient animation
const textGradients = document.querySelectorAll(".text-gradient");
const textGradientAnimation = () => {
  textGradients.forEach((el) => {
    if (window.innerHeight - el.getBoundingClientRect().top >= 0) {
      if (
        window.innerHeight - el.getBoundingClientRect().top <
        el.clientHeight / 2
      ) {
        document.documentElement.style.setProperty("--percentage", `0%`);
      } else {
        const percentage =
          (window.innerHeight -
            el.getBoundingClientRect().top -
            el.clientHeight / 2) /
          3;
        if (percentage > 100)
          document.documentElement.style.setProperty("--percentage", `100%`);
        else
          document.documentElement.style.setProperty(
            "--percentage",
            `${percentage}%`
          );
      }
    }
  });
};

window.addEventListener("scroll", (e) => {
  slideUpAnimation();
  fadeInAnimation();
  increaseHeightAnimation();
  increaseWidthAnimation();
  counterAnimation();
  textGradientAnimation();
});

window.addEventListener("resize", increaseHeight);

//Horizontal scroller
const scrollers = document.querySelectorAll(".scroller");
const infiniteScrollAnimation = () => {
  scrollers.forEach((scroller) => {
    const scrollerInner = scroller.querySelector(".scroller-inner");
    const scrollerContent = Array.from(scrollerInner.children);
    scrollerContent.forEach((el) => {
      const duplicatedItem = el.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
};

slideUpAnimation();
fadeInAnimation();
increaseHeightAnimation();
increaseWidthAnimation();
infiniteScrollAnimation();
counterAnimation();
textGradientAnimation();
}

export default function animations() {
  animationHandler();
}
