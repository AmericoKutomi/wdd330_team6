import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');
const dataSource = new ProductData(category);
const element = document.querySelector('.product-list');
const products = new ProductList(category, dataSource, element);
// products.setTopList(['880RR', '985RF', '985PR', '344YJ']);
products.init();

