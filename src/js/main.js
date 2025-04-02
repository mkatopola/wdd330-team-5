import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";


const productData = new ProductData("tents");
const listOfProducts = document.querySelector(".product-list");
// const productCards = listOfProducts.querySelectorAll(".product-card");
const productList = new ProductList("tents", productData, listOfProducts);

// Add sorting buttons dynamically
const sortContainer = document.createElement("div");
sortContainer.classList.add("sort-container");
sortContainer.innerHTML = `
  <button id="sortByName">Sort by Name</button>
  <button id="sortByPrice">Sort by Price</button>
`;
listOfProducts.insertAdjacentElement("beforebegin", sortContainer);

productList.init();

loadHeaderFooter();

