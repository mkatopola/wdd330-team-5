import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
<<<<<<< HEAD
  return `
    <li class='product-card'>
        <a href='product_pages/?product=${product.Id}'>
            <img src='${product.Image}' alt='Image of ${product.Name}'>
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
    const list = await this.dataSource.getData();
    this.renderList(list);
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
=======
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
    </li>`;
  }

export default class ProductList {
    constructor(category, dataSource, listElement) {
      // We passed in this information to make our class as reusable as possible.
      // Being able to define these things when we use the class will make it very flexible
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
    async init() {
      // our dataSource will return a Promise...so we can use await to resolve it.
      const list = await this.dataSource.getData();
      // render the list
      this.renderList(list);
    }

    renderList(list) {
        // call the renderListWithTemplate function and pass in the template function, the parent element, the list, and the position
        renderListWithTemplate(productCardTemplate, this.listElement, list, 'afterbegin', true);
      }
    
    //render before doing first stretch
    //renderList(list) {
      // map over the list and create an array of HTML strings
      //const htmlList = list.map(productCardTemplate);
      // set the innerHTML of the listElement to the htmlList array joined together
      //this.listElement.insertAdjacentHTML('afterbegin', htmlList.join(''));
    //}
   
>>>>>>> 5b7835a53eb947a2907d30136fc3b504f2a983e9
}