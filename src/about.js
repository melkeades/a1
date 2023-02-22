import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const imgsToScroll = gsap.utils.toArray('.text-img__img')
imgsToScroll.forEach((img) => {
  gsap.to(img, {
    backgroundPositionY: '-20%',
    scrollTrigger: {
      trigger: img,
      scrub: true,
    },
  })
  // console.log(img)
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
