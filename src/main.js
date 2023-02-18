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
} from 'swiper'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

// import 'swiper/css/pagination'

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
Swiper.use([Navigation, Pagination, Grid, Thumbs, Controller, EffectFade])

let howSlider
const howSliderInit = () => {
  howSlider = new Swiper('.how__swiper', {
    speed: 600,
    spaceBetween: 40,
    slidesPerView: 1,
    slidesPerGroup: 1,
    navigation: {
      nextEl: '.how__leftarrow',
      prevEl: '.how__rightarrow',
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
    nextEl: '.why__leftarrow',
    prevEl: '.why__rightarrow',
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
  spaceBetween: 60,
  slidesPerView: 'auto',
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
    nextEl: '.results__leftarrow',
    prevEl: '.results__rightarrow',
  },
})
resultsImg.controller.control = resultsInfo
resultsInfo.controller.control = resultsImg

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
;(function ($) {
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
})($)
