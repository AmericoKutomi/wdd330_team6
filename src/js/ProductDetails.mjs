import { setArrLocalStorage } from './utils.mjs';

function productDetailsTemplate(product) {
  const discount = product.ListPrice / product.SuggestedRetailPrice;
  let percentOff = 0;
  if(discount == 1){
      percentOff = ''
  }
  else{
      let percent = 100 - (Math.round(discount * 100));
      percentOff = ` - <span class="discount">${percent}% off!</span>`;
  }

  return `<section class="product-detail">
    <h3>${product.Brand.Name}Butt</h3>
    <h2>${product.NameWithoutBrand}</h2>
    <img src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}" />

    <p class="product-card__price">$${product.FinalPrice}${percentOff}</p></a>
    <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">${product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    </section>`;  
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails('main');
    document.getElementById('addToCart')
        .addEventListener('click', () => this.addToCart());
  }
  addToCart() {
    setArrLocalStorage('so-cart', this.product);
  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML('afterBegin', productDetailsTemplate(this.product));
  }
}