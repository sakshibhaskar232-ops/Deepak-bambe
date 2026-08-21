// MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");

  if (mobileMenu.classList.contains("active")) {
    menuBtn.textContent = "×";
  } else {
    menuBtn.textContent = "☰";
  }
});


// CLOSE MOBILE MENU AFTER CLICKING LINK

document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    menuBtn.textContent = "☰";
  });
});


// DARK / LIGHT MODE

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("doctorTheme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("doctorTheme", "dark");
    themeToggle.textContent = "☀";
  } else {
    localStorage.setItem("doctorTheme", "light");
    themeToggle.textContent = "☾";
  }

});


// APPOINTMENT FORM

const appointmentForm = document.getElementById("appointmentForm");
const formMessage = document.getElementById("formMessage");

appointmentForm.addEventListener("submit", function(event) {

  event.preventDefault();

  const formData = new FormData(appointmentForm);

  const name = formData.get("name");
  const phone = formData.get("phone");
  const date = formData.get("date");

  if (!name || !phone || !date) {
    formMessage.style.display = "block";
    formMessage.textContent =
      "Please complete your name, phone number and preferred date.";
    return;
  }

  formMessage.style.display = "block";

  formMessage.textContent =
    "Thank you. Your appointment request has been recorded on this device. The clinic should contact you to confirm availability.";

  appointmentForm.reset();

});


// SMOOTH NAVIGATION

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function(event) {

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  });

});


// SET MINIMUM APPOINTMENT DATE TO TODAY

const dateInput = document.querySelector('input[name="date"]');

if (dateInput) {

  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  dateInput.min = `${year}-${month}-${day}`;

}


// REVEAL SECTIONS ON SCROLL

const observer = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";

      }

    });

  },
  {
    threshold: 0.12
  }
);

document
  .querySelectorAll(".section, .expertise-card, .review-card")
  .forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity .7s ease, transform .7s ease";

    observer.observe(element);

  });
