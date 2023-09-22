import{g as t}from"./utils-7f8c7870.js";function e(){const r=t("so-cart"),a=r?r.map(c=>s(c)):"<p><em>Your cart is empty</em></p>";Array.isArray(a)?document.querySelector(".product-list").innerHTML=a.join(""):document.querySelector(".product-list").innerHTML=a}function s(r){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${r.Image}"
      alt="${r.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${r.Name}</h2>
  </a>
  <p class="cart-card__color">${r.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${r.FinalPrice}</p>
</li>`}e();
