import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

loadHeaderFooter();

const products = document.querySelector(".products");

// Need a Function to remove an item from the cart
function removeFromCart(productId) {
  let cartItems = getLocalStorage("so-cart");

  // Ensure cartItems is an array
  if (!Array.isArray(cartItems)) {
    cartItems = []; // If it's not an array, set it to an empty array
  }

  // Filter out the item you want to remove from the cart
  // New!! I used findIndex function instead of filter
  const index = cartItems.findIndex((item) => item.Id === productId);
  // const index = cartItems.findIndex((item) => item.Id === productId);

  if (index !== -1) {
    cartItems.splice(index, 1); // Remove only one occurrence
  }

  // Update the cart in localStorage and re-render
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  products.querySelector(".product-list").innerHTML = htmlItems.join("");
  renderCartTotal(cartItems);

  // Add event listeners to the "Remove" buttons after rendering the items
  document.querySelectorAll(".remove").forEach((button) => {
    button.addEventListener("click", () => {
      removeFromCart(button.getAttribute("data-id"));
      // console.log(button.getAttribute("data-id"));
    });
  });

  renderCartTotal(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="remove" data-id="${item.Id}">X</button>
</li>`;

  return newItem;
}

function renderCartTotal(cartItems) {
  const listFooter = document.querySelector(".list-footer");
  let cartSubtotal = document.querySelector(".list-total");

  const cartTotal = function (items) {
    let total = items.reduce((sum, item) => sum + item.FinalPrice, 0);

    if (cartSubtotal) {
      cartSubtotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    if (cartItems.length > 0) {
      listFooter.classList.remove("hide");
    }
  };

  cartTotal(cartItems);
}

renderCartContents();
