import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
  }

export default class ProductListing  {

    constructor(category, datasource, listElement, homepage=true) {
        this.category = category;
        this.datasource = datasource;
        this.listElement = listElement;
        this.homepage = homepage;
    }

    async init() {
        const list = await this.datasource.getData()
        if (this.homepage) {
        this.renderList(list.filter((element) => ['344YJ','880RR','985PR','989CG'].includes(element.Id)));
        } else {
            this.renderList(list);
        }
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}