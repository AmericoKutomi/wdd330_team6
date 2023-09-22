import{s as r,a as d}from"./utils-7f8c7870.js";import{P as o}from"./ProductData-642f098c.js";function c(t){return`<section class="product-detail">
            <h3>${t.Brand.Name}</h3>
            <h2>${t.NameWithoutBrand}</h2>
            <img src="${t.Image}" alt="${t.NameWithoutBrand}" />
            <p class="product-card__price">$${t.FinalPrice}</p>
            <p class="product__color">${t.Colors[0].ColorName}</p>
            <p class="product__description">${t.DescriptionHtmlSimple}</p>
            <div class="product-detail__add">
                <button id="addToCart" data-id="${t.Id}">Add to Cart</button>
            </div>
        </section>`}class i{constructor(a,e){this.productId=a,this.product={},this.dataSource=e}async init(){this.product=await this.dataSource.findProductById(this.productId),this.renderProductDetails("main"),document.getElementById("addToCart").addEventListener("click",()=>this.addToCart())}addToCart(){r("so-cart",this.product)}renderProductDetails(a){document.querySelector(a).insertAdjacentHTML("afterBegin",c(this.product))}}const s=new o("tents"),n=d("product"),l=new i(n,s);l.init();
