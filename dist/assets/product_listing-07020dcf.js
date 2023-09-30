import{r as l,l as d,b as m}from"./utils-edcc6eb7.js";/* empty css              */import{P as u}from"./ProductData-12e1d8ac.js";function h(r){const t=r.ListPrice/r.SuggestedRetailPrice;let e=0;return t==1?e="":e=` - <span class="discount">${100-Math.round(t*100)}% off!</span>`,`<li class="product-card">
  <a href="/product_pages/index.html?product=${r.Id}">
  <img
    src="${r.Images.PrimaryMedium}"
    alt="Image of ${r.Name}"
  />
  <h3 class="card__brand">${r.Brand.Name}</h3>
  <h2 class="card__name">${r.Name}</h2>
  <p class="product-card__price">$${r.FinalPrice}${e}</p></a>
</li>`}class p{constructor(t,e,s){this.category=t,this.dataSource=e,this.listElement=s,this.topList=[]}async init(){const t=await this.dataSource.getData(this.category);this.topList.length!==0?this.renderList(t.filter(e=>this.topList.indexOf(e.Id)!==-1)):this.renderList(t),document.querySelector(".title").innerHTML=this.category}async renderList(t,e=!1){l(h,this.listElement,t,"afterbegin",e)}setTopList(t){this.topList=t}async sortBy(t){const e=await this.dataSource.getData(this.category);let s=[];t=="name"?s=e.sort(function(i,a){let c=i.Name.toLowerCase(),o=a.Name.toLowerCase();return c>o?1:c<o?-1:0}):t=="price"&&(s=e.sort(function(i,a){return i.FinalPrice-a.FinalPrice})),this.renderList(s,!0)}}d();const y=m("category"),f=new u,g=document.querySelector(".product-list"),n=new p(y,f,g);n.init();const L=document.querySelector("#sortByName");L.addEventListener("click",()=>n.sortBy("name"));const P=document.querySelector("#sortByPrice");P.addEventListener("click",()=>n.sortBy("price"));
