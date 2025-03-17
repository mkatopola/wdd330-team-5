import { getLocalStorage, setLocalStorage, qs } from "./utils.mjs";

const products = document.querySelector(".products");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const productList = qs(".product-list");

  if (cartItems.length === 0) {
    productList.innerHTML = "<p>Your cart is empty!</p>";
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  products.querySelector(".product-list").innerHTML = htmlItems.join("");
  renderCartTotal(cartItems);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function cartTotal(cartItems) {
  let total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0)
  
  return `
  <div class="cart-footer">
    <p class="cart-total">Total: $${total.toFixed(2)}</p>
  </div>
  `;
}

function renderCartTotal(cartItems) {
  const cartFooter = document.querySelector(".cart-footer");

  if (cartFooter) {
    cartFooter.remove();
  }

  if (cartItems.length > 0) {
    products.insertAdjacentHTML("beforeend", cartTotal(cartItems));
  }

}

renderCartContents();
