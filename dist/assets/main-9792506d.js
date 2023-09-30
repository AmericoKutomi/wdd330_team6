import { r } from './utils-7f8c7870.js';
import { P as n } from './ProductData-642f098c.js';
function c(t) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${t.Id}">
    <img
      src="${t.Image}"
      alt="Image of ${t.Name}"
    />
    <h3 class="card__brand">${t.Brand.Name}</h3>
    <h2 class="card__name">${t.Name}</h2>
    <p class="product-card__price">$${t.FinalPrice}</p></a>
  </li>`;
}
class l {
  constructor(e, s, a, i = !0) {
    (this.category = e),
      (this.datasource = s),
      (this.listElement = a),
      (this.homepage = i);
  }
  async init() {
    const e = await this.datasource.getData();
    this.homepage
      ? this.renderList(
          e.filter((s) => ['344YJ', '880RR', '985PR', '989CG'].includes(s.Id))
        )
      : this.renderList(e);
  }
  renderList(e) {
    r(c, this.listElement, e);
  }
}
const o = new n('tents'),
  d = document.querySelector('.product-list'),
  m = new l('Tents', o, d);
m.init();
