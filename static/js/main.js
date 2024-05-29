document.addEventListener("DOMContentLoaded", () => {
    // Scroll animation
    
    sal({
        threshold: .1
    });

    // Logged In

    function menu() {
        const showLoggedIn = document.getElementsByClassName("showLoggedIn");
        const hideLoggedIn = document.getElementsByClassName("hideLoggedIn");

        if(getCookie("access_token")) {
            for(let node of showLoggedIn) {
                node.style.display = "inline-flex";
            }
        }
        else {
            for(let node of hideLoggedIn) {
                node.style.display = "inline-flex";
            }
        }
    }

    function getCookie(name) {
        name += "=";
        let ca = document.cookie.split(';');

        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];

            while(c.charAt(0) === ' ') {
                c = c.substring(1,c.length);
            }

            if(c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }

        return null;
    }

    window.addEventListener("DOMContentLoaded", menu);

    // Theme

    let darkMode = localStorage.getItem("darkMode");
    let themeColor = document.querySelector("meta[name='theme-color']");

    if(darkMode === null && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        enableDarkMode();
    }

    function enableDarkMode() {
        document.documentElement.classList.add("theme-dark");
        document.documentElement.classList.remove("theme-light");
        themeColor.setAttribute("content", "#0a0a0a");
        localStorage.setItem("darkMode", "enabled");
    }

    function disableDarkMode() {
        document.documentElement.classList.add("theme-light");
        document.documentElement.classList.remove("theme-dark");
        themeColor.setAttribute("content", "#fff");
        localStorage.setItem('darkMode', null);
    }
    
    if (darkMode === "enabled") {
        enableDarkMode();
        document.getElementById('dark').checked = true;
    } else {
        document.getElementById('light').checked = true;
    }

    const themeToggle = document.querySelector("#toggleTheme");

    if(themeToggle) {
        themeToggle.addEventListener("change", (e) => {
            if (e.target.value === "dark") {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        });
    }

    // Header

    let header = document.getElementById("header")

    function setHeaderClass() {
        if(header) {
            if(window.scrollY > 0) {
                header.classList.add("small");
            } else {
                header.classList.remove("small");
            }
        }
    }

    setHeaderClass();

    window.addEventListener("scroll", () => {
        setHeaderClass();
    });

    let headerLogo = document.getElementById("headerLogoLink");
    let headerLogoLink = headerLogo.getAttribute("href");

    if(headerLogo) {
        headerLogo.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();

            if(window.location.pathname === headerLogoLink) {
                window.scrollTo({top: 0, behavior: "smooth"});
            } else {
                window.location.href = headerLogoLink;
            }
        });
    }

    let headerNav = document.getElementById("headerNav");
    let headerNavOpen = document.getElementById("headerNavOpen");
    let headerNavClose = document.getElementById("headerNavClose");

    if(headerNavClose) {
        headerNavClose.style.display = "none";
    }

    function toggleMobileMenu(ignoreIfClosed) {
        let visible = headerNav.style.display;

        if(ignoreIfClosed && !visible) {
            return;
        }

        headerNavOpen.style.display = visible ? "" : "none";
        headerNavClose.style.display = visible ? "none" : "";
        headerNav.style.display = visible ? "" : "flex";
    }

    if(headerNavOpen) {
        headerNavOpen.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    if(headerNavClose) {
        headerNavClose.addEventListener("click", e => {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    document.addEventListener("click", e => {
        if(headerNav && !headerNav.contains(e.target)) {
            toggleMobileMenu(true);
        }
    });

    // Marquee

    const marquee = document.getElementsByClassName("marquee-content");
    const speed = 0.05;
    const columnGap = 24;

    Array.from(marquee).forEach(image => {
        moveElement(image);
    })

    function moveElement(el) {
        let start, previousTimeStamp = 0;
        let transitionX = 0;

        function step(timestamp) {
            if (start === undefined) start = timestamp;
            const frameElapsed = timestamp - previousTimeStamp;
        
            if (previousTimeStamp !== timestamp) {
                if (!marquee[0].matches(":hover")) {
                    transitionX = transitionX + (speed * frameElapsed);
                    let imageWidth = el.firstElementChild.offsetWidth;

                    if (transitionX > (imageWidth + columnGap)) {
                        el.appendChild(el.firstElementChild);
                        transitionX = 0;
                    }

                    el.style.transform = "translateX(-" + transitionX + "px)";
                }
            } else {
                el.style.transform = "translateX(0)";
            }

            previousTimeStamp = timestamp;
            window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
    }

    // Dev

    //history.scrollRestoration = "manual";
});
