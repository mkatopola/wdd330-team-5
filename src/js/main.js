import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";


const productData = new ProductData("tents");
const listOfProducts = document.querySelector(".product-list");
// const productCards = listOfProducts.querySelectorAll(".product-card");
const productList = new ProductList("tents", productData, listOfProducts);

productList.init();

loadHeaderFooter();

