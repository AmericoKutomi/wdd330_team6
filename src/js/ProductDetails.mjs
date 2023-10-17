import { setArrLocalStorage, setLocalStorage, getLocalStorage, checkCart } from './utils.mjs';
import { UserAlert } from './alert';

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

  let imageDiv = 
  `<div class="container">
    <button class="arrow-left control" aria-label="Previous image">&#9664;</button> 
    <button class="arrow-right control" aria-label="Next image">&#9654;</button>
    <div class="gallery-wrapper">
      <div class="gallery">`


  if (product.Images.ExtraImages.length == 0) {
    imageDiv = `<img src="${product.Images.PrimaryLarge}" alt="${product.   NameWithoutBrand}" />`;
  } else {
    imageDiv += product.Images.ExtraImages.map( (image) => `<img class="item" src="${image.Src}" alt="${image.Title}" />`);
  }
  imageDiv += 
  `   </div>
    </div>
  </div>`;

  return `<section class="product-detail">
    <h3>${product.Brand.Name}Butt</h3>
    <h2>${product.NameWithoutBrand}</h2>
    ${imageDiv}
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
    this.addToCartAlert = new UserAlert(document.querySelector('main'));
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails('main');
    document.getElementById('addToCart')
      .addEventListener('click', (event) => this.addToCart(event));
  }

  addToCart(event) {
    checkCart();
  
  addToCart() {
    wiggleCart();
    
    const cartItems = getLocalStorage('so-cart');
    const isEmpty = isCartEmpty(cartItems);
    
    // console.log(isEmpty);
    if (isEmpty) {
      // console.log(cartItems);
      this.product.count = 1;
      setArrLocalStorage('so-cart', this.product);
      alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
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
        alertMessage(`${this.product.NameWithoutBrand}: one more added to the quantity!`);
        // console.log(getLocalStorage('so-cart'));
        return;
      }
    });
    
    if (!found) {
      this.product.count = 1;
      setArrLocalStorage('so-cart', this.product);
      alertMessage(`${this.product.NameWithoutBrand} added to cart!`);
    }

    this.addToCartAlert.render({
      message: `Added ${event.target.parentNode.parentNode.querySelector("h3").innerText} to cart`,
      background: "white",
      color: "blue"
  });

  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML('afterBegin', productDetailsTemplate(this.product));
  }
}
