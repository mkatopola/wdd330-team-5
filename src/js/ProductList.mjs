import { renderListWithTemplate } from './utils.mjs';
// ProductList.mjs
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
  renderProductList(products); {
    renderListWithTemplate(productCardTemplate, this.listElement, ProductList);
  }
  

export default class ProductList {
    constructor(category, dataSource, listElement) {
      this.category = category; // The product category
      this.dataSource = dataSource; // The data source (e.g., API or JSON data handler)
      this.listElement = listElement; // The HTML element to render the product list
    }
  
    async init() {
      try {
        // Use the dataSource to fetch the list of products
        const products = await this.dataSource.getData(this.category);
        this.renderProductList(products); // Call the method to render the product list
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }
  
    //renderProductList(products) {
      // Clear the list element
      //this.listElement.innerHTML = '';
  
      // Loop through the products and create HTML for each product card
     // products.forEach(product => {
       // const productCard = this.createProductCard(product);
       // this.listElement.appendChild(productCard); // Append the card to the list element
      //});
   // }
  
    createProductCard(product) {
      // Create a container element for the product card
      const card = document.createElement('div');
      card.className = 'product-card'; // Add a class for styling
  
      // Add product details to the card
      card.innerHTML = `
        <h3>${product.name}</h3>
        <img src="${product.image}" alt="${product.name}">
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
      `;
  
      return card;
    }
  }
  