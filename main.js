// --- Typing effect ---
(function () {
  const el = document.querySelector(".typing");
  const texts = [
    "JavaScript Ninja",
    "TypeScript Learner",
    "UI/UX Enthusiast",
    "Full-Stack Dev",
    "Sr. Web Developer",
  ];
  let i = 0,
    j = 0,
    deleting = false;
  if (!el) return;
  function tick() {
    const word = texts[i];
    if (!deleting) {
      el.textContent = word.slice(0, ++j);
      if (j === word.length) {
        deleting = true;
        setTimeout(tick, 900);
        return;
      }
    } else {
      el.textContent = word.slice(0, --j);
      if (j === 0) {
        deleting = false;
        i = (i + 1) % texts.length;
      }
    }
    setTimeout(tick, deleting ? 45 : 90);
  }
  setTimeout(tick, 400);
})();

// --- Theme toggle with localStorage ---
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  root.setAttribute("data-theme", storedTheme);
}
themeToggle?.addEventListener("click", () => {
  const current =
    root.getAttribute("data-theme") ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// --- Mobile menu ---
const menuBtn = document.getElementById("menuToggle");
const links = document.getElementById("navLinks");
menuBtn?.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});

// --- Active link on scroll ---
const sections = [...document.querySelectorAll("section[id]")];
const navLinks = [...document.querySelectorAll(".nav__link")];
function setActive() {
  const y = window.scrollY + 120;
  let current = sections[0]?.id;
  for (const s of sections) {
    if (s.offsetTop <= y) current = s.id;
  }
  navLinks.forEach((a) =>
    a.classList.toggle("is-active", a.getAttribute("href") === "#" + current)
  );
}
document.addEventListener("scroll", setActive);
setActive();

// --- Reveal on scroll ---
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// --- Year ---
document.getElementById("year").textContent = new Date().getFullYear();

// --- Contact form: open mail client ---
function sendMail(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("message").value.trim();
  const subject = encodeURIComponent("Portfolio Contact — " + name);
  const body = encodeURIComponent(`From: ${name} <${email}>\n\n${msg}`);
  window.location.href = `mailto:ahmedsafwat27as@gmail.com?subject=${subject}&body=${body}`;
  return false;
}
window.sendMail = sendMail;
