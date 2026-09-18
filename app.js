document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-link");
    const backToTop = document.getElementById("backToTop");
    const currentYear = document.getElementById("currentYear");

    /*
     * GitHub
     * Replace this with your actual GitHub profile URL.
     */
    const githubURL = "https://github.com/adityaislary11";

    const githubLink = document.getElementById("githubLink");
    const contactGithub = document.getElementById("contactGithub");

    const projectGithubLinks = document.querySelectorAll(
        ".github-project-link"
    );

    if (githubLink) {
        githubLink.href = githubURL;
    }

    if (contactGithub) {
        contactGithub.href = githubURL;
    }

    projectGithubLinks.forEach((link) => {
        link.href = githubURL;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
    });


    /*
     * Current Year
     */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /*
     * Mobile Navigation
     */

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            document.body.classList.toggle("menu-open", isOpen);
        });


        navItems.forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
            });
        });


        document.addEventListener("click", (event) => {
            const clickedInsideNav =
                navLinks.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInsideNav) {
                navLinks.classList.remove("open");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                document.body.classList.remove("menu-open");
            }
        });
    }


    /*
     * Header Scroll Effect
     */

    const header = document.querySelector(".site-header");

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    /*
     * Active Navigation Link
     */

    const sections = document.querySelectorAll("main section[id]");

    function updateActiveNavigation() {
        const scrollPosition = window.scrollY + 180;

        let currentSection = "home";

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

        navItems.forEach((link) => {
            const target = link.getAttribute("href");

            link.classList.toggle(
                "active",
                target === `#${currentSection}`
            );
        });
    }

    window.addEventListener("scroll", updateActiveNavigation, {
        passive: true
    });

    updateActiveNavigation();


    /*
     * Scroll Reveal Animation
     */

    const revealElements = document.querySelectorAll(".reveal");

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
                rootMargin: "0px 0px -50px 0px"
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


    /*
     * Back To Top
     */

    function updateBackToTop() {
        if (!backToTop) return;

        if (window.scrollY > 600) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    }

    window.addEventListener("scroll", updateBackToTop, {
        passive: true
    });

    updateBackToTop();


    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /*
     * Smooth Scrolling
     */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetID = link.getAttribute("href");

            if (
                !targetID ||
                targetID === "#" ||
                targetID.length <= 1
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
                15;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        });
    });


    /*
     * Project Card Interaction
     */

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            if (window.innerWidth < 900) return;

            const rect = card.getBoundingClientRect();

            const x =
                ((event.clientX - rect.left) / rect.width - 0.5) * 4;

            const y =
                ((event.clientY - rect.top) / rect.height - 0.5) * -4;

            card.style.transform =
                `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });


    /*
     * Floating Tech Chips
     */

    const floatingChips = document.querySelectorAll(".floating-chip");

    floatingChips.forEach((chip, index) => {
        chip.style.animationDelay = `${index * 0.6}s`;
    });


    /*
     * Code Card Cursor
     */

    const codeCursor = document.querySelector(".code-cursor");

    if (codeCursor) {
        let visible = true;

        setInterval(() => {
            visible = !visible;
            codeCursor.style.opacity = visible ? "1" : "0";
        }, 500);
    }


    /*
     * Small Parallax Effect
     */

    const heroVisual = document.querySelector(".hero-visual");

    if (heroVisual) {
        window.addEventListener(
            "mousemove",
            (event) => {
                if (window.innerWidth < 900) return;

                const x =
                    (event.clientX / window.innerWidth - 0.5) * 8;

                const y =
                    (event.clientY / window.innerHeight - 0.5) * 8;

                heroVisual.style.transform =
                    `translate(${x}px, ${y}px)`;
            },
            {
                passive: true
            }
        );
    }


    /*
     * Prevent Empty Project Links
     *
     * Links with href="#" that are not GitHub links are prevented
     * from jumping to the top until real project URLs are added.
     */

    const placeholderLinks = document.querySelectorAll(
        '.project-link[href="#"]'
    );

    placeholderLinks.forEach((link) => {
        if (link.classList.contains("github-project-link")) {
            return;
        }

        link.addEventListener("click", (event) => {
            event.preventDefault();
        });
    });


    /*
     * Keyboard Accessibility
     */

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            if (!navLinks || !menuToggle) return;

            navLinks.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("menu-open");
        }
    });


    /*
     * Reduced Motion
     */

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) {
        document.documentElement.classList.add("reduce-motion");
    }


    /*
     * Console Signature
     */

    console.log(
        "%cAditya Islary",
        "font-size: 20px; font-weight: bold;"
    );

    console.log(
        "%cStudent • Freelancer • Builder",
        "font-size: 13px;"
    );
});