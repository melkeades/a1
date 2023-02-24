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
imgsToScroll.forEach((img) => {
  // const caption = img.getElementsByClassName('text-img__img__caption')

  // if (caption) {
  //   console.log(caption)
  //   gsap.to(caption, {
  //     y: '-120%',
  //     opacity: 0,
  //     scrollTrigger: {
  //       trigger: img,
  //       scrub: true,
  //     },
  //   })
  // }
  gsap.to(img, {
    backgroundPositionY: '-20%',
    scrollTrigger: {
      trigger: img,
      scrub: true,
    },
  })
  // console.log()
  // .getElementsByClassName('text-img__img__caption')
  // gsap.to(img, {
  //   backgroundPositionY: '-120%',
  //   scrollTrigger: {
  //     trigger: img,
  //     scrub: true,
  //   },
})

// const aboutImg1scroll = gsap.timeline({ defaults: { ease: 'none' } })

// aboutImg1scroll
//   .from('.text-img__img', {
//     backgroundPositionY: '170%',
//   })
//   .to('.text-img__img__caption', {
//     y: '-100%',
//   })

// ScrollTrigger.create({
//   // markers: true,
//   trigger: '.text-img__img',
//   start: 'top bottom',
//   end: 'bottom top',
//   animation: aboutImg1scroll,
//   scrub: 1,
//   // pin: true,
//   // pinSpacing: false,
// })
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

// let blogSlider
// const blogSliderInit = () => {
//   blogSlider = new Swiper('.blog__swiper', {
//     speed: 600,
//     spaceBetween: 40,
//     slidesPerView: 1,
//     slidesPerGroup: 1,
//     pagination: {
//       el: '.swiper-pagination',
//     },
//     navigation: {
//       nextEl: '.blog__rightarrow',
//       prevEl: '.blog__leftarrow',
//     },
//   })
// }
// if (window.innerWidth <= 767) {
//   blogSliderInit()
// }
// const blogMq = window.matchMedia('(max-width: 767px)')
// blogMq.onchange = (e) => {
//   if (e.matches) {
//     // 767 or less
//     blogSliderInit()
//   } else {
//     // more than 767
//     blogSlider.destroy()
//   }
// }
