(function () {
  const typing = document.querySelector(".typing");
  const texts = [
    "Front-End Developer",
    "JavaScript Ninja",
    "UI/UX Designer",
  ];
  let index = 0,
    charIndex = 0;

  function type() {
    if (!typing) return;
    if (charIndex < texts[index].length) {
      typing.textContent += texts[index][charIndex];
      charIndex++;
      setTimeout(type, 90);
    } else {
      setTimeout(erase, 1200);
    }
  }

  function erase() {
    if (!typing) return;
    if (charIndex > 0) {
      typing.textContent = texts[index].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 40);
    } else {
      index = (index + 1) % texts.length;
      setTimeout(type, 300);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (typing && texts.length) setTimeout(type, 500);
  });
})();

// Dark Mode Toggle
document.querySelector(".dark-mode-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Smooth Scroll for Navigation Links
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});