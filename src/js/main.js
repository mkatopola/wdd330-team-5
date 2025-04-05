import { loadHeaderFooter } from "./utils.mjs";
// here i come
import Alert from "./alert.mjs";

const alertInstance = new Alert("/json/alerts.json");
alertInstance.render();
//

loadHeaderFooter();

document
  .getElementById("newsletter-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const messageElement = document.getElementById("message");

    if (email) {
      // Simulate an API call to submit the email (replace with actual backend logic)
      setTimeout(() => {
        messageElement.textContent = `Thank you for subscribing with ${email}!`;
        messageElement.style.color = " dark green";
        document.getElementById("email").value = ""; // Clear the input field
      }, 500);
    } else {
      messageElement.textContent = "Please enter a valid email address.";
      messageElement.style.color = "red";
    }
  });

  function showWelcomeModal() {
    const modalShown = localStorage.getItem("welcome-modal-shown");
  
    if (!modalShown) {
      const modal = document.getElementById("welcome-modal");
      modal.classList.remove("hidden");
  
      document.querySelector(".close-button").addEventListener("click", () => {
        modal.classList.add("hidden");
        localStorage.setItem("welcome-modal-shown", "true");
      });
    }
  }
  
  // Call this when the page loads
  document.addEventListener("DOMContentLoaded", showWelcomeModal);
  