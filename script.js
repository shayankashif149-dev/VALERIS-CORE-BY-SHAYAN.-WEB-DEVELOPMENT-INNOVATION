/**
 * VALERIS CORE PLATFORM SYSTEM ENGINE
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SYSTEM LOADING FRAMEWORK ---
    const preloader = document.getElementById("preloader");
    const progress = document.querySelector(".preloader-progress");
    const loadCount = document.getElementById("load-count");
    
    let count = 0;
    const counterLoop = setInterval(() => {
        count += Math.floor(Math.random() * 8) + 2;
        if(count >= 100) {
            count = 100;
            clearInterval(counterLoop);
            setTimeout(() => {
                preloader.style.opacity = "0";
                setTimeout(() => preloader.style.display = "none", 800);
                initializeSystemMatrix();
            }, 400);
        }
        progress.style.width = count + "%";
        loadCount.innerText = count;
    }, 45);

    function initializeSystemMatrix() {
        build3DSceneNodes();
        setupScrollRevealEngine();
    }

    // --- 2. SMOOTH FUNCTIONAL SCROLL ENGINE ---
    const allLinks = document.querySelectorAll('.nav-link, .mobile-link, .hero-ctas .btn');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetAttr = this.getAttribute('href');
            
            if (targetAttr.startsWith('#')) {
                e.preventDefault();
                const destinationSection = document.querySelector(targetAttr);
                
                if (destinationSection) {
                    const headerHeight = document.querySelector('.header-navigation').offsetHeight;
                    const targetedPosition = destinationSection.offsetTop - (headerHeight - 10);
                    
                    window.scrollTo({
                        top: targetedPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // --- 3. POINTER TRACKING GRAPHICS ---
    const cursor = document.getElementById("custom-cursor");
    const cursorDot = document.getElementById("custom-cursor-dot");
    
    let pointerX = 0, pointerY = 0;
    let trackX = 0, trackY = 0;
    
    window.addEventListener("mousemove", (e) => {
        pointerX = e.clientX;
        pointerY = e.clientY;
        cursorDot.style.left = pointerX + "px";
        cursorDot.style.top = pointerY + "px";
    });

    function updateCursorPosition() {
        trackX += (pointerX - trackX) * 0.12;
        trackY += (pointerY - trackY) * 0.12;
        cursor.style.left = trackX + "px";
        cursor.style.top = trackY + "px";
        requestAnimationFrame(updateCursorPosition);
    }
    requestAnimationFrame(updateCursorPosition);

    const interactives = document.querySelectorAll("a, button, .service-row, .portfolio-card");
    interactives.forEach(item => {
        item.addEventListener("mouseenter", () => cursor.classList.add("cursor-hover-state"));
        item.addEventListener("mouseleave", () => cursor.classList.remove("cursor-hover-state"));
    });

    // --- 4. PROTECTED 3D VECTOR FIELD SCENE (UNDISTURBED) ---
    const spatialScene = document.getElementById("spatial-scene");
    
    function build3DSceneNodes() {
        const nodeTotal = 16;
        const orbitRadius = 380;
        
        for (let i = 0; i < nodeTotal; i++) {
            const card = document.createElement("div");
            card.classList.add("spatial-node-card");
            
            const alphaRadian = (i / nodeTotal) * Math.PI * 2;
            const translationX = Math.cos(alphaRadian) * orbitRadius;
            const translationZ = Math.sin(alphaRadian) * orbitRadius - 150; 
            const rotationY = -alphaRadian * (180 / Math.PI) + 90;

            card.style.transform = `translateX(${translationX}px) translateZ(${translationZ}px) rotateY(${rotationY}deg) rotateX(10deg)`;
            
            const innerGlow = document.createElement("div");
            innerGlow.classList.add("node-inner-glow");
            innerGlow.style.backgroundImage = `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=150&q=40')`;
            
            card.appendChild(innerGlow);
            spatialScene.appendChild(card);
        }
    }

    let targetSceneRotationY = 0, currentSceneRotationY = 0;
    let targetSceneRotationX = 0, currentSceneRotationX = 0;

    window.addEventListener("mousemove", (e) => {
        const vectorX = (e.clientX / window.innerWidth) - 0.5;
        const vectorY = (e.clientY / window.innerHeight) - 0.5;
        targetSceneRotationY = vectorX * 45; 
        targetSceneRotationX = -vectorY * 30;
    });

    function smoothRenderLoop() {
        currentSceneRotationY += (targetSceneRotationY - currentSceneRotationY) * 0.05;
        currentSceneRotationX += (targetSceneRotationX - currentSceneRotationX) * 0.05;
        const scrollOffsetZ = window.scrollY * 0.08;

        spatialScene.style.transform = `rotateX(${currentSceneRotationX}deg) rotateY(${currentSceneRotationY + scrollOffsetZ}deg)`;
        requestAnimationFrame(smoothRenderLoop);
    }
    requestAnimationFrame(smoothRenderLoop);

    // --- 5. VIEWPORT DETECTION ---
    function setupScrollRevealEngine() {
        const sections = document.querySelectorAll(".scroll-reveal-section, #hero");
        const navLinks = document.querySelectorAll(".nav-link");
        
        const configOptions = { root: null, threshold: 0.12 };
        
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("section-visible");
                    
                    const identifier = entry.target.getAttribute("id");
                    navLinks.forEach(link => {
                        link.classList.remove("active");
                        if(link.getAttribute("href") === `#${identifier}`) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        }, configOptions);

        sections.forEach(sec => elementObserver.observe(sec));
    }

    // --- 6. NAV HEAD ACTIONS ---
    const headerWrapper = document.querySelector(".header-navigation");
    window.addEventListener("scroll", () => {
        if(window.scrollY > 50) {
            headerWrapper.classList.add("nav-scrolled");
        } else {
            headerWrapper.classList.remove("nav-scrolled");
        }
    });

    // --- 7. MESH TILT PHYSICS ---
    const tiltCards = document.querySelectorAll(".tilt-target");
    tiltCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const frameBounds = card.getBoundingClientRect();
            const posX = e.clientX - frameBounds.left;
            const posY = e.clientY - frameBounds.top;
            const normalizedX = (posX / frameBounds.width) - 0.5;
            const normalizedY = (posY / frameBounds.height) - 0.5;
            
            card.style.transform = `rotateX(${-normalizedY * 15}deg) rotateY(${normalizedX * 15}deg) scale(1.01)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
        });
    });

    // --- 8. MAGNETIC ENGINE ---
    const magneticItems = document.querySelectorAll(".magnetic-btn");
    magneticItems.forEach(anchor => {
        anchor.addEventListener("mousemove", (e) => {
            const bounds = anchor.getBoundingClientRect();
            const deltaX = e.clientX - (bounds.left + bounds.width / 2);
            const deltaY = e.clientY - (bounds.top + bounds.height / 2);
            anchor.style.transform = `translate(${deltaX * 0.3}px, ${deltaY * 0.3}px) scale(1.01)`;
        });
        anchor.addEventListener("mouseleave", () => {
            anchor.style.transform = `translate(0px, 0px) scale(1)`;
        });
    });

    // --- 9. CLICK RIPPLES ---
    const rippleTargets = document.querySelectorAll(".ripple-target");
    rippleTargets.forEach(element => {
        element.addEventListener("click", function(e) {
            const elementBounds = this.getBoundingClientRect();
            const circleRipple = document.createElement("span");
            circleRipple.classList.add("ripple-element");
            circleRipple.style.left = (e.clientX - elementBounds.left) + "px";
            circleRipple.style.top = (e.clientY - elementBounds.top) + "px";
            this.appendChild(circleRipple);
            setTimeout(() => circleRipple.remove(), 600);
        });
    });

    // --- 10. MOBILE MENUS ---
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileOverlay = document.querySelector(".mobile-overlay");
    menuToggle.addEventListener("click", () => {
        mobileOverlay.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });
    document.querySelectorAll(".mobile-link").forEach(l => {
        l.addEventListener("click", () => {
            mobileOverlay.classList.remove("active");
        });
    });
});