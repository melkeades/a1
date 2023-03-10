import './styles/style.styl'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
// import CSSRulePlugin from 'gsapsplit-type/CSSRulePlugin'
// import CustomEase from 'gsap/CustomEase'
// import ScrollToPlugin from 'gsap/ScrollToPlugin '
import ScrollTrigger from 'gsap/ScrollTrigger '
import $ from 'jquery'
import SplitType from 'split-type'
import Swiper, {
  Navigation,
  Pagination,
  Grid,
  Thumbs,
  Controller,
  EffectFade,
  Autoplay,
} from 'swiper'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'
import './about'

const select = (element) => document.querySelector(element)

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  direction: 'vertical', // vertical, horizontal
  gestureDirection: 'vertical', // vertical, horizontal, both
  smooth: true,
  mouseMultiplier: 1.3,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// why -------------------------Fade
Swiper.use([
  Navigation,
  Pagination,
  Grid,
  Thumbs,
  Controller,
  EffectFade,
  Autoplay,
])

const hero = select('.hero__video')
if (hero) {
  // hero.replaceChildren()
}

const navbar = select('.navbar-wrap')
const navbarStickyClass = 'navbar-wrap--sticky'

ScrollTrigger.create({
  trigger: '.hero',
  start: 'bottom top',
  end: 'bottom 40%',
  onEnter: () => {
    // console.log('s')
    navbar.classList.add(navbarStickyClass)
  },
  onEnterBack: () => {
    // console.log('e')
    navbar.classList.remove(navbarStickyClass)
  },
})

let howSlider
const howSliderInit = () => {
  howSlider = new Swiper('.how__swiper', {
    speed: 600,
    spaceBetween: 40,
    slidesPerView: 1,
    slidesPerGroup: 1,
    pagination: {
      el: '.swiper-pagination',
      // bulletActiveClass: '.how__pagination__bullet--active',
      // bulletClass: '.how__pagination__bullet',
    },
    navigation: {
      nextEl: '.how__rightarrow',
      prevEl: '.how__leftarrow',
    },
  })
}
if (window.innerWidth <= 767) {
  howSliderInit()
}
const slide1 = new Swiper('.why__swiper', {
  speed: 600,
  spaceBetween: 30,
  // observer: true,
  // observeParents: true,
  // slidesPerView: 3, // columns per row

  navigation: {
    nextEl: '.why__rightarrow',
    prevEl: '.why__leftarrow',
  },

  breakpoints: {
    // 240 and up
    240: {
      spaceBetween: 15,
      slidesPerView: 2,
      slidesPerGroup: 2, // columns per swipe
      grid: {
        rows: 2,
      },
    },
    640: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      grid: {
        rows: 1,
      },
      // spaceBetween: 0,
    },
    // 900: {
    //   slidesPerView: 3,
    //   slidesPerGroup: 3,
    // },
  },
})

const resultsLogos = new Swiper('.why__logos', {
  speed: 600,
  breakpoints: {
    240: {
      spaceBetween: 30,
      // slidesPerView: 3,
      slidesPerView: 'auto',
      slidesPerGroup: 1, // columns per swipe
    },
    480: {
      spaceBetween: 40,
      // slidesPerView: 3,
      // slidesPerGroup: 2, // columns per swipe
      slidesPerView: 'auto',
    },
    768: {
      spaceBetween: 60,
      // slidesPerView: 6,
      // slidesPerView: 'auto',
      // slidesPerGroup: 3, // columns per swipe
    },
  },
})

const resultsInfo = new Swiper('.results__info', {
  speed: 400,
  spaceBetween: 60,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
})

const resultsImg = new Swiper('.results__img', {
  speed: 600,
  spaceBetween: 20,
  slidesPerView: 1,
  thumbs: {
    swiper: resultsLogos,
  },
  navigation: {
    nextEl: '.results__rightarrow',
    prevEl: '.results__leftarrow',
  },
  autoplay: {
    delay: 5000,
  },
})

resultsImg.controller.control = resultsInfo
resultsInfo.controller.control = resultsImg

const testQuote = new Swiper('.testimonials__quote', {
  speed: 600,
  spaceBetween: 20,
  slidesPerView: 1,
  navigation: {
    nextEl: '.testimonials__rightarrow',
    prevEl: '.testimonials__leftarrow',
  },
  autoplay: {
    delay: 5000,
  },
})

const testName = new Swiper('.testimonials__name', {
  speed: 600,
  effect: 'fade',
  allowTouchMove: false,
  fadeEffect: {
    crossFade: true,
  },
  slidesPerView: 1,
})

const testLogoClass = 'testimonials__logo'
const testLogos = document.querySelectorAll('.' + testLogoClass)
const testLogoActiveClass = testLogoClass + '--active'

testQuote.controller.control = testName
testQuote.on('slideChange', () => {
  console.log('slide changed to' + testQuote.activeIndex)
  testLogos.forEach((f) => f.classList.remove(testLogoActiveClass))
  testLogos[testQuote.activeIndex].classList.toggle(testLogoActiveClass)
})

testLogos.forEach((logo) => {
  logo.addEventListener('click', (e) => {
    const target = e.currentTarget // bubble outside of svg Gs innards to div
    if (target.nodeName === 'DIV') {
      // just to be sure ^^
      const index = Array.from(target.parentNode.children).indexOf(target)
      testQuote.slideTo(index)
    }
  })
})

const howMq = window.matchMedia('(max-width: 767px)')
const mql = window.matchMedia('(max-width: 640px)')

howMq.onchange = (e) => {
  if (e.matches) {
    // 767 or less
    howSliderInit()
  } else {
    // more than 767
    howSlider.destroy()
  }
}
mql.onchange = () => {
  slide1.update()
}
console.log('loaded test')

// faq -------------------------------------------
$('.accordion__title').on('click', function () {
  $(this).children('.accordion__arrow').toggleClass('rotate')
  $('.accordion__arrow')
    .not($(this).children('.accordion__arrow'))
    .removeClass('rotate')
  $(this).next().slideToggle(800)
  $('.accordion__text').not($(this).next()).slideUp('fast')

  // $(this).offset().top-"distance from top"}, "scroll speed");}, "animation delay depending on inner content length");
  setTimeout(() => {
    $('html').animate({ scrollTop: $(this).offset().top - 180 }, 800)
  }, 400)
})
