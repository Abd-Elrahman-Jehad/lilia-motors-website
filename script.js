// ==========================
// Mobile Menu Toggle
// ==========================
// هذا الجزء مسؤول عن فتح وإغلاق قائمة الموبايل
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// ==========================
// Services Cards Animation on Page Load
// ==========================
// هذا الجزء يجعل بطاقات الخدمات تظهر عند تحميل الصفحة
// كل بطاقة تدخل بتأخير بسيط عن الثانية
window.addEventListener("load", () => {
  const serviceCards = document.querySelectorAll(".service-box");

  serviceCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("show");
    }, index * 250);
  });

  // كمان نشغل reveal عند أول تحميل
  revealOnScroll();
  handleNavbarScroll();
});

// ==========================
// Services Hover Active Effect
// ==========================
// لما المستخدم يمرر الماوس على أي بطاقة:
// - البطاقة تصير active
// - الرقم اللي فوقها يتفعل
const boxes = document.querySelectorAll(".service-box");
const steps = document.querySelectorAll(".step-item");

boxes.forEach((box, i) => {
  box.addEventListener("mouseenter", () => {
    boxes.forEach(b => b.classList.remove("active"));
    steps.forEach(s => s.classList.remove("active"));

    box.classList.add("active");
    if (steps[i]) {
      steps[i].classList.add("active");
    }
  });
});

// ==========================
// Remove Active State When Mouse Leaves Services
// ==========================
// لما يطلع الماوس من قسم الخدمات:
// - يتم إزالة التحديد من كل البطاقات
// - ترجع الأرقام لوضعها الطبيعي
const servicesSection = document.querySelector(".services-cards");

if (servicesSection) {
  servicesSection.addEventListener("mouseleave", () => {
    boxes.forEach(b => b.classList.remove("active"));
    steps.forEach(s => s.classList.remove("active"));
  });
}

// ==========================
// Counter Animation
// ==========================
// هذا الجزء مسؤول عن عداد الأرقام داخل قسم الإحصائيات
// يبدأ العد فقط لما المستخدم يوصل لهذا القسم
const counters = document.querySelectorAll("[data-target]");
const statsSection = document.querySelector(".stats-section");
let counterStarted = false;

const animateCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  let count = 0;
  const increment = Math.ceil(target / 80);

  const updateCounter = () => {
    count += increment;

    if (count < target) {
      counter.textContent = count;
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target;
    }
  };

  updateCounter();
};

// ==========================
// Stats Boxes Reveal Animation
// ==========================
const statBoxes = document.querySelectorAll(".stat-box");

function showStatsBoxes() {
  if (!statsSection) return;

  const sectionTop = statsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight - 120) {
    statBoxes.forEach((box, index) => {
      setTimeout(() => {
        box.classList.add("show");
      }, index * 180);
    });
  }
}

window.addEventListener("scroll", showStatsBoxes);
window.addEventListener("load", showStatsBoxes);

// ==========================
// Reveal On Scroll
// ==========================
// هذا الجزء مسؤول عن إظهار العناصر عند النزول للصفحة
// مثل:
// - About image
// - Titles
// - أي عنصر عليه class = reveal
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const revealTop = element.getBoundingClientRect().top;
    const revealPoint = 120;

    if (revealTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

// ==========================
// Scroll To Top Button
// ==========================
// هذا الجزء مسؤول عن:
// - إظهار زر الرجوع للأعلى عند النزول
// - وعند الضغط عليه يرجع لأول الصفحة بسلاسة
const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// ==========================
// Contact Form Submission
// ==========================
// هذا الجزء يمنع الفورم من التحديث الحقيقي للصفحة
// ويظهر رسالة نجاح مؤقتة
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Message sent successfully!");
    this.reset();
  });
}

// ==========================
// Sticky Navbar + Active Section on Scroll
// ==========================
// هذا الجزء مسؤول عن شيئين مهمين:
//
// 1) تصغير الـ Navbar عند النزول
// 2) تحديد اللينك الحالي في الـ Navbar حسب السكشن الموجود فيه المستخدم
const header = document.querySelector(".main-header");
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function updateActiveNav() {
  let currentSection = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

function handleNavbarScroll() {
  // تصغير الناف عند النزول
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  // تحديث الرابط الحالي
  updateActiveNav();

  // تشغيل العداد إذا وصلنا قسم الإحصائيات
  if (statsSection && !counterStarted) {
    const sectionTop = statsSection.offsetTop - 300;

    if (window.scrollY > sectionTop) {
      counters.forEach(counter => animateCounter(counter));
      counterStarted = true;
    }
  }

  // إظهار العناصر أثناء النزول
  revealOnScroll();

  // إظهار زر الرجوع للأعلى
  if (scrollTopBtn) {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  }
}



// ==========================
// Close Mobile Menu After Click
// ==========================
// لما المستخدم يضغط على أي رابط داخل الموبايل منيو:
// - المنيو تنغلق تلقائيًا
navItems.forEach(link => {
  link.addEventListener("click", () => {
    if (navLinks) {
      navLinks.classList.remove("show");
    }
  });
});

// ==========================
// Run Scroll Functions
// ==========================
// هذا الجزء يشغل كل شيء أثناء السكرول
window.addEventListener("scroll", handleNavbarScroll);
// ==========================
// Portfolio Filter
// ==========================
// هذا الجزء مسؤول عن فلترة الأعمال داخل قسم الـ Portfolio
// عند الضغط على أي زر:
// - يتم عرض الأعمال التابعة له فقط
// - وإذا تم اختيار All Works يتم عرض الكل

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // إزالة active من كل الأزرار
    filterButtons.forEach(btn => btn.classList.remove("active"));

    // إضافة active للزر الحالي
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    portfolioItems.forEach(item => {
      const itemCategory = item.getAttribute("data-category");

      if (filterValue === "all" || itemCategory === filterValue) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  });
});

