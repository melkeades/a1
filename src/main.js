import './styles/style.styl'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
// import ScrollToPlugin from 'gsap/ScrollToPlugin '
import ScrollTrigger from 'gsap/ScrollTrigger '
import $ from 'jquery'
import Swiper, {
  Navigation,
  Pagination,
  Grid,
  Thumbs,
  Controller,
  EffectFade,
  Autoplay,
  Scrollbar,
  FreeMode,
} from 'swiper'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

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

gsap.registerPlugin(ScrollTrigger)

Swiper.use([
  Navigation,
  Pagination,
  Grid,
  Thumbs,
  Controller,
  EffectFade,
  Autoplay,
  Scrollbar,
  FreeMode,
])

//
// HOME ----------------------------
//

const hero = select('.hero__video')
if (hero) {
  // remove video
  // hero.replaceChildren()
}

const navbar = select('.navbar-wrap')
const navbarStickyClass = 'navbar-wrap--sticky'

ScrollTrigger.create({
  trigger: '.hero',
  start: 'bottom top',
  end: 'bottom 40%',
  onEnter: () => {
    navbar.classList.add(navbarStickyClass)
  },
  onEnterBack: () => {
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
    },
    navigation: {
      nextEl: '.how__rightarrow',
      prevEl: '.how__leftarrow',
    },
  })
}
let whySlider
const whySliderInit = () => {
  whySlider = new Swiper('.why__swiper', {
    speed: 600,
    spaceBetween: 30,
    slidesPerView: 1, // columns
    slidesPerGroup: 2, // columns per swipe
    grid: {
      rows: 2,
    },
    breakpoints: {
      240: {
        pagination: {
          el: '.why__bullets',
          bulletActiveClass: 'pagination__bullet--active',
          bulletClass: 'pagination__bullet',
        },
      },
      768: {
        pagination: {
          enabled: false,
        },
      },
    },
  })
}

