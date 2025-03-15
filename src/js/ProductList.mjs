import { renderListWithTemplate } from '../utils.mjs';

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    this.products = await this.dataSource.getData();
    this.renderList(this.products);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, 'afterbegin', true);
  }
}

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h3 class="card__name">${product.Name}</h3>
        <p class="card__brand">${product.Brand.Name}</p>
        <p class="product-card__price">$${product.ListPrice}</p>
      </a>
    </li>
  `;
}