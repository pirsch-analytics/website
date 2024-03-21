document.addEventListener("DOMContentLoaded", () => {
    // Scroll animation
    
    sal({
        threshold: .1,
    });

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
