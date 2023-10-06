import ExternalServices from './ExternalServices.mjs';
import ProductList from './ProductList.mjs';
import { getParam, loadHeaderFooter } from './utils.mjs';


loadHeaderFooter();

const category = getParam('category');
const dataSource = new ExternalServices();

const element = document.querySelector('.product-list');
const products = new ProductList(category, dataSource, element);
// products.setTopList(['880RR', '985RF', '985PR', '344YJ']);
products.init();

const sortByNameElement = document.querySelector('#sortByName');
sortByNameElement.addEventListener('click', () => products.sortBy('name'));

const sortByPriceElement = document.querySelector('#sortByPrice');
sortByPriceElement.addEventListener('click', () => products.sortBy('price'));
