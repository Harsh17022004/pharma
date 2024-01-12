function toggleReview() {
  const reviewToggle = document.querySelector("#reviewToggle");
  const reviewClose = document.querySelector("#reviewClose");
  reviewToggle.addEventListener("click", () => {
    reviewToggle.classList.add("invisible");
    reviewClose.classList.remove("invisible");
  });
  reviewClose.addEventListener("click", () => {
    reviewToggle.classList.remove("invisible");
    reviewClose.classList.add("invisible");
  });
}

toggleReview();
