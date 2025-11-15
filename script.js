const minSlider = document.getElementById("minSlider");
const maxSlider = document.getElementById("maxSlider");
const minLabel = document.getElementById("minLabel");
const maxLabel = document.getElementById("maxLabel");
const sliderFill = document.getElementById("sliderFill");

function updateSlider() {
  let minVal = parseInt(minSlider.value);
  let maxVal = parseInt(maxSlider.value);

  if (minVal > maxVal - 10) minVal = maxVal - 10;
  if (maxVal < minVal + 10) maxVal = minVal + 10;

  minSlider.value = minVal;
  maxSlider.value = maxVal;

  minLabel.textContent = "$" + minVal;
  maxLabel.textContent = "$" + maxVal;

  const percentMin = (minVal / 200) * 100;
  const percentMax = (maxVal / 200) * 100;

  sliderFill.style.left = percentMin + "%";
  sliderFill.style.width = percentMax - percentMin + "%";
}

minSlider.addEventListener("input", updateSlider);
maxSlider.addEventListener("input", updateSlider);
updateSlider();

const colorOptions = document.querySelectorAll(".color-option");
colorOptions.forEach((option) => {
  option.addEventListener("click", () => {
    option.classList.toggle("selected");
  });
});

const sizeOptions = document.querySelectorAll(".size-option");
sizeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    sizeOptions.forEach((opt) => opt.classList.remove("selected"));
    option.classList.add("selected");
  });
});

const newsletterForm = document.querySelector(".newsletter-form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
    newsletterForm.reset();
  });
}

const filterBtn = document.querySelector(".filter-toggle-btn");
const sidebar = document.querySelector(".sidebar");
const closeFilterBtn = document.querySelector(".close-filter-btn");

filterBtn?.addEventListener("click", () => sidebar.classList.add("active"));
closeFilterBtn?.addEventListener("click", () =>
  sidebar.classList.remove("active")
);

document.addEventListener("DOMContentLoaded", () => {
  const filterSections = document.querySelectorAll(".filter-section");

  filterSections.forEach((section) => {
    const title = section.querySelector(".filter-title");
    if (!title) return;
    const arrow = section.querySelector(".filter-title img");
    console.log(arrow);
    const itemsContainer = section.querySelector(".filter-items");
    console.log(itemsContainer);
    title.addEventListener("click", () => {
      const isCollapsed = section.classList.toggle("collapsed");

      if (itemsContainer) {
        itemsContainer.style.display = isCollapsed ? "none" : "block";
      }

      if (arrow) {
        arrow.src = isCollapsed
          ? "asset/filter-arrow-down.svg"
          : "asset/filter-arrow-up.svg";
      }
    });
  });
});
