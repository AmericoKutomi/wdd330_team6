import{r as i,l as r,b as c}from"./utils-edcc6eb7.js";/* empty css              */import{P as n}from"./ProductData-df3c18b6.js";function o(e){const t=e.ListPrice/e.SuggestedRetailPrice;let s=0;return t==1?s="":s=` - <span class="discount">${100-Math.round(t*100)}% off!</span>`,`<li class="product-card">
  <a href="product_pages/index.html?product=${e.Id}">
  <img
    src="${e.Image}"
    alt="Image of ${e.Name}"
  />
  <h3 class="card__brand">${e.Brand.Name}</h3>
  <h2 class="card__name">${e.Name}</h2>
  <p class="product-card__price">$${e.FinalPrice}${s}</p></a>
</li>`}class l{constructor(t,s,a){this.category=t,this.dataSource=s,this.listElement=a,this.topList=[]}async init(){const t=await this.dataSource.getData(this.category);this.topList.length!==0?this.renderList(t.filter(s=>this.topList.indexOf(s.Id)!==-1)):this.renderList(t)}async renderList(t){i(o,this.listElement,t)}setTopList(t){this.topList=t}}r();const d=c("category"),h=new n,m=document.querySelector(".product-list"),p=new l(d,h,m);p.init();
