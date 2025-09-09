document.addEventListener("DOMContentLoaded", function () {
        // Preloader
        setTimeout(function () {
          document.querySelector(".preloader").classList.add("fade-out");
        }, 1500);

        // Initialize particles.js globally
        particlesJS("particles-js", {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#00ffdd" },
            shape: {
              type: "circle",
              stroke: { width: 0, color: "#000000" },
              polygon: { nb_sides: 5 },
            },
            opacity: {
              value: 0.5,
              random: false,
              anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
            },
            size: {
              value: 3,
              random: true,
              anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#00ffdd",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 6,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: { enable: false, rotateX: 600, rotateY: 1200 },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              grab: { distance: 400, line_linked: { opacity: 1 } },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
              repulse: { distance: 200, duration: 0.4 },
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 },
            },
          },
          retina_detect: true,
        });

        // Scroll progress bar
        window.addEventListener("scroll", function () {
          const scrollTop = window.scrollY;
          const docHeight = document.body.offsetHeight - window.innerHeight;
          const scrollPercent = (scrollTop / docHeight) * 100;
          document.querySelector(".scroll-progress").style.width =
            scrollPercent + "%";
        });

        // Timeline items animation
        const timelineItems = document.querySelectorAll(".timeline-item");
        const timeline = document.querySelector(".timeline");

        const fadeInObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 }
        );

        timelineItems.forEach((item) => fadeInObserver.observe(item));

        // Timeline line animation
        const timelineObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("animate");
              }
            });
          },
          { threshold: 0.1 }
        );

        timelineObserver.observe(timeline);

        // Project box animations with staggered delay
        const projectBoxes = document.querySelectorAll(".projects .box");

        const projectObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry, index) => {
              if (entry.isIntersecting) {
                setTimeout(() => {
                  entry.target.classList.add("animate");
                }, index * 150); // Consistent staggered delay for all boxes
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 }
        );

        projectBoxes.forEach((box) => projectObserver.observe(box));

        // Typing animation
        const typingTextElement = document.querySelector(".typing-text");
        const typingWords = ["Prabir", "Creative", "Designer", "Developer"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 150;

        function typeEffect() {
          const currentWord = typingWords[wordIndex];

          if (isDeleting) {
            typingTextElement.textContent = currentWord.substring(
              0,
              charIndex - 1
            );
            charIndex--;
            typingDelay = 50;
          } else {
            typingTextElement.textContent = currentWord.substring(
              0,
              charIndex + 1
            );
            charIndex++;
            typingDelay = 150;
          }

          if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingDelay = 1000; // Pause at the end
          } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % typingWords.length;
            typingDelay = 500; // Pause before typing next word
          }

          setTimeout(typeEffect, typingDelay);
        }

        // Start typing effect
        setTimeout(typeEffect, 1000);

        // Sticky header
        window.addEventListener("scroll", function () {
          const header = document.getElementById("header");
          if (window.scrollY > 100) {
            header.classList.add("sticky");
          } else {
            header.classList.remove("sticky");
          }
        });

        // Animate elements on scroll
        const animateOnScroll = function () {
          const serviceCards = document.querySelectorAll(".service-card");
          const reviewsCards = document.querySelectorAll(".reviews-card");

          // Check service cards
          serviceCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (cardTop < windowHeight - 100) {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, index * 200);
            }
          });

          // Apply initial styles to services before animation
          serviceCards.forEach((card) => {
            card.style.opacity = "0";
            card.style.transform = "translateY(50px)";
            card.style.transition = "all 0.5s ease";
          });

          // Check reviews cards
          reviewsCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (cardTop < windowHeight - 100) {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "scale(1)";
              }, index * 200);
            }
          });

          // Apply initial styles to Reviews before animation
          reviewsCards.forEach((card) => {
            if (!card.classList.contains("active")) {
              card.style.opacity = "0";
              card.style.transform = "scale(0.8)";
              card.style.transition = "all 0.5s ease";
            }
          });
        };

        // Run on load and scroll
        window.addEventListener("load", animateOnScroll);
        window.addEventListener("scroll", animateOnScroll);

        // Smooth scrolling for navigation links
        document
          .querySelectorAll(".nav-links a, .btn, .footer-links a")
          .forEach((link) => {
            link.addEventListener("click", function (e) {
              const href = this.getAttribute("href");

              if (href.startsWith("#") && href !== "#") {
                e.preventDefault();
                const targetSection = document.querySelector(href);

                if (targetSection) {
                  window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: "smooth",
                  });
                }

                // Update active link
                document.querySelectorAll(".nav-links a").forEach((navLink) => {
                  navLink.classList.remove("active");
                });
                this.classList.add("active");
              }
            });
          });

        // Update active navigation based on scroll position
        window.addEventListener("scroll", function () {
          const sections = document.querySelectorAll("section");
          const navLinks = document.querySelectorAll(".nav-links a");

          let currentSection = "";

          sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop - 200) {
              currentSection = section.getAttribute("id");
            }
          });

          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
              link.classList.add("active");
            }
          });
        });

        // Add click event listener to the logo div
        document.querySelector(".logo").addEventListener("click", function () {
          window.location.href = "#home"; // Redirect to the home page
        });

        // About section parallax effect
        const aboutImage = document.querySelector("#about .hero-img");
        window.addEventListener("scroll", function () {
          const scrollPosition = window.scrollY;
          const aboutSection = document.querySelector("#about");
          const aboutTop = aboutSection.offsetTop;
          const aboutHeight = aboutSection.offsetHeight;

          if (
            scrollPosition > aboutTop - window.innerHeight &&
            scrollPosition < aboutTop + aboutHeight
          ) {
            const parallaxValue =
              (scrollPosition - aboutTop + window.innerHeight) * 0.1;
            aboutImage.style.transform = `translateY(${parallaxValue}px) scale(${
              1 + parallaxValue / 1000
            })`;
          }
        });

        // Back to top button
        const backToTopButton = document.querySelector(".back-to-top");

        window.addEventListener("scroll", function () {
          if (window.scrollY > 300) {
            backToTopButton.classList.add("active");
          } else {
            backToTopButton.classList.remove("active");
          }
        });

        backToTopButton.addEventListener("click", function (e) {
          e.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });

        // Form validation
        const contactForm = document.getElementById("contactForm");

        if (contactForm) {
          contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            let isValid = true;
            const formElements = contactForm.querySelectorAll(".form-control");

            formElements.forEach((element) => {
              if (element.hasAttribute("required") && !element.value.trim()) {
                element.classList.add("error");
                isValid = false;
              } else if (
                element.id === "email" &&
                !validateEmail(element.value)
              ) {
                element.classList.add("error");
                isValid = false;
              } else if (
                element.id === "phone" &&
                !validatePhone(element.value)
              ) {
                element.classList.add("error");
                isValid = false;
              } else {
                element.classList.remove("error");
              }
            });

            if (isValid) {
              // Show success message
              document.querySelector(".form-success").style.display = "block";

              // Reset form
              contactForm.reset();

              // Hide success message after 5 seconds
              setTimeout(function () {
                document.querySelector(".form-success").style.display = "none";
              }, 5000);
            }
          });

          // Clear errors on input
          contactForm.querySelectorAll(".form-control").forEach((element) => {
            element.addEventListener("input", function () {
              this.classList.remove("error");
            });
          });
        }

        function validateEmail(email) {
          const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(email).toLowerCase());
        }

        function validatePhone(phone) {
          const re =
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
          return re.test(String(phone));
        }

        // Skills animation
        const skillCards = document.querySelectorAll(".skill-card");

        const skillObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("animate");

                // Animate skill bars
                const skillBar = entry.target.querySelector(".skill-bar");
                if (skillBar) {
                  const level = skillBar.getAttribute("data-level");
                  skillBar.style.width = level + "%";
                }

                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.3 }
        );

        skillCards.forEach((card) => skillObserver.observe(card));

        // Network nodes click
        const networkNodes = document.querySelectorAll(".network-node");
        const sections = [
          "home",
          "about",
          "education",
          "skills",
          "projects",
          "services",
          "Reviews",
          "contact",
        ];

        networkNodes.forEach((node, index) => {
          if (index < sections.length) {
            node.addEventListener("click", function () {
              document.getElementById(sections[index]).scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            });

            // Add tooltip with section name
            const tooltip = document.createElement("div");
            tooltip.className = "tooltip";
            tooltip.style.position = "absolute";
            tooltip.style.left = "35px";
            tooltip.style.backgroundColor = "var(--dark-bg-lighter)";
            tooltip.style.color = "var(--text-light)";
            tooltip.style.padding = "5px 10px";
            tooltip.style.borderRadius = "5px";
            tooltip.style.opacity = "0";
            tooltip.style.transition = "opacity 0.3s ease";
            tooltip.style.pointerEvents = "none";
            tooltip.style.whiteSpace = "nowrap";
            tooltip.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
            tooltip.textContent =
              sections[index].charAt(0).toUpperCase() +
              sections[index].slice(1);

            node.appendChild(tooltip);

            node.addEventListener("mouseenter", function () {
              tooltip.style.opacity = "1";
            });

            node.addEventListener("mouseleave", function () {
              tooltip.style.opacity = "0";
            });
          }
        });
      });