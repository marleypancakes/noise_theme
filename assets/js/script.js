//header
function handleHeader() {
    const header = document.querySelector("header");
    let headerHeight = header.clientHeight;
    let oldScrollY = window.screenY;
    document.body.style.paddingTop = `${headerHeight}px`;

    window.addEventListener("scroll", (e) => {
        if (oldScrollY < window.scrollY) {
            if (window.scrollY >= headerHeight) {
                header.style.top = "-100%";
            } else {
                header.style.top = "0px";
            }
        } else {
            header.style.top = "0px";
        }
        oldScrollY = window.scrollY;
    });

    window.addEventListener("resize", () => {
        document.body.style.paddingTop = `${headerHeight}px`;
    });
}

//dropdown and cart menu
function handleDropdown() {
    const dropdownButton = document.querySelector(".dropdown-button");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    const openDropdown = () => {
        dropdownMenu.dataset.open = "true";
    };

    const closeDropdown = () => {
        dropdownMenu.dataset.open = "false";
    };

    window.addEventListener("click", (e) => {
        //dropdown
        if ([...e.target.classList].includes("dropdown-button")) {
            if (dropdownMenu.dataset.open === "false") {
                openDropdown();
            } else if (dropdownMenu.dataset.open === "true") {
                closeDropdown();
            }
        } else {
            closeDropdown();
        }
    });
}

//mobile nav
function handleMobileNavigation() {
    const openMobileNavButton = document.querySelector(".open-mobile-nav-button");
    const closeMobileNavButton = document.querySelector(".close-mobile-nav-button");
    const mobileNav = document.querySelector(".mobile-nav");
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-links");
    const mobileNavUnderlay = document.querySelector(".mobile-nav-underlay");

    const openMobileNav = () => {
        mobileNav.dataset.open = "true";
    };

    const closeMobileNav = () => {
        mobileNav.dataset.open = "false";
    };

    openMobileNavButton.addEventListener("click", () => {
        openMobileNav();
    });

    closeMobileNavButton.addEventListener("click", () => {
        closeMobileNav();
    });

    mobileNavLinks.forEach((el) => {
        el.addEventListener("click", () => {
            closeMobileNav();
        });
    });

    mobileNavUnderlay.addEventListener("click", () => {
        closeMobileNav();
    });
}

/**
 * Handle Load More
 */
const handleLoadMore = () => {
    // init
    const loadMoreBtn = document.querySelector(".js-load-posts");
    // show articles number in pagination
    var currPage = GLOBAL.CURRENT_PAGE + 1;
    var postsPerPage = GLOBAL.POSTS_PER_PAGE;
    var totalPages = GLOBAL.MAX_PAGES;
    var totalPosts = GLOBAL.TOTAL_POSTS;
    var showingArticles = currPage * postsPerPage;

    if (loadMoreBtn && GLOBAL.LAST_PAGE) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.classList.add("btn-disabled");
        loadMoreBtn.innerHTML = "No More Posts";
        showingArticles = totalPosts;
        var currArticles = document.getElementById("currArticles");
        currArticles.innerHTML = showingArticles;
    }

    // event
    if (loadMoreBtn) {
        loadMoreBtn.onclick = (event) => {
            loadMorePosts(event.srcElement);
            currPage = GLOBAL.CURRENT_PAGE + 1;
            showingArticles = currPage * postsPerPage;

            if (currPage === totalPages || totalPages < 2) {
                showingArticles = totalPosts;
            }
            setTimeout(function () {
                var currArticles = document.getElementById("currArticles");
                currArticles.innerHTML = showingArticles;
            }, 1000);
        };
    }
};
/**
 * Load more posts
 * @param: button
 */
const loadMorePosts = (button) => {
    // next link
    const nextPage = document.querySelector("link[rel=next]");
    GLOBAL.NEXT_PAGE_LINK =
        nextPage && !GLOBAL.NEXT_PAGE_LINK
            ? nextPage.getAttribute("href")
            : GLOBAL.NEXT_PAGE_LINK;

    // Update current page value
    if (GLOBAL.NEXT_PAGE_LINK && !GLOBAL.LAST_PAGE) {
        button ? button.classList.add("is-loading") : "";

        // Fetch next page content
        fetch(GLOBAL.NEXT_PAGE_LINK)
            .then((res) => res.text())
            .then((text) => new DOMParser().parseFromString(text, "text/html"))
            .then((doc) => {
                // Get posts
                const posts = doc.querySelectorAll(".js-post-card");
                const postContainer = document.querySelector(".js-post-list");
                const nextPage = doc.querySelector("link[rel=next]");

                // Add each post to the page
                posts.forEach((post) => {
                    postContainer.appendChild(post);
                });

                // Update GLOBALS
                GLOBAL.CURRENT_PAGE = GLOBAL.CURRENT_PAGE + 1;
                GLOBAL.NEXT_PAGE_LINK = nextPage
                    ? nextPage.getAttribute("href")
                    : "";
                GLOBAL.NEXT_PAGE = GLOBAL.NEXT_PAGE_LINK
                    ? GLOBAL.NEXT_PAGE + 1
                    : NaN;
                GLOBAL.LAST_PAGE =
                    GLOBAL.CURRENT_PAGE === GLOBAL.MAX_PAGES ? true : false;

                // Disable button on last page
                if (button && GLOBAL.LAST_PAGE) {
                    button.disabled = true;
                    button.classList.add("btn-disabled");
                    button.innerHTML = "No More Posts";
                }

                button ? button.classList.remove("is-loading") : "";
            })
            .catch(function (err) {
                // There was an error
                console.warn("Something went wrong.", err);
            });
    }
};

