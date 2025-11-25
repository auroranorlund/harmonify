import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
  getCartTotal,
} from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems != null) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    cartItems.forEach((item) => {
      document
        .getElementById(item.Id)
        .addEventListener("click", removeProductFromCart.bind(this, item.Id));
    });
    document.getElementById("cart-total").innerHTML =
      `Total: $${getCartTotal()}`;
  } else {
    document.querySelector(".product-list").innerHTML = `Your cart is empty.`;
    document.querySelector(".cart-footer").innerHTML = ``;
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <button class="cart-card__remove" id="${item.Id}">X</button>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function removeProductFromCart(itemId) {
  const cartItems = getLocalStorage("so-cart");
  const newCartItems = cartItems.filter((item) => item.Id != itemId);
  setLocalStorage("so-cart", newCartItems);
  renderCartContents();
}

renderCartContents();
