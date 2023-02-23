import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
