import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

const dataSource = new ProductData('tents');
const element = document.querySelector('.product-list');
const products = new ProductList('tents', dataSource, element);
products.setTopList(['880RR', '985RF', '985PR', '344YJ']);
products.init();
// console.log(products);
