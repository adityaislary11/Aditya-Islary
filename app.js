document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-link");
    const backToTop = document.querySelector(".back-to-top");
    const revealElements = document.querySelectorAll(".reveal");
    const sections = document.querySelectorAll("main section[id]");
    const currentYear = document.getElementById("currentYear");

    const GITHUB_URL = "https://github.com/Adityislary11";
    const ESMITRA_URL = "https://sentinel-link-orpin.vercel.app";

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    document.querySelectorAll("[data-github]").forEach((link) => {
        link.href = GITHUB_URL;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
    });

    document.querySelectorAll("[data-esmitra]").forEach((link) => {
        link.href = ESMITRA_URL;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
    });

    function closeMenu() {
        if (!navLinks || !menuToggle) return;

        navLinks.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen = navLinks.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );
        });

        navItems.forEach((link) => {
            link.addEventListener("click", () => {
                closeMenu();
            });
        });

        document.addEventListener("click", (event) => {
            if (
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });
    }

    function updateHeader() {
        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );
    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();

    function updateActiveNavigation() {
        if (!sections.length || !navItems.length) return;

        const position = window.scrollY + 220;
        let currentSection = "home";

        sections.forEach((section) => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;

            if (
                position >= top &&
                position < bottom
            ) {
                currentSection = section.id;
            }
        });

        navItems.forEach((link) => {
            const target = link.getAttribute("href");

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

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

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
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetID = link.getAttribute("href");

            if (
                !targetID ||
                targetID === "#" ||
                targetID.length < 2
            ) {
                return;
            }

            const target = document.querySelector(targetID);

            if (!target) return;

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                20;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });

    function updateBackToTop() {
        if (!backToTop) return;

        backToTop.classList.toggle(
            "show",
            window.scrollY > 600
        );
    }

    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );

    updateBackToTop();

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    const projectCards = document.querySelectorAll(
        ".project-card"
    );

    projectCards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            if (
                window.innerWidth < 900 ||
                document.documentElement.classList.contains(
                    "reduce-motion"
                )
            ) {
                return;
            }

            const rect = card.getBoundingClientRect();

            const x =
                ((event.clientX - rect.left) /
                    rect.width -
                    0.5) * 4;

            const y =
                ((event.clientY - rect.top) /
                    rect.height -
                    0.5) * -4;

            card.style.transform =
                `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

    const heroSystem = document.querySelector(".hero-system");

    if (heroSystem) {
        window.addEventListener(
            "mousemove",
            (event) => {
                if (
                    window.innerWidth < 900 ||
                    document.documentElement.classList.contains(
                        "reduce-motion"
                    )
                ) {
                    return;
                }

                const x =
                    (event.clientX /
                        window.innerWidth -
                        0.5) * 8;

                const y =
                    (event.clientY /
                        window.innerHeight -
                        0.5) * 8;

                heroSystem.style.transform =
                    `translate3d(${x}px, ${y}px, 0)`;
            },
            { passive: true }
        );
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    function handleReducedMotion() {
        if (reducedMotion.matches) {
            document.documentElement.classList.add(
                "reduce-motion"
            );
        } else {
            document.documentElement.classList.remove(
                "reduce-motion"
            );
        }
    }

    handleReducedMotion();

    if (reducedMotion.addEventListener) {
        reducedMotion.addEventListener(
            "change",
            handleReducedMotion
        );
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }

        updateActiveNavigation();
    });

    console.log(
        "%cAditya Islary",
        "font-size: 20px; font-weight: 700;"
    );

    console.log(
        "%cStudent • Freelancer • Builder",
        "font-size: 13px;"
    );
});