import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from './utils.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');

  const htmlItems = cartItems
    ? cartItems.map((item) => cartItemTemplate(item))
    : `<p><em>Your cart is empty</em></p>`;

  Array.isArray(htmlItems)
    ? (document.querySelector('.product-list').innerHTML = htmlItems.join(''))
    : (document.querySelector('.product-list').innerHTML = htmlItems);

  //Adds event listener to each 'X'
  cartItems.forEach((item) => {
    document
      .getElementById(item.Id)
      .addEventListener('click', () => removeCartItem(item.Id));
  });
}

function removeCartItem(id) {
  //Retrieve local Storage
  const cartItems = getLocalStorage('so-cart');
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    if (id === item.Id) {
      //Delete Item
      cartItems.shift(cartItems[item]);
      //Update Local Storage
      setLocalStorage('so-cart', cartItems);
      renderCartContents();
      return;
    }
  }

  cartItems.forEach((item) => {
    if (id === item.Id) {
      // let red = cartItems.pop(item);
      // console.log(red);
      return;
    }

    // console.log('hello');
    setLocalStorage('so-cart', cartItems);
    renderCartContents();
  });
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
loadHeaderFooter();
