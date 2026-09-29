document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("library-story-grid");
  const buttons = document.querySelectorAll(".filter-button");

  function render(filter = "all") {
    const stories = filter === "all"
      ? BIBLEQUEST_STORIES
      : BIBLEQUEST_STORIES.filter(story => story.category === filter);

    grid.innerHTML = stories.map(storyCard).join("");
  }

  render();

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active-filter"));
      button.classList.add("active-filter");
      render(button.dataset.filter);
    });
  });
});
