import Swal from "sweetalert2";

export function scrollToSection(id) {
  const element = document.getElementById(id);
  element.scrollIntoView({ behavior: "smooth" });
}

export function showErr(text) {
  GlobalToast.fire({
    icon: "error",
    title: text,
    timer: 3000,
  });
}

// Load data from localStorage
export const load = (screen, key) => JSON.parse(localStorage.getItem(`${screen}.${key}`));
export const GlobalToast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

export function truncate(str) {
  const parts = str.split(".");
  if (str.length <= 10) return str;

  const fileExtension = parts.pop();
  const truncatedFileName = parts.map((part) => part.substring(0, 7)).join(".") + "...";
  return `${truncatedFileName}.${fileExtension}`;
}
