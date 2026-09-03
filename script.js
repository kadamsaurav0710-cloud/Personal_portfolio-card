/* =====================================================
   DOM ELEMENTS
===================================================== */

const body = document.body;

const navbar =
    document.querySelector(".navbar");

const navLinks =
    document.querySelector(".nav-links");

const navLinkItems =
    document.querySelectorAll(".nav-link");

const sections =
    document.querySelectorAll("section");

const projectCards =
    document.querySelectorAll(".project-card");

const currentYear =
    document.getElementById("currentYear");

const themeToggle =
    document.getElementById("themeToggle");

const backToTop =
    document.getElementById("backToTop");

const projectModal =
    document.getElementById("projectModal");

const modalClose =
    document.getElementById("modalClose");

const modalOverlay =
    document.querySelector(".modal-overlay");

const modalProjectIcon =
    document.getElementById("modalProjectIcon");

const modalProjectTitle =
    document.getElementById("modalProjectTitle");

const modalProjectDescription =
    document.getElementById("modalProjectDescription");

const modalProjectTech =
    document.getElementById("modalProjectTech");

const notification =
    document.getElementById("notification");


/* =====================================================
   CURRENT YEAR
===================================================== */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =====================================================
   PAGE LOAD ANIMATION
===================================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        body.classList.add(
            "portfolio-loaded"
        );

    }, 100);

});


/* =====================================================
   SMOOTH SCROLL
===================================================== */

navLinkItems.forEach((link) => {

    link.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");

        if (
            !targetId ||
            !targetId.startsWith("#")
        ) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const navbarHeight =
            navbar
                ? navbar.offsetHeight
                : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

        closeMobileMenu();

    });

});


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

let mobileMenuButton = null;


function createMobileMenuButton() {

    if (!navbar) {
        return;
    }

    if (
        document.querySelector(
            ".mobile-menu-button"
        )
    ) {
        mobileMenuButton =
            document.querySelector(
                ".mobile-menu-button"
            );

        return;
    }


    mobileMenuButton =
        document.createElement("button");


    mobileMenuButton.className =
        "mobile-menu-button";


    mobileMenuButton.type =
        "button";


    mobileMenuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );


    mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
    );


    mobileMenuButton.innerHTML =
        "☰";


    navbar.insertBefore(
        mobileMenuButton,
        themeToggle
    );


    mobileMenuButton.addEventListener(
        "click",
        toggleMobileMenu
    );

}


function toggleMobileMenu() {

    if (!navbar || !mobileMenuButton) {
        return;
    }


    const isOpen =
        navbar.classList.toggle(
            "mobile-open"
        );


    mobileMenuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );


    mobileMenuButton.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );


    mobileMenuButton.innerHTML =
        isOpen
            ? "✕"
            : "☰";

}


function closeMobileMenu() {

    if (!navbar || !mobileMenuButton) {
        return;
    }


    navbar.classList.remove(
        "mobile-open"
    );


    mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
    );


    mobileMenuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );


    mobileMenuButton.innerHTML =
        "☰";

}


createMobileMenuButton();


/* Close mobile menu when clicking outside */

document.addEventListener(
    "click",
    function (event) {

        if (!navbar) {
            return;
        }

        if (
            window.innerWidth <= 600 &&
            navbar.classList.contains(
                "mobile-open"
            ) &&
            !navbar.contains(event.target)
        ) {

            closeMobileMenu();

        }

    }
);


/* Close mobile menu with Escape */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeMobileMenu();

            closeProjectModal();

        }

    }
);


/* Close mobile menu when resizing */

window.addEventListener(
    "resize",
    function () {

        if (window.innerWidth > 600) {

            closeMobileMenu();

        }

    }
);


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

