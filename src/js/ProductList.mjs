import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
    const discount = product.ListPrice / product.SuggestedRetailPrice 
    let percentOff = 0
    if(discount == 1){
        percentOff = ''
    }
    else{
        let percent = 100 - (Math.round(discount * 100));
       
        percentOff = ` - <span class="discount">${percent}% off!</span>`
    }
    return `<li class="product-card">
  <a href="/product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Images.PrimaryMedium}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}${percentOff}</p></a>
</li>`;
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.topList = [];
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        if (this.topList.length !== 0) {
            this.renderList(list.filter((product) => this.topList.indexOf(product.Id) !== -1));
        } else {
            this.renderList(list);
        }
        document.querySelector('.title').innerHTML = this.category;
    }
    async renderList(list, clear = false) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, 'afterbegin', clear);
    }

    setTopList(topProducts) {
        this.topList = topProducts;
    }

    async sortBy(order_field) {
        const list = await this.dataSource.getData(this.category);
        let sortedList = [];
        if (order_field == 'name') {
            sortedList = list.sort( function(a,b) {
                let aName = a.Name.toLowerCase();
                let bName = b.Name.toLowerCase();
                if(aName > bName){return 1;}
                if(aName < bName){return -1;}
                return 0;
            })
        } else if (order_field == 'price') {
            sortedList = list.sort( function(a,b) {
                return a.FinalPrice - b.FinalPrice;
            });
        };
        this.renderList(sortedList, true);
    }
}
