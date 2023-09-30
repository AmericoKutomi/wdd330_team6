import{r as c,l as n,b as o}from"./utils-57848721.js";/* empty css              */import{P as l}from"./ProductData-da6f9863.js";function d(e){const t=e.ListPrice/e.SuggestedRetailPrice;let s=0;return t==1?s="":s=` - <span class="discount">${100-Math.round(t*100)}% off!</span>`,`<li class="product-card">
  <a href="product_pages/index.html?product=${e.Id}">
  <img
    src="${e.Images.PrimaryMedium}"
    alt="Image of ${e.Name}"
  />
  <h3 class="card__brand">${e.Brand.Name}</h3>
  <h2 class="card__name">${e.Name}</h2>
  <p class="product-card__price">$${e.FinalPrice}${s}</p></a>
</li>`}class m{constructor(t,s,i){this.category=t,this.dataSource=s,this.listElement=i,this.topList=[]}async init(){const t=await this.dataSource.getData(this.category);this.topList.length!==0?this.renderList(t.filter(s=>this.topList.indexOf(s.Id)!==-1)):this.renderList(t)}async renderList(t){c(d,this.listElement,t)}setTopList(t){this.topList=t}}n();const r=o("category"),h=new l,p=document.querySelector(".product-list"),u=new m(r,h,p),g=document.querySelector(".title"),a=r,f=a.charAt(0).toUpperCase()+a.slice(1);g.textContent=f;u.init();
