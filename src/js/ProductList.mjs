import { renderListWithTemplate, getLocalStorage, setLocalStorage } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class='product-card'>
        <a href='/product_pages/index.html?product=${product.Id}'>
            <img src='${product.Images.PrimaryMedium}' alt='Image of ${product.Name}' />
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
    this.list = [];
  }

  async init() {
    // Get the product data and store it for later sorting.
    this.list = await this.dataSource.getData(this.category);
    // Dynamically insert the sort control.
    this.insertSortControl();
    // Render the initial unsorted list.
    this.renderList(this.list);
    // Set the page title.
    document.querySelector(".title").textContent = this.category;
    // Attach event listener to the sort control.
    this.attachSortListener();
  }

  insertSortControl() {
    // Look for a container to insert the control. Preferably a parent with a class or fallback to listElement's parent.
    const container =
      document.querySelector(".product-list-container") ||
      this.listElement.parentElement;
    // Only insert if it hasn't been added already.
    if (!document.getElementById("sortOptions")) {
      const sortControl = document.createElement("div");
      sortControl.classList.add("sort-control");
      sortControl.innerHTML = `
        <label for="sortOptions">Sort by: </label>
        <select id="sortOptions">
          <option value="">-- Select --</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
        </select>`;
      container.insertBefore(sortControl, this.listElement);
    }
  }

  attachSortListener() {
    const sortSelect = document.getElementById("sortOptions");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        const sortBy = e.target.value;
        this.sortList(sortBy);
      });
    }
  }

  sortList(sortBy) {
    // Clone the list so as not to modify the original data.
    let sortedList = [...this.list];
    if (sortBy === "name") {
      // Sort alphabetically by NameWithoutBrand.
      sortedList.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
    } else if (sortBy === "price") {
      // Sort numerically by ListPrice.
      sortedList.sort((a, b) => a.ListPrice - b.ListPrice);
    }
    // Render the sorted list.
    this.renderList(sortedList);
  }

  renderList(list) {
    // Use the helper to clear and re-render the list.
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}

