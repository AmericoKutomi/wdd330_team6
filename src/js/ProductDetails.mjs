
import { setArrLocalStorage, setLocalStorage, getLocalStorage, checkCart } from './utils.mjs';


function productDetailsTemplate(product) {
  
  const discount = product.ListPrice / product.SuggestedRetailPrice;
  let percentOff = 0;
  if (discount == 1) {
    percentOff = ''
  }
  else {
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
function isCartEmpty(cartList) {
  return Object.is(cartList, null) || cartList.length === 0;
}

function wiggleCart(){
  const cartPic = document.getElementById('cartPic');

  cartPic.setAttribute('width', '30px');
  setTimeout(function(){
    cartPic.setAttribute('width', '25px');  
  }, 500);
  
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.product.count = 0;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails('main');
    document.getElementById('addToCart')
      .addEventListener('click', () => this.addToCart());
  }


  
  addToCart() {
    wiggleCart();
    
    const cartItems = getLocalStorage('so-cart');
    const isEmpty = isCartEmpty(cartItems);
    
    // console.log(isEmpty);
    if (isEmpty) {
      // console.log(cartItems);
      this.product.count = 1;
      setArrLocalStorage('so-cart', this.product);
      // console.log(getLocalStorage('so-cart'));
      return;
    }

    let found = false;
    
    // If it is already in Local Storage it will add 1 to quantity.
    cartItems.forEach(item => {
      if (this.productId == item['Id']) {
        item.count += 1;
        found = true;
        
        //Update Local Storage
        setLocalStorage('so-cart', cartItems);
        // console.log(getLocalStorage('so-cart'));
        return;
      }
    });
    
    if (!found) {
      this.product.count = 1;
      setArrLocalStorage('so-cart', this.product);
    }
    // if cartItems. 
    checkCart();
    
  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML('afterBegin', productDetailsTemplate(this.product));
  }
}
