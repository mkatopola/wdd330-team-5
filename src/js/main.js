// import productData module into main.js
import ProductData from "./ProductData.mjs";

//import productList module into main.js as type of module
import ProductList from "./ProductList.mjs";

//create an instance of ProductData
const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");

//create an instance of ProductList
const productList = new ProductList("tents", dataSource, Element);

//initialize the productList
productList.init();
