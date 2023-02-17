import './styles/style.styl'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
// import CSSRulePlugin from 'gsapsplit-type/CSSRulePlugin'
// import CustomEase from 'gsap/CustomEase'
// import ScrollToPlugin from 'gsap/ScrollToPlugin '
import ScrollTrigger from 'gsap/ScrollTrigger '
import $ from 'jquery'
import jQuery from 'jquery'
import SplitType from 'split-type'
import Swiper from 'swiper'
import 'swiper/css'

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

// $('.why').each(function (index) {
//   const swiper = new Swiper($(this).find('.why__slider')[0], {
//     slidesPerView: 3,
//   })
// })

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
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
})(jQuery)

console.log('loaded test')