if (window.innerWidth <= 767) {
  howSliderInit()
  whySliderInit()
}
const resultsLogos = new Swiper('.why__logos', {
  speed: 600,
  breakpoints: {
    240: {
      spaceBetween: 30,
      slidesPerView: 'auto',
      slidesPerGroup: 1, // columns per swipe
    },
    480: {
      spaceBetween: 40,
      slidesPerView: 'auto',
    },
    768: {
      spaceBetween: 60,
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
  // console.log('slide changed to' + testQuote.activeIndex)
  testLogos.forEach((f) => f.classList.remove(testLogoActiveClass))
  testLogos[testQuote.activeIndex].classList.toggle(testLogoActiveClass)
})

testLogos.forEach((logo) => {
  logo.addEventListener('click', (e) => {
    const target = e.currentTarget // bubble outside of svg's Gs innards to div
    if (target.nodeName === 'DIV') {
      // just to be sure ^^
      const index = Array.from(target.parentNode.children).indexOf(target)
      testQuote.slideTo(index)
    }
  })
})

const howMq = window.matchMedia('(max-width: 767px)')

howMq.onchange = (e) => {
  if (e.matches) {
    // 767 or less
    howSliderInit()
    whySliderInit()
  } else {
    // more than 767
    howSlider.destroy()
    whySlider.destroy()
  }
}

// faq -------------------------------------------
$('.accordion__title').on('click', function () {
  $(this).children('.accordion__arrow').toggleClass('rotate')
  $(this).next().slideToggle(800)
})

//
// ABOUT ------------------------------------------------------------
//

const imgsToScroll = gsap.utils.toArray('.text-img__img')
const captionsToScroll = gsap.utils.toArray('.text-img__img__caption')

captionsToScroll.forEach((cap) => {
  gsap.to(cap, {
    y: '-250%',
    scrollTrigger: {
      start: 'top bottom',
      end: 'bottom top',
      trigger: cap,
      scrub: true,
    },
  })
})
let mm = gsap.matchMedia()
let imgYmove = '-20%'
mm.add('(max-width: 768px)', () => {
  imgYmove = '0'
})
imgsToScroll.forEach((img) => {
  gsap.to(img, {
    backgroundPositionY: imgYmove,

    scrollTrigger: {
      trigger: img,
      scrub: true,
    },
  })
})

const careerSlider = new Swiper('.my-career__swiper', {
  speed: 600,
  spaceBetween: 0,
  slidesPerView: 'auto',
  freeMode: true,

  navigation: {
    nextEl: '.my-career__rightarrow',
    prevEl: '.my-career__leftarrow',
  },
  scrollbar: {
    el: '.my-career__nav',
    draggable: true,
    snapOnRelease: false,
    dragClass: 'my-career__nav__scrollbar',
  },
})

let aboutBlogSlider
const aboutBlogSliderInit = () => {
  aboutBlogSlider = new Swiper('.about__blog__swiper', {
    speed: 600,
    spaceBetween: 40,
    slidesPerView: 1,
    slidesPerGroup: 1,
    pagination: {
      el: '.blog__pagination',
      bulletActiveClass: 'blog__pagination__bullet--active',
      bulletClass: 'blog__pagination__bullet',
    },
    navigation: {
      nextEl: '.blog__rightarrow',
      prevEl: '.blog__leftarrow',
    },
  })
}

if (window.innerWidth <= 767) {
  aboutBlogSliderInit()
}
const blogMq = window.matchMedia('(max-width: 767px)')

blogMq.onchange = (e) => {
  if (e.matches) {
    // 767 or less
    aboutBlogSliderInit()
  } else {
    // more than 767
    aboutBlogSlider[0].destroy()
  }
}

//
// RESOURCES -------------------------------------------
//
const featuredBlogSlider = new Swiper('.resources-hero__featured', {
  speed: 600,
  slidesPerView: 1,
  slidesPerGroup: 1,
  effect: 'fade',
  pagination: {
    el: '.resources-hero__pagination',
    bulletActiveClass: 'resources-hero__pagination__bullet--active',
    bulletClass: 'resources-hero__pagination__bullet',
  },
  autoplay: {
    delay: 5000,
  },
  fadeEffect: {
    crossFade: true,
  },
})
const blogSlider = new Swiper('.blog__swiper', {
  speed: 600,
  // slidesPerGroup: 1,
  pagination: {
    el: '.blog__pagination',
    bulletActiveClass: 'blog__pagination__bullet--active',
    bulletClass: 'blog__pagination__bullet',
  },
  navigation: {
    nextEl: '.blog__rightarrow',
    prevEl: '.blog__leftarrow',
  },
  breakpoints: {
    240: {
      spaceBetween: 30,
      slidesPerView: 1,
      // slidesPerGroup: 1, // columns per swipe
    },
    768: {
      spaceBetween: 40,
      slidesPerView: 2,
      slidesPerGroup: 2, // columns per swipe
    },
  },
})
const whitePaperSlider = new Swiper('.white-paper__swiper', {
  speed: 600,
  // slidesPerGroup: 1,
  navigation: {
    nextEl: '.white-paper__rightarrow',
    prevEl: '.white-paper__leftarrow',
  },
  breakpoints: {
    240: {
      spaceBetween: 30,
      slidesPerView: 1,
    },
    768: {
      spaceBetween: 40,
      slidesPerView: 2,
      slidesPerGroup: 2, // columns per swipe
    },
    992: {
      spaceBetween: 40,
      slidesPerView: 3,
      slidesPerGroup: 3, // columns per swipe
    },
  },
})

const webinarTitleSlider = new Swiper('.webinars__title__swiper', {
  speed: 600,
  breakpoints: {
    240: {
      direction: 'horizontal',
      spaceBetween: 20,
      slidesPerView: 3,
      slidesPerGroup: 3, // columns per swipe
    },
    768: {
      direction: 'vertical',
      slidesPerView: 5,
    },
  },
})
const webinarItemSlider = new Swiper('.webinars__item__swiper', {
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  speed: 600,
  slidesPerGroup: 1,
  spaceBetween: 20,
  thumbs: {
    swiper: webinarTitleSlider,
  },
  autoplay: {
    delay: 5000,
  },
})

webinarItemSlider.controller.control = webinarTitleSlider
