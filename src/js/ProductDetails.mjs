
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

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.product.count = 0;
    this.currentItem = 0;
    this.maxItems = 0;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails('main');
    document.getElementById('addToCart')
      .addEventListener('click', () => this.addToCart()); 
    // the program will show the ExtraImages if they exist, or PrimaryLarge image
    // if they don't. maxItems have the quantity of images.
    if (this.product.Images.ExtraImages.length == 0) {
        this.maxItems = 1;
      } else {
        this.maxItems = this.product.Images.ExtraImages.length;
      }    

    const items = document.querySelectorAll('.item');
    items[this.currentItem].classList.add('current-item');

    // button left and right of carousel have class = control
    const controls = document.querySelectorAll('.control');

    controls.forEach((control) => {
      control.addEventListener('click', () => {
        const isLeft = control.classList.contains('arrow-left');
        if (isLeft) {
          this.currentItem -= 1;
        } else {
          this.currentItem += 1;
        }
        if (this.currentItem >= this.maxItems) {
          this.currentItem = 0;
        }
        if (this.currentItem < 0) {
          this.currentItem = this.maxItems - 1;
        }
        // elements with class item are the images of the product.
        
        items.forEach((item) => {
          item.classList.remove('current-item')
        })
        items[this.currentItem].classList.add('current-item');
        items[this.currentItem].scrollIntoView({
          inline: 'center',
          behavior: 'smooth'
        });
      });
    });    
    
  }

  addToCart() {
    checkCart();

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

  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML('afterBegin', productDetailsTemplate(this.product));
  }
}