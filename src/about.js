import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
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

// ABOUT ------------------------------------------------------------

const imgsToScroll = gsap.utils.toArray('.text-img__img')
const captionsToScroll = gsap.utils.toArray('.text-img__img__caption')
// console.log(imgsToScroll)

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
  console.log('ini')
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

// RESOURCES -------------------------------------------
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
      // slidesPerGroup: 1, // columns per swipe
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
  // direction: 'vertical',
  // slidesPerView: 5,
  // slidesPerGroup: 1,
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
// webinarTitleSlider.controller.control = webinarItemSlider

// BLOG ITEM ------------------
