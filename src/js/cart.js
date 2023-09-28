import { getLocalStorage } from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const isEmpty = isCartEmpty(cartItems);

  const htmlItems = !isEmpty ? cartItems.map((item) => cartItemTemplate(item))
    : `<p><em>Your cart is empty</em></p>`;
  
  !isEmpty ?  
    document.querySelector(".product-list").innerHTML = htmlItems.join("")
    : document.querySelector(".product-list").innerHTML = htmlItems;

  if (!isEmpty) document.querySelector('.products').innerHTML += cartTotalTemplate(getCartTotal(cartItems));

  function isCartEmpty(cartList) {
    return Object.is(cartList, null);
  }
  
  function getCartTotal(cartItems) {
    return cartItems.reduce((total, item) => (total + item.FinalPrice), 0)
  }
  
  function cartTotalTemplate(amount) {
    const total = `<div class="cart-footer hide"><p class="cart-total">Total: $${amount}</p></div>`;
    return total;
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <div id='${item.Id}' title='Remove Item' class='remove_item'>❌</div>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
