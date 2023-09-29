import{a as r,b as o,l as d}from"./utils-edcc6eb7.js";/* empty css              */import{P as s}from"./ProductData-df3c18b6.js";function i(t){const e=t.ListPrice/t.SuggestedRetailPrice;let a=0;return e==1?a="":a=` - <span class="discount">${100-Math.round(e*100)}% off!</span>`,`<section class="product-detail">
    <h3>${t.Brand.Name}</h3>
    <h2>${t.NameWithoutBrand}</h2>
    <img src="${t.Image}" alt="${t.NameWithoutBrand}" />

    <p class="product-card__price">$${t.FinalPrice}${a}</p></a>
    <p class="product__color">${t.Colors[0].ColorName}</p>
      <p class="product__description">${t.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${t.Id}">Add to Cart</button>
      </div>
    </section>`}class c{constructor(e,a){this.productId=e,this.product={},this.dataSource=a}async init(){this.product=await this.dataSource.findProductById(this.productId),this.renderProductDetails("main"),document.getElementById("addToCart").addEventListener("click",()=>this.addToCart())}addToCart(){r("so-cart",this.product)}renderProductDetails(e){document.querySelector(e).insertAdjacentHTML("afterBegin",i(this.product))}}const n=new s("tents"),l=o("product"),u=new c(l,n);u.init();d();
