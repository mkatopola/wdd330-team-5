import { renderListWithTemplate, getLocalStorage, setLocalStorage } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class='product-card'>
        <a href='/product_pages/index.html?product=${product.Id}'>
            <img src='${product.Images.PrimaryMedium}' alt='Image of ${product.Name}'>
            <h2 class='card__brand'>${product.Brand.Name}</h2>
            <h3 class='card_name'>${product.NameWithoutBrand}</h3>
            <p class='product-card__price'>$${product.ListPrice.toFixed(2)}</p>
        </a>
        <button id="quickAddToCart" data-id="${product.Id}">Add to Cart</button>
    </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector(".title").textContent = this.category;

    document.querySelectorAll("#quickAddToCart").forEach((button) => {
      button.addEventListener("click", (event) => this.addToCart(event));
    });
  }

  addToCart(event) {
    // Get ID from button's data
    const productId = event.target.getAttribute("data-id");

    // Find the product data
    this.dataSource.findProductById(productId).then((product) => {
        
        let cartItems = getLocalStorage("so-cart");

        if (!Array.isArray(cartItems)) {
            cartItems = [];
        }

        cartItems.push(product);
        setLocalStorage("so-cart", cartItems);
    });
  }
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
