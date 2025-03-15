import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
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
   
}