import Swal from "sweetalert2";

export function scrollToSection(id) {
  const element = document.getElementById(id);
  element.scrollIntoView({ behavior: "smooth" });
}

export function showErr(text) {
  GlobalToast.fire({
    icon: "error",
    title: `Error: ${text}`,
    timer: 3000,
  });
}

// Load data from localStorage
export const load = (screen, key) => JSON.parse(localStorage.getItem(`${screen}.${key}`));

// shows loader if loading else result
export const getResult = (value, Loader) => (value ? value : <Loader />);

export const GlobalToast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

