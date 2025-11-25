// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// return parameter from URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}
// render HTML list template
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = ``;
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}
// render HTML template
export function renderWithTemplate(template, parentElement, list, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}
// load HTML template
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}
// load header and footer
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  renderWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
}
// Get total $ amount of cart
export function getCartTotal() {
  const cartItems = getLocalStorage("so-cart");
  let cartTotal = 0;
  cartItems.forEach((item) => {
    cartTotal += item.FinalPrice;
  })
  return cartTotal;
}