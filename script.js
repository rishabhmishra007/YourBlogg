function toggleMenu() {
    const menu = document.querySelector('.menu ul');
    menu.classList.toggle('active');
}

gsap.from(".logo, ul li, .search",{
    duration: .5,
    y: -40,
    delay: .2,
    stagger: 0.5,
    opacity:0
})
