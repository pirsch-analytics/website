document.addEventListener("DOMContentLoaded", () => {
    // Scroll animation
    
    sal({
        threshold: .2,
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

    // Dev

    history.scrollRestoration = "manual";
});