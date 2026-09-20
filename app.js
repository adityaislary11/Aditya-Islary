"use strict";


/* =========================================================
   ADITYA ISLARY — PORTFOLIO
   app.js
========================================================= */


/* =========================================================
   01. ELEMENTS
========================================================= */

const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");
const revealElements = document.querySelectorAll(".reveal");


/* =========================================================
   02. MOBILE NAVIGATION
========================================================= */

function openMenu() {
    if (!menuToggle || !navMenu) return;

    navMenu.classList.add("open");
    menuToggle.classList.add("active");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");
}


function closeMenu() {
    if (!menuToggle || !navMenu) return;

    navMenu.classList.remove("open");
    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
}


function toggleMenu() {
    if (!navMenu) return;

    if (navMenu.classList.contains("open")) {
        closeMenu();
    } else {
        openMenu();
    }
}


if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
}


/* Close menu when navigation link is clicked */

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});


/* Close menu when clicking outside */

document.addEventListener("click", (event) => {

    if (!navMenu || !menuToggle) return;

    const clickedInsideMenu = navMenu.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (
        navMenu.classList.contains("open") &&
        !clickedInsideMenu &&
        !clickedToggle
    ) {
        closeMenu();
    }
});


/* Close mobile menu when resizing to desktop */

window.addEventListener("resize", () => {

    if (window.innerWidth > 850) {
        closeMenu();
    }

});


/* =========================================================
   03. NAVBAR SCROLL STATE
========================================================= */

function updateNavbar() {

    if (!navbar) return;

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

}

updateNavbar();

window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);


/* =========================================================
   04. SCROLL REVEAL
========================================================= */

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    }
);


revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================================
   05. ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("main section[id]");


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY +
        window.innerHeight * 0.35;

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            currentSection = section.id;
        }

    });


    navLinks.forEach((link) => {

        const target =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            target === `#${currentSection}`
        );

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

updateActiveNavigation();


/* =========================================================
   06. HERO PARALLAX
========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");


const reduceMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (
    heroVisual &&
    !reduceMotion &&
    window.innerWidth > 850
) {

    let ticking = false;

    window.addEventListener(
        "scroll",
        () => {

            if (ticking) return;

            window.requestAnimationFrame(() => {

                const scrollY = window.scrollY;

                if (scrollY < window.innerHeight) {

                    const movement =
                        scrollY * 0.08;

                    heroVisual.style.transform =
                        `translateY(${movement}px)`;

                }

                ticking = false;

            });

            ticking = true;

        },
        { passive: true }
    );

}


/* =========================================================
   07. PROJECT CARD TILT
========================================================= */

const interactiveCards =
    document.querySelectorAll(
        ".skill-card, .project"
    );


if (!reduceMotion && window.innerWidth > 900) {

    interactiveCards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -1.5;

                const rotateY =
                    ((x - centerX) / centerX) * 1.5;

                card.style.transform =
                    `translateY(-4px)
                     perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });

}


/* =========================================================
   08. SMOOTH INTERNAL LINKS
========================================================= */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: reduceMotion
                    ? "auto"
                    : "smooth",
                block: "start"
            });

        }
    );

});


/* =========================================================
   09. CONTACT LINK FEEDBACK
========================================================= */

const contactLinks =
    document.querySelectorAll(
        ".contact-link"
    );


contactLinks.forEach((link) => {

    link.addEventListener(
        "mouseenter",
        () => {
            link.classList.add("hovered");
        }
    );


    link.addEventListener(
        "mouseleave",
        () => {
            link.classList.remove("hovered");
        }
    );

});


/* =========================================================
   10. CURRENT YEAR
========================================================= */

const footerYear =
    document.querySelector(
        ".footer p"
    );


if (footerYear) {

    const currentYear =
        new Date().getFullYear();

    footerYear.textContent =
        `© ${currentYear} Aditya Islary`;

}


/* =========================================================
   11. INITIAL PAGE STATE
========================================================= */

document.documentElement.classList.add(
    "js-enabled"
);