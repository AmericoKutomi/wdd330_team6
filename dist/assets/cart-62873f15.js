import{g as e}from"./utils-7f8c7870.js";function o(){const t=e("so-cart"),r=n(t),a=r?"<p><em>Your cart is empty</em></p>":t.map(c=>i(c));r?document.querySelector(".product-list").innerHTML=a:document.querySelector(".product-list").innerHTML=a.join(""),r||(document.querySelector(".products").innerHTML+=l(s(t)))}function n(t){return Object.is(t,null)}function s(t){return t.reduce((r,a)=>r+a.FinalPrice,0)}function l(t){return`<div class="cart-footer hide"><p class="cart-total">Total: $${t}</p></div>`}function i(t){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${t.Image}"
      alt="${t.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <p class="cart-card__color">${t.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${t.FinalPrice}</p>
</li>`}o();