function updateActiveNavigation() {

    let currentSection = "";

    const scrollPosition =
        window.scrollY +
        window.innerHeight * 0.35;


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;


        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
                sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinkItems.forEach((link) => {

        link.classList.remove(
            "active"
        );


        const href =
            link.getAttribute("href");


        if (
            href === `#${currentSection}`
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


updateActiveNavigation();


/* =====================================================
   INTERSECTION OBSERVER
===================================================== */

const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "section-visible"
                        );

                        entry.target.classList.remove(
                            "section-hidden"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


sections.forEach((section) => {

    section.classList.add(
        "section-hidden"
    );

    observer.observe(section);

});


/* =====================================================
   PROJECT HOVER EFFECT
===================================================== */

projectCards.forEach((card) => {

    card.addEventListener(
        "mouseenter",
        function () {

            this.classList.add(
                "project-active"
            );

        }
    );


    card.addEventListener(
        "mouseleave",
        function () {

            this.classList.remove(
                "project-active"
            );

        }
    );

});


/* =====================================================
   PROJECT MODAL DATA
===================================================== */

const projectData = {

    "ai-agent": {

        icon: "🤖",

        title:
            "AI Customer Service Agent System",

        description:
            "An AI-powered customer service system designed to automate support workflows including order lookups, refunds, product availability checks, sentiment analysis, stateful memory, analytics, and fallback handling.",

        tech: [
            "Python",
            "OpenAI AgentKit",
            "GPT-4o",
            "Pytest"
        ]

    },


    "gymfit": {

        icon: "🛒",

        title:
            "GymFit — Supplement E-Commerce Platform",

        description:
            "A premium responsive supplement e-commerce platform with product listings, filtering, shopping cart functionality, authentication, reusable components, and PostgreSQL database integration.",

        tech: [
            "React",
            "TypeScript",
            "Tailwind CSS",
            "PostgreSQL",
            "Framer Motion"
        ]

    },


    "nft": {

        icon: "🌐",

        title:
            "Web3 NFT Marketplace",

        description:
            "A responsive NFT marketplace allowing users to buy and sell digital assets with a decentralized backend implemented using Motoko on the Internet Computer.",

        tech: [
            "HTML",
            "CSS",
            "JavaScript",
            "React.js",
            "Motoko"
        ]

    },


    "face-detection": {

        icon: "👁️",

        title:
            "Real-Time Face Detection System",

        description:
            "A real-time computer vision application using OpenCV and Haar Cascade Classifier to detect faces from live webcam input with bounding-box visualization.",

        tech: [
            "Python",
            "OpenCV",
            "Haar Cascade"
        ]

    }

};


/* =====================================================
   OPEN PROJECT MODAL
===================================================== */

function openProjectModal(projectId) {

    const project =
        projectData[projectId];


    if (
        !project ||
        !projectModal
    ) {
        return;
    }


    if (modalProjectIcon) {

        modalProjectIcon.textContent =
            project.icon;

    }


    if (modalProjectTitle) {

        modalProjectTitle.textContent =
            project.title;

    }


    if (modalProjectDescription) {

        modalProjectDescription.textContent =
            project.description;

    }


    if (modalProjectTech) {

        modalProjectTech.innerHTML = "";


        project.tech.forEach(
            function (technology) {

                const span =
                    document.createElement("span");

                span.textContent =
                    technology;

                modalProjectTech.appendChild(
                    span
                );

            }
        );

    }


    projectModal.classList.add(
        "open"
    );


    projectModal.setAttribute(
        "aria-hidden",
        "false"
    );


    body.style.overflow =
        "hidden";

}


/* =====================================================
   CLOSE PROJECT MODAL
===================================================== */

function closeProjectModal() {

    if (!projectModal) {
        return;
    }


    projectModal.classList.remove(
        "open"
    );


    projectModal.setAttribute(
        "aria-hidden",
        "true"
    );


    body.style.overflow =
        "";

}


/* =====================================================
   PROJECT CARD CLICK
===================================================== */

projectCards.forEach((card) => {

    card.addEventListener(
        "click",
        function (event) {

            /*
             * Don't open modal when clicking
             * GitHub / Live Demo buttons.
             */

            if (
                event.target.closest(
                    ".project-button"
                )
            ) {
                return;
            }


            const projectId =
                this.dataset.project;


            if (projectId) {

                openProjectModal(
                    projectId
                );

            }

        }
    );

});


/* =====================================================
   MODAL CLOSE EVENTS
===================================================== */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeProjectModal
    );

}


if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeProjectModal
    );

}


