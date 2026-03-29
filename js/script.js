// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Theme toggle
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const icon = document.querySelector(".theme-toggle i");
  if (document.body.classList.contains("dark-mode")) {
    icon.className = "fas fa-sun";
    localStorage.setItem("theme", "dark");
  } else {
    icon.className = "fas fa-moon";
    localStorage.setItem("theme", "light");
  }
}

// Load saved theme
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.querySelector(".theme-toggle i").className = "fas fa-sun";
  }
});

// Modal functions
function openImageModal(imageSrc, title, description) {
  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");

  modalImage.src = imageSrc;
  modalImage.alt = title;
  modalTitle.textContent = title;
  modalDescription.textContent = description || "";
  modal.style.display = "block";

  // Prevent body scroll when modal is open
  document.body.style.overflow = "hidden";
}

function closeImageModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";

  // Restore body scroll
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside the image
window.addEventListener("click", function (event) {
  const modal = document.getElementById("imageModal");
  if (event.target === modal) {
    closeImageModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeImageModal();
  }
});

// Scroll Reveal — Intersection Observer
(function () {
  // Single elements (no stagger)
  var singleSelectors = [
    "#home .section-content",
    "#services h2",
    ".services-subtitle",
    ".services-cta",
    "#about h2",
    ".about-text",
    ".about-image",
    "#skills h2",
    "#tools h2",
    "#projects h2",
    "#contact .contact-content",
  ];

  // Grid containers — children get staggered delays
  var gridSelectors = [
    ".services-grid",
    ".skills-grid",
    ".tools-grid",
    ".projects-grid",
  ];

  singleSelectors.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      el.classList.add("reveal");
    });
  });

  gridSelectors.forEach(function (containerSelector) {
    document.querySelectorAll(containerSelector).forEach(function (container) {
      Array.from(container.children).forEach(function (child, i) {
        child.classList.add("reveal", "reveal-delay-" + ((i % 4) + 1));
      });
    });
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".reveal").forEach(function (el) {
    observer.observe(el);
  });
})();

// Mobile menu toggle
function toggleMenu() {
  var nav = document.querySelector("nav");
  var hamburger = document.querySelector(".hamburger");
  var isOpen = nav.classList.toggle("nav-open");
  var icon = hamburger.querySelector("i");
  icon.className = isOpen ? "fas fa-times" : "fas fa-bars";
  hamburger.setAttribute("aria-expanded", String(isOpen));
}

// Close menu when a nav link is clicked
document.querySelectorAll(".nav-links a").forEach(function (link) {
  link.addEventListener("click", function () {
    var nav = document.querySelector("nav");
    if (nav.classList.contains("nav-open")) {
      toggleMenu();
    }
  });
});

// Close menu when clicking outside nav
document.addEventListener("click", function (e) {
  var nav = document.querySelector("nav");
  if (nav.classList.contains("nav-open") && !nav.contains(e.target)) {
    toggleMenu();
  }
});