/**
 * Handle External links
 */
const handleExternalLinks = () => {
    if (GLOBAL.OPEN_LINKS_IN_NEW_TAB) {
        const domain = location.host.replace("www.", "");
        const postLinks = document.querySelectorAll("body a");
        postLinks.forEach((link) => {
            const linkURL = link.href.includes("?ref=")
                ? link.href.split("?ref=")[0]
                : link.href;
            if (!linkURL.includes(domain)) {
                link.setAttribute("target", "_blank");
                link.setAttribute("rel", "noreferrer noopener");
            }
        });
    }
};

/**
 * Handle Gallery
 */
const handleGallery = () => {
    //const images = document.querySelectorAll('.kg-gallery-image img');
    const images = document.querySelectorAll(
        ".kg-image-card img, .kg-gallery-card img"
    );
    const galleryImages = document.querySelectorAll(".kg-gallery-image img");

    // Gallery style
    galleryImages.forEach((image) => {
        image.setAttribute("alt", "Gallery Image");
        var container = image.closest(".kg-gallery-image");
        var width = image.attributes.width.value;
        var height = image.attributes.height.value;
        var ratio = width / height;
        container.style.flex = `${ratio} 1 0%`;
    });

    // Lighbox function
    if (GLOBAL.ENABLE_IMAGE_LIGHTBOX) {
        images.forEach((image) => {
            const link =
                image.parentNode.nodeName === "A"
                    ? image.parentNode.getAttribute("href")
                    : "";
            var lightboxWrapper = link
                ? image.parentNode
                : document.createElement("a");

            lightboxWrapper.setAttribute("data-no-swup", "");
            lightboxWrapper.setAttribute("data-fslightbox", "");
            lightboxWrapper.setAttribute("href", image.src);
            lightboxWrapper.setAttribute("aria-label", "Click for Lightbox");

            if (link) {
                var linkButton = document.createElement("a");
                linkButton.innerHTML =
                    '<i class="icon icon-link icon--xs"><svg class="icon__svg"><use xlink:href="/assets/icons/feather-sprite.svg#link"></use></svg></i>';
                linkButton.setAttribute("class", "image-link");
                linkButton.setAttribute("href", link);
                if (GLOBAL.OPEN_LINKS_IN_NEW_TAB) {
                    linkButton.setAttribute("target", "_blank");
                    linkButton.setAttribute("rel", "noreferrer noopener");
                }
                lightboxWrapper.parentNode.insertBefore(
                    linkButton,
                    lightboxWrapper.parentNode.firstChild
                );
            } else {
                image.parentNode.insertBefore(
                    lightboxWrapper,
                    image.parentNode.firstChild
                );
                lightboxWrapper.appendChild(image);
            }
        });
        refreshFsLightbox();
    }
    GLOBAL.ENABLE_IMAGE_LIGHTBOX ? refreshFsLightbox() : "";
};

// Blank Content Handling
const handleBlankContent = () => {
    var content = document.getElementsByClassName('js-content-wrap')[0];
    if (typeof content !== "undefined") {
        var contentLength = content.innerHTML.trim();
        if (contentLength == 0) {
            document.getElementsByClassName('js-content-section')[0].style.display = 'none';
        }
    }
};

/**
 * Responsive Embeds
 */
(function (global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? (module.exports = factory())
        : typeof define === "function" && define.amd
        ? define(factory)
        : ((global = global || self), (global.reframe = factory()));
})(this, function () {
    "use strict";

    function reframe(target, cName) {
        var frames =
            typeof target === "string"
                ? document.querySelectorAll(target)
                : target;
        var c = cName || "js-reframe";
        if (!("length" in frames)) frames = [frames];
        for (var i = 0; i < frames.length; i += 1) {
            var frame = frames[i];
            var hasClass = frame.className.split(" ").indexOf(c) !== -1;
            if (hasClass || frame.style.width.indexOf("%") > -1) continue;
            var h = frame.getAttribute("height") || frame.offsetHeight;
            var w = frame.getAttribute("width") || frame.offsetWidth;
            var padding = (h / w) * 100;
            var div = document.createElement("div");
            div.className = c;
            var divStyles = div.style;
            divStyles.position = "relative";
            divStyles.width = "100%";
            divStyles.paddingTop = padding + "%";
            var frameStyle = frame.style;
            frameStyle.position = "absolute";
            frameStyle.width = "100%";
            frameStyle.height = "100%";
            frameStyle.left = "0";
            frameStyle.top = "0";
            frame.parentNode.insertBefore(div, frame);
            frame.parentNode.removeChild(frame);
            div.appendChild(frame);
        }
    }

    return reframe;
});

/**
 * DOM Loaded event
 */
export default function handler() {
    handleBlankContent();
    handleHeader();
    handleGallery();
    handleDropdown();
    handleMobileNavigation();
    handleLoadMore();
    handleExternalLinks();
    reframe('iframe:not([src*="soundcloud"]):not([src*="spotify"]):not(.no-resize)');
}
