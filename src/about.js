import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const aboutImg1scroll = gsap.timeline({ defaults: { ease: 'none' } })

aboutImg1scroll
  .from('.text-img__img', {
    backgroundPositionY: '70%',
  })
  .to('.text-img__img__caption', {
    y: '-100%',
  })

ScrollTrigger.create({
  // markers: true,
  trigger: '.text-img__img',
  start: 'top bottom',
  end: 'bottom top',
  animation: aboutImg1scroll,
  scrub: 1,
  // pin: true,
  // pinSpacing: false,
})
