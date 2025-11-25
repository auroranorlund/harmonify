import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");

document.getElementById("listing-title").innerHTML =
  `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`;

if (category == "sleeping-bags") {
  document.getElementById("listing-title").innerHTML =
    `Top Products: Sleeping Bags`;
}

const dataSource = new ExternalServices();

const list = new ProductList(
  category,
  dataSource,
  document.querySelector(".product-list"),
);

list.init();