// ==========================
// Team Cards Animation (from bottom one by one)
// ==========================
// هذا الجزء مسؤول عن:
// - إظهار بطاقات الفريق من تحت
// - واحدة واحدة
// - فقط عند الوصول إلى قسم الـ Team

const teamSection = document.querySelector(".team-section");
const teamCards = document.querySelectorAll(".team-card");

let teamAnimated = false;

function animateTeamCards() {
  if (!teamSection || teamAnimated) return;

  const sectionTop = teamSection.offsetTop - 300;

  if (window.scrollY > sectionTop) {
    teamCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("show");
      }, index * 220);
    });

    teamAnimated = true;
  }
}

// تشغيل الأنيميشن عند السكرول أو تحميل الصفحة
window.addEventListener("scroll", animateTeamCards);
window.addEventListener("load", animateTeamCards);

// ==========================
// Pricing Cards Animation (from bottom one by one)
// ==========================
// هذا الجزء مسؤول عن:
// - إظهار بطاقات الأسعار من تحت
// - واحدة واحدة
// - عند الوصول إلى القسم

const pricingSection = document.querySelector(".pricing-section");
const pricingCards = document.querySelectorAll(".pricing-card");

let pricingAnimated = false;

function animatePricingCards() {
  if (!pricingSection || pricingAnimated) return;

  const sectionTop = pricingSection.offsetTop - 300;

  if (window.scrollY > sectionTop) {
    pricingCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("show");
      }, index * 220);
    });

    pricingAnimated = true;
  }
}

window.addEventListener("scroll", animatePricingCards);
window.addEventListener("load", animatePricingCards);

// ==========================
// Clients Feedback Auto Slider
// ==========================
// هذا الجزء مسؤول عن:
// - تحريك قسم آراء العملاء تلقائيًا
// - كل عدة ثواني
// - مع تحديث النقاط أسفل السلايدر

const feedbackSlider = document.getElementById("feedbackSlider");
const feedbackDots = document.querySelectorAll("#feedbackDots .dot");

let feedbackIndex = 0;

function moveFeedbackSlider() {
  if (!feedbackSlider) return;

  const cards = document.querySelectorAll(".feedback-card");
  const wrapper = document.querySelector(".feedback-slider-wrapper");

  if (!cards.length || !wrapper) return;

  let visibleCards = 3;

  if (window.innerWidth <= 768) {
    visibleCards = 1;
  } else if (window.innerWidth <= 1100) {
    visibleCards = 2;
  }

  const totalSlides = cards.length - visibleCards + 1;

  if (feedbackIndex >= totalSlides) {
    feedbackIndex = 0;
  }

  const cardWidth = cards[0].offsetWidth + 38;
  feedbackSlider.style.transform = `translateX(-${feedbackIndex * cardWidth}px)`;

  // تحديث النقاط
  feedbackDots.forEach(dot => dot.classList.remove("active"));

  const activeDotIndex = feedbackIndex % feedbackDots.length;
  if (feedbackDots[activeDotIndex]) {
    feedbackDots[activeDotIndex].classList.add("active");
  }

  feedbackIndex++;
}

// تشغيل أول مرة
window.addEventListener("load", () => {
  moveFeedbackSlider();
  setInterval(moveFeedbackSlider, 3500);
});

// إعادة ضبط عند تغيير حجم الشاشة
window.addEventListener("resize", () => {
  feedbackIndex = 0;
  moveFeedbackSlider();
});

// ==========================
// Blog Cards Animation (from bottom one by one)
// ==========================
// هذا الجزء مسؤول عن:
// - إظهار بطاقات المدونة من تحت
// - واحدة واحدة
// - عند الوصول إلى القسم

const blogSection = document.querySelector(".blog-section");
const blogCards = document.querySelectorAll(".blog-card");

let blogAnimated = false;

function animateBlogCards() {
  if (!blogSection || blogAnimated) return;

  const sectionTop = blogSection.offsetTop - 300;

  if (window.scrollY > sectionTop) {
    blogCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("show");
      }, index * 220);
    });

    blogAnimated = true;
  }
}

window.addEventListener("scroll", animateBlogCards);
window.addEventListener("load", animateBlogCards);


// ==========================
// Contact Form Submit
// ==========================
// يمنع إعادة تحميل الصفحة ويعرض رسالة نجاح

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Message sent successfully!");
    this.reset();
  });
}

// ==========================
// Newsletter Form Submit
// ==========================
// يمنع إعادة تحميل الصفحة ويعرض رسالة نجاح

// ==========================
// Newsletter Button Click
// ==========================
// هذا الجزء خاص بزر الاشتراك
// بما إن الإيميل مش داخل form

const newsletterBtn = document.getElementById("newsletterBtn");
const newsletterEmail = document.getElementById("newsletterEmail");

if (newsletterBtn && newsletterEmail) {
  newsletterBtn.addEventListener("click", function () {
    if (newsletterEmail.value.trim() === "") {
      alert("Please enter your email!");
      return;
    }

    alert("Subscribed successfully!");
    newsletterEmail.value = "";
  });
}
// ==========================
// Hero Reveal Animation
// ==========================
const heroRevealElements = document.querySelectorAll(".reveal-left, .reveal-right");

function revealHeroElements() {
  heroRevealElements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealHeroElements);
window.addEventListener("load", revealHeroElements);


