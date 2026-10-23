/* =========================================
   ADITYA ISLARY — PORTFOLIO
   Responsive JavaScript
   ========================================= */

"use strict";


/* 1. MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    function closeMenu() {
        navMenu.classList.remove("is-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    }

    function openMenu() {
        navMenu.classList.add("is-open");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );
    }

    // Toggle the menu on mobile and tablet layouts.
    menuToggle.addEventListener("click", () => {
        const isOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close the menu when a navigation link is selected.
    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // Close the menu when the Escape key is pressed.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            const wasOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            closeMenu();

            if (wasOpen && window.innerWidth <= 700) {
                menuToggle.focus();
            }
        }
    });

    // Reset the mobile menu when switching to desktop layout.
    window.addEventListener("resize", () => {
        if (window.innerWidth > 700) {
            closeMenu();
        }
    });

    // Close the menu when clicking outside it.
    document.addEventListener("click", (event) => {
        const clickedInsideMenu = navMenu.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
            closeMenu();
        }
    });

    // Start with the menu closed when the page loads.
    closeMenu();
}


/* 2. AUTOMATIC COPYRIGHT YEAR */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* 3. SAFE EXTERNAL LINKS */

document
    .querySelectorAll('a[target="_blank"]')
    .forEach((link) => {
        link.setAttribute("rel", "noopener noreferrer");
    });


/* 4. RESET NAVIGATION WHEN RESTORING THE PAGE */

window.addEventListener("pageshow", () => {
    if (menuToggle && navMenu) {
        navMenu.classList.remove("is-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    }
});