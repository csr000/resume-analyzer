import swal from "sweetalert";

export function scrollToSection(id) {
  const element = document.getElementById(id);
  element.scrollIntoView({ behavior: "smooth" });
}

export function showErr(text) {
  swal({
    title: "Error",
    text,
    icon: "error",
    button: "OK",
  });
}

// Load data from localStorage
export const load = (screen, key) => JSON.parse(localStorage.getItem(`${screen}.${key}`));
