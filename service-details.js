/* =========================================================
   SERVICE DETAILS JAVASCRIPT
   ResinBlossom Studio
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const themeBtn = document.getElementById("theme-btn");
    const rtlBtn = document.getElementById("rtl-btn");
    const menuBtn = document.getElementById("menu-btn");
    const mainNav = document.getElementById("main-nav");

    const homeDropdown =
        document.querySelector(".nav-dropdown");

    const homeDropdownBtn =
        document.querySelector(".nav-dropdown-btn");


    /* =====================================================
       LUCIDE ICONS
    ===================================================== */

    function refreshIcons() {

        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }

    }

    refreshIcons();


    /* =====================================================
       DARK / LIGHT MODE
    ===================================================== */

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

    } else {

        document.body.classList.remove("dark-mode");

    }


    function updateThemeIcon() {

        if (!themeBtn) return;

        themeBtn.innerHTML =
            document.body.classList.contains("dark-mode")
                ? '<i data-lucide="sun"></i>'
                : '<i data-lucide="moon"></i>';

        refreshIcons();

    }


    updateThemeIcon();


    if (themeBtn) {

        themeBtn.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const isDark =
                document.body.classList.contains("dark-mode");


            localStorage.setItem(
                "theme",
                isDark ? "dark" : "light"
            );


            updateThemeIcon();

        });

    }


    /* =====================================================
       RTL / LTR
    ===================================================== */

    const savedDirection =
        localStorage.getItem("direction");


    if (savedDirection === "rtl") {

        document.documentElement.setAttribute(
            "dir",
            "rtl"
        );

    } else {

        document.documentElement.setAttribute(
            "dir",
            "ltr"
        );

    }


    if (rtlBtn) {

        rtlBtn.addEventListener("click", () => {

            const currentDirection =
                document.documentElement.getAttribute("dir");


            const newDirection =
                currentDirection === "rtl"
                    ? "ltr"
                    : "rtl";


            document.documentElement.setAttribute(
                "dir",
                newDirection
            );


            localStorage.setItem(
                "direction",
                newDirection
            );

        });

    }


    /* =====================================================
       HOME DROPDOWN
    ===================================================== */

    if (homeDropdown && homeDropdownBtn) {

        homeDropdownBtn.addEventListener("click", (event) => {

            event.stopPropagation();

            /*
             * On desktop the CSS can handle hover.
             * On mobile we use the .open class.
             */

            if (window.innerWidth <= 900) {

                homeDropdown.classList.toggle("open");

            }

        });

    }


    /* =====================================================
       CLOSE DROPDOWN WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", (event) => {

        if (
            homeDropdown &&
            !homeDropdown.contains(event.target)
        ) {

            homeDropdown.classList.remove("open");

        }

    });


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuBtn && mainNav) {

        menuBtn.addEventListener("click", () => {

            const isOpen =
                mainNav.classList.toggle("active");


            menuBtn.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );


            menuBtn.innerHTML = isOpen
                ? '<i data-lucide="x"></i>'
                : '<i data-lucide="menu"></i>';


            refreshIcons();

        });


        /* =================================================
           CLOSE MOBILE MENU AFTER CLICKING NAV LINK
        ================================================= */

        const navLinks =
            mainNav.querySelectorAll(
                ".nav-link, .dropdown-link"
            );


        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("active");

                if (homeDropdown) {
                    homeDropdown.classList.remove("open");
                }


                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuBtn.innerHTML =
                    '<i data-lucide="menu"></i>';


                refreshIcons();

            });

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase()
        || "index.html";


    const navLinks =
        document.querySelectorAll(".nav-link");


    navLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        if (!href) return;


        const linkPage =
            href.split("/").pop().toLowerCase();


        /*
         * Service detail pages should keep
         * the Services navigation active.
         */

        if (
            currentPage === "resin-wall-art.html" ||
            currentPage === "resin-clocks.html" ||
            currentPage === "resin-tables.html" ||
            currentPage === "home-decor.html" ||
            currentPage === "custom-creations.html" ||
            currentPage === "personalized-gifts.html"
        ) {

            if (linkPage === "services.html") {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        } else {

            if (linkPage === currentPage) {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        }

    });


    /* =====================================================
       HANDLE WINDOW RESIZE
    ===================================================== */

    window.addEventListener("resize", () => {

        /*
         * When moving back to desktop,
         * remove mobile menu state.
         */

        if (window.innerWidth > 900) {

            if (mainNav) {
                mainNav.classList.remove("active");
            }

            if (homeDropdown) {
                homeDropdown.classList.remove("open");
            }

            if (menuBtn) {

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuBtn.innerHTML =
                    '<i data-lucide="menu"></i>';

                refreshIcons();

            }

        }

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") return;


        /* Close dropdown */

        if (homeDropdown) {
            homeDropdown.classList.remove("open");
        }


        /* Close mobile menu */

        if (mainNav) {
            mainNav.classList.remove("active");
        }


        if (menuBtn) {

            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            menuBtn.innerHTML =
                '<i data-lucide="menu"></i>';

            refreshIcons();

        }

    });


    /* =====================================================
       PREVENT BROKEN # LINKS
    ===================================================== */

    const emptyLinks =
        document.querySelectorAll('a[href="#"]');


    emptyLinks.forEach(link => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

        });

    });

});