/* =====================================================
   BACK TO TOP
===================================================== */

window.addEventListener(
    "scroll",
    function () {

        if (!backToTop) {
            return;
        }


        if (window.scrollY > 500) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }
);


if (backToTop) {

    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* =====================================================
   THEME TOGGLE
===================================================== */

const savedTheme =
    localStorage.getItem(
        "portfolioTheme"
    );


if (
    savedTheme === "light"
) {

    body.classList.add(
        "light-mode"
    );

}


function updateThemeIcon() {

    if (!themeToggle) {
        return;
    }


    if (
        body.classList.contains(
            "light-mode"
        )
    ) {

        themeToggle.textContent =
            "🌙";


        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    } else {

        themeToggle.textContent =
            "☀️";


        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    }

}


updateThemeIcon();


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            body.classList.toggle(
                "light-mode"
            );


            const isLightMode =
                body.classList.contains(
                    "light-mode"
                );


            localStorage.setItem(
                "portfolioTheme",
                isLightMode
                    ? "light"
                    : "dark"
            );


            updateThemeIcon();

        }
    );

}


/* =====================================================
   EMAIL COPY
===================================================== */

const emailAddress =
    "kadamsaurav07@gmail.com";


function showNotification(message) {

    if (!notification) {
        return;
    }


    notification.textContent =
        message;


    notification.classList.add(
        "show"
    );


    setTimeout(
        function () {

            notification.classList.remove(
                "show"
            );

        },
        2200
    );

}


/*
 * Add copy functionality to
 * email links when the user
 * uses the appropriate modifier.
 */

document.addEventListener(
    "click",
    async function (event) {

        const emailLink =
            event.target.closest(
                'a[href^="mailto:"]'
            );


        if (
            !emailLink ||
            !event.shiftKey
        ) {
            return;
        }


        event.preventDefault();


        try {

            await navigator.clipboard.writeText(
                emailAddress
            );


            showNotification(
                "Email address copied!"
            );

        } catch (error) {

            showNotification(
                emailAddress
            );

        }

    }
);


/* =====================================================
   PROFILE IMAGE FALLBACK
===================================================== */

const profilePhoto =
    document.querySelector(
        ".profile-photo"
    );


if (profilePhoto) {

    profilePhoto.addEventListener(
        "error",
        function () {

            this.style.display =
                "none";


            const parent =
                this.parentElement;


            if (parent) {

                parent.innerHTML =
                    '<span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:2.5rem;font-weight:800;color:white;">SK</span>';

            }

        }
    );

}


/* =====================================================
   MOBILE SCROLL OFFSET
===================================================== */

function scrollToSectionWithOffset(
    target
) {

    if (!target) {
        return;
    }


    const navbarHeight =
        navbar
            ? navbar.offsetHeight
            : 0;


    const targetTop =
        target.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight;


    window.scrollTo({

        top: targetTop,

        behavior: "smooth"

    });

}


/* =====================================================
   KEYBOARD ACCESSIBILITY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" &&
            document.activeElement &&
            document.activeElement.classList.contains(
                "project-card"
            )
        ) {

            const projectId =
                document.activeElement.dataset.project;


            if (projectId) {

                openProjectModal(
                    projectId
                );

            }

        }

    }
);


/* =====================================================
   PROJECT CARD ACCESSIBILITY
===================================================== */

projectCards.forEach((card) => {

    card.setAttribute(
        "tabindex",
        "0"
    );

    card.setAttribute(
        "role",
        "button"
    );

    card.setAttribute(
        "aria-label",
        "Open project details"
    );

});


/* =====================================================
   INITIALIZATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        createMobileMenuButton();

        updateActiveNavigation();

        updateThemeIcon();

    }
);

