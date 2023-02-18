import './styles/style.styl'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
// import CSSRulePlugin from 'gsapsplit-type/CSSRulePlugin'
// import CustomEase from 'gsap/CustomEase'
// import ScrollToPlugin from 'gsap/ScrollToPlugin '
import ScrollTrigger from 'gsap/ScrollTrigger '
import $ from 'jquery'
import SplitType from 'split-type'
import Swiper, { Navigation, Pagination, Grid } from 'swiper'
import 'swiper/css'
import 'swiper/css/grid'
// import 'swiper/css/navigation'
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

// why -------------------------
Swiper.use([Navigation, Pagination, Grid])

let howSlider = new Swiper('.g1X', {
  spaceBetween: 40,

  slidesPerView: 1,
  slidesPerGroup: 1,
  navigation: {
    nextEl: '.how__leftarrow',
    prevEl: '.how__rightarrow',
  },
})
const slide1 = new Swiper('.why__swiper', {
  speed: 800,
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

const howMq = window.matchMedia('(max-width: 767px)')
const mql = window.matchMedia('(max-width: 640px)')

howMq.onchange = (e) => {
  if (e.matches) {
    // 767 or less
    // wrap()
  } else {
    // more than 767
    // unwrap()
  }
}
mql.onchange = () => {
  slide1.update()
}
console.log('loaded test')

function wrap(element) {
  // const element = Array.prototype.shift(arguments)
  const wrappingElement = document.querySelector(element)
  let wrapperTag = 'div',
    wrapperAttributes = { data: {} }

  const parsString = (string) => {
    const symbol = string.charAt(0)
    const value = string.slice(1)

    if (symbol === '#') {
      wrapperAttributes.id = value
    } else if (symbol === '.') {
      wrapperAttributes.class = value
    } else if (symbol === '<') {
      wrapperTag = value
    }
  }

  for (let i = 1; i <= arguments.length; i++) {
    if (typeof arguments[i] === 'string' || arguments[i] instanceof String) {
      parsString(arguments[i])
    } else if (
      typeof arguments[i] === 'object' &&
      !Array.isArray(arguments[i]) &&
      arguments[i] !== null
    ) {
      for (const newProperty in arguments[i]) {
        wrapperAttributes.data['data-' + newProperty] =
          arguments[i][newProperty]
      }
    }
  }

  const wrapperContainer = document.createElement(wrapperTag)

  if (wrapperAttributes.id) {
    wrapperContainer.setAttribute('id', wrapperAttributes.id)
  }
  if (wrapperAttributes.class) {
    wrapperContainer.setAttribute('class', wrapperAttributes.class)
  }
  for (const attribute in wrapperAttributes.data) {
    wrapperContainer.setAttribute(attribute, wrapperAttributes.data[attribute])
  }
  wrappingElement.replaceWith(wrapperContainer)
  wrapperContainer.appendChild(wrappingElement)
}
