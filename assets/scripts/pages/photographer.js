import { closeModal, displayModal } from "../utils/contactForm.js";

const close = document.getElementById("close");
const open = document.getElementById("open");

close.addEventListener("click", () => closeModal());
open.addEventListener("click", () => displayModal());
