const btnTheme = document.querySelector("#btn-theme");
btnTheme.classList = "d-flex gap-2 text-decoration-none align-items-center p-1";
const accordion = document.querySelector(".accordion");
const toggleTheme = () => {
  if (document.body.classList.contains("dark")) {
    btnTheme.innerHTML = `<i class="fa-solid fa-sun"></i> <p>Theme</p>`;
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  } else {
    btnTheme.innerHTML = `<i class="fa-solid fa-moon"></i> <p>Theme</p>`;
    document.body.classList.add("dark");
    document.body.classList.remove("light");
  }
};
