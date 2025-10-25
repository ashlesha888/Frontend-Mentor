fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("cards-container");
    const template = document.getElementById("card-template");

    data.forEach(item => {
      const clone = template.content.cloneNode(true);
      const cardEl = clone.querySelector(".card");
      const switchInput = clone.querySelector(".switch input"); // the checkbox

      // Fill card content
      clone.querySelector(".card-logo").src = item.logo;
      clone.querySelector(".title").textContent = item.title;
      clone.querySelector(".description").textContent = item.description;

      // Store active status in dataset for filtering
      cardEl.dataset.isActive = item.isActive.toString();

      // Set initial state of the checkbox
      switchInput.checked = item.isActive;

      // Toggle isActive when switch is changed
      switchInput.addEventListener("change", () => {
        item.isActive = switchInput.checked;                 // update memory
        cardEl.dataset.isActive = item.isActive.toString(); // update dataset for filtering
      });

      // Remove button with animation
      clone.querySelector(".remove-button").addEventListener("click", () => {
        cardEl.style.height = cardEl.offsetHeight + "px";
        requestAnimationFrame(() => cardEl.classList.add("removing"));
        cardEl.addEventListener("transitionend", () => cardEl.remove(), { once: true });
      });

      container.appendChild(clone);
    });

    // Filter buttons
    const showCards = filter => {
      container.querySelectorAll(".card").forEach(card => {
        if(filter === "all") card.style.display = "inline-block";
        else if(filter === "active") card.style.display = card.dataset.isActive === "true" ? "inline-block" : "none";
        else if(filter === "inactive") card.style.display = card.dataset.isActive === "false" ? "inline-block" : "none";
      });
    };

    document.getElementById("all-button").addEventListener("click", () => showCards("all"));
    document.getElementById("active-button").addEventListener("click", () => showCards("active"));
    document.getElementById("inactive-button").addEventListener("click", () => showCards("inactive"));
  })
  .catch(console.error);


// theme toggle (optional)
window.onload = () => {
    const toggleBtn = document.getElementById("theme");
    toggleBtn.addEventListener("click", () => {
      document.querySelectorAll('*').forEach(el => el.classList.toggle('dark-mode'));
      const icon = toggleBtn.querySelector(".theme-logo");
      const mainLogo=document.querySelector(".extension-logo");
      if (document.body.classList.contains("dark-mode")) {
          icon.src = "assets/images/icon-sun.svg";
          mainLogo.src="assets/images/Untitled.svg";
      } else {
          icon.src = "assets/images/icon-moon.svg";
          mainLogo.src="assets/images/logo2.svg";
      }
    });
};
