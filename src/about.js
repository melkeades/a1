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
// const blogSlider = new Swiper('.blog__swiper', {
//   // speed: 600,
//   // spaceBetween: 0,
//   // slidesPerView: 'auto',
//   // freeMode: true,
//   // navigation: {
//   //   nextEl: '.my-career__rightarrow',
//   //   prevEl: '.my-career__leftarrow',
//   // },
//   // scrollbar: {
//   //   el: '.my-career__nav',
//   //   draggable: true,
//   //   snapOnRelease: false,
//   //   dragClass: 'my-career__nav__scrollbar',
//   // },
// })
let blogSlider
const blogSliderInit = () => {
  blogSlider = new Swiper('.blog__swiper', {
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
      nextEl: '.blog__rightarrow',
      prevEl: '.blog__leftarrow',
    },
  })
}

if (window.innerWidth <= 767) {
  blogSliderInit()
}
const blogMq = window.matchMedia('(max-width: 767px)')

blogMq.onchange = (e) => {
  if (e.matches) {
    // 767 or less
    blogSliderInit()
  } else {
    // more than 767
    blogSliderInit()
  }
}
