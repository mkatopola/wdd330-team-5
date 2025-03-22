import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class='product-card'>
        <a href='product_pages/?product=${product.Id}'>
            <img src='${product.Images.PrimaryMedium}' alt='Image of ${product.Name}'>
            <h2 class='card__brand'>${product.Brand.Name}</h2>
            <h3 class='card_name'>${product.NameWithoutBrand}</h3>
            <p class='product-card__price'>$${product.ListPrice.toFixed(2)}</p>
        </a>
    </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // the dataSource will return a Promise... so you can use await
    // to resolve it
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
    document.querySelector(".title").textContent = this.category;
  }

  renderList(list) {
    // Like this:
    // renderList(product) {
    // this.listElement.innerHTML = product.map(productCardTemplate).join("");
    // Or like this before renderListWithTemplate:
    // const htmlStrings = list.map(productCardTemplate);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}