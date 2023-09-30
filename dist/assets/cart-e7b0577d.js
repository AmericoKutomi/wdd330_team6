import{l,g as s,s as o}from"./utils-edcc6eb7.js";/* empty css              */const n=document.querySelector(".product-list"),i=document.getElementById("cart-total");function c(){const t=s("so-cart");d(t)?n.innerHTML="":n.innerHTML=t.map(e=>p(e)),t.forEach(e=>{document.getElementById(e.Id).addEventListener("click",()=>u(e.Id))});const a=m(t);i.innerHTML=!a==0?`Cart Total: $${a}`:"<em>Your Cart is Empty</em>"}function m(t){return t.reduce((r,a)=>r+a.FinalPrice,0)}function d(t){return Object.is(t,null)||t.length===0}function u(t){const r=s("so-cart");for(let a=0;a<r.length;a++){const e=r[a];if(t===e.Id){r.shift(r[e]),o("so-cart",r),c();return}}r.forEach(a=>{t!==a.Id&&(o("so-cart",r),c())})}function p(t){return`<li class='cart-card divider'>
  <div id='${t.Id}' title='Remove Item' class='remove_item'>❌</div>
  <a href='#' class='cart-card__image'>
    <img
      src='${t.Image}'
      alt='${t.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${t.Name}</h2>
  </a>
  <p class='cart-card__color'>${t.Colors[0].ColorName}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${t.FinalPrice}</p>
</li>`}c();l();
