// Build project cards from projects.js
const container = document.getElementById("projects");

function createCard(project, index) {
  const card = document.createElement("article");
  card.className = "card" + (index % 2 === 1 ? " card--reverse" : "");

  let image;
  if (project.image) {
    image = document.createElement("img");
    image.src = project.image;
    image.alt = project.imageAlt || project.title + " preview";
    image.loading = "lazy";
  } else {
    image = document.createElement("div");
    image.setAttribute("aria-hidden", "true");
  }
  image.classList.add("card__image");

  const body = document.createElement("div");
  body.className = "card__body";

  const title = document.createElement("h2");
  title.className = "card__title";
  title.textContent = project.title;
  body.appendChild(title);

  if (project.role) {
    const meta = document.createElement("p");
    meta.className = "card__meta";
    meta.textContent = project.role;
    body.appendChild(meta);
  }

  const desc = document.createElement("p");
  desc.textContent = project.description;
  body.appendChild(desc);

  if (project.link) {
    const a = document.createElement("a");
    a.className = "card__link";
    a.href = project.link;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = project.linkText || "View Project";
    body.appendChild(a);
  }

  card.append(image, body);
  return card;
}

if (!Array.isArray(projects) || projects.length === 0) {
  const empty = document.createElement("p");
  empty.className = "projects__empty";
  empty.textContent = "Projects coming soon.";
  container.appendChild(empty);
} else {
  projects.forEach((p, i) => container.appendChild(createCard(p, i)));
}

// Fade cards in on scroll
const cards = document.querySelectorAll(".card");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  cards.forEach((c) => observer.observe(c));
} else {
  cards.forEach((c) => c.classList.add("is-visible"));
}

// Explore Now -> smooth scroll to projects
document.getElementById("explore-btn").addEventListener("click", () => {
  container.scrollIntoView({ behavior: "smooth" });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();